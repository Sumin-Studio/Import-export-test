import { createServerClient } from "./server";
import type { User, MilestoneWithCompletion, Milestone, MilestoneCompletion } from "@/types/supabase";

/**
 * Ensures a user exists in the database, creating or updating them as needed
 */
export async function ensureUserExists(
  authUserId: string,
  email: string,
  name?: string | null
): Promise<User | null> {
  const supabase = createServerClient();

  // Verify Supabase connection
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error("Missing Supabase environment variables");
    console.error("URL present:", !!process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.error("Service key present:", !!process.env.SUPABASE_SERVICE_ROLE_KEY);
    return null;
  }

  try {
    // First, try to find existing user by auth user ID
    const { data: existingUserByauthId, error: fetchError } = await supabase
      .from("users")
      .select("*")
      .eq("clerk_user_id", authUserId)
      .maybeSingle();

    if (fetchError) {
      console.error("Error fetching user:", fetchError);
      console.error("Supabase error details:", JSON.stringify(fetchError, null, 2));
      return null;
    }

    if (existingUserByauthId) {
      // Update if name or email changed
      if (existingUserByauthId.email !== email || existingUserByauthId.name !== name) {
        const { data: updatedUser, error: updateError } = await supabase
          .from("users")
          .update({ email, name, updated_at: new Date().toISOString() })
          .eq("clerk_user_id", authUserId)
          .select()
          .maybeSingle();
        
        if (updateError) {
          console.error("Error updating user:", updateError);
          return existingUserByauthId; // Return existing user if update fails
        }
        return updatedUser;
      }
      return existingUserByauthId;
    }

    // If no user found by auth user ID, check by email to prevent duplicates
    // This handles cases where auth user ID changed (e.g., dev to prod migration)
    if (email) {
      const { data: existingUserByEmail, error: emailFetchError } = await supabase
        .from("users")
        .select("*")
        .eq("email", email.toLowerCase())
        .maybeSingle();

      if (emailFetchError) {
        console.error("Error fetching user by email:", emailFetchError);
      } else if (existingUserByEmail) {
        // User exists with same email but different auth user ID - update the auth user ID
        console.log(`Updating existing user auth user ID from ${existingUserByEmail.clerk_user_id} to ${authUserId}`);
        const { data: updatedUser, error: updateError } = await supabase
          .from("users")
          .update({ 
            clerk_user_id: authUserId,
            name: name || existingUserByEmail.name,
            updated_at: new Date().toISOString() 
          })
          .eq("email", email.toLowerCase())
          .select()
          .maybeSingle();
        
        if (updateError) {
          console.error("Error updating user auth user ID:", updateError);
          return existingUserByEmail; // Return existing user if update fails
        }
        return updatedUser;
      }
    }

    // Create new user if none exists
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert({
        clerk_user_id: authUserId,
        email,
        name,
      })
      .select()
      .maybeSingle();

    if (insertError) {
      console.error("Error creating user:", insertError);
      console.error("Supabase insert error details:", JSON.stringify(insertError, null, 2));
      console.error("Insert data:", { clerk_user_id: authUserId, email, name });
      return null;
    }

    console.log("Created new user:", newUser.id);
    return newUser;
  } catch (error) {
    console.error("Exception in ensureUserExists:", error);
    console.error("Exception details:", error instanceof Error ? error.stack : String(error));
    return null;
  }
}

/**
 * Gets all milestone completions for a user
 */
export async function getUserCompletions(
  authUserId: string
): Promise<MilestoneWithCompletion[]> {
  const supabase = createServerClient();

  // First ensure user exists
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id")
    .eq("clerk_user_id", authUserId)
    .single();

  if (userError || !user) {
    console.error("Error fetching user:", userError);
    return [];
  }

  // Get all milestones with completion status for this specific user
  const { data: milestones, error } = await supabase
    .from("milestones")
    .select(
      `
      *,
      milestone_completions!milestone_completions_milestone_id_fkey(completed_at, notes, user_id)
    `
    )
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching milestones:", error);
    return [];
  }

  // Transform the data to include completion info for this user only
  return milestones.map((milestone: Milestone & { milestone_completions?: MilestoneCompletion[] }) => {
    const completions = milestone.milestone_completions || [];
    const completion = completions.find((c: MilestoneCompletion) => c.user_id === user.id);
    return {
      id: milestone.id,
      key: milestone.key,
      title: milestone.title,
      description: milestone.description,
      display_order: milestone.display_order,
      created_at: milestone.created_at,
      completed_at: completion?.completed_at,
      notes: completion?.notes,
    };
  });
}

/**
 * Marks a step as incomplete (removes completion) for a user
 */
export async function markStepIncomplete(
  authUserId: string,
  milestoneKey: string
): Promise<{ success: boolean; error?: string }> {
  const supabase = createServerClient();

  try {
    // Get user
    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_user_id", authUserId)
      .maybeSingle();

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Get milestone
    const { data: milestone, error: milestoneError } = await supabase
      .from("milestones")
      .select("id")
      .eq("key", milestoneKey)
      .maybeSingle();

    if (milestoneError || !milestone) {
      console.error("Milestone lookup error:", milestoneError);
      console.error("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.error("Looking for milestone key:", milestoneKey);
      
      // Try to get all milestones to see what's available
      const { data: allMilestones } = await supabase
        .from("milestones")
        .select("key")
        .order("display_order");
      console.error("Available milestones:", allMilestones?.map(m => m.key) || "none found");
      
      return { 
        success: false, 
        error: `Milestone '${milestoneKey}' not found. Have you run the seed-milestones.sql script in Supabase? Check the server logs for available milestones.` 
      };
    }

    // Delete completion record
    const { error: deleteError } = await supabase
      .from("milestone_completions")
      .delete()
      .eq("user_id", user.id)
      .eq("milestone_id", milestone.id);

    if (deleteError) {
      console.error("Error removing completion:", deleteError);
      return { success: false, error: deleteError.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error in markStepIncomplete:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Marks a step as complete for a user
 */
export async function markStepComplete(
  authUserId: string,
  milestoneKey: string,
  notes?: string
): Promise<{ success: boolean; completedAt?: string; error?: string }> {
  const supabase = createServerClient();

  try {
    // Get user
    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("clerk_user_id", authUserId)
      .maybeSingle();

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Get milestone
    const { data: milestone, error: milestoneError } = await supabase
      .from("milestones")
      .select("id")
      .eq("key", milestoneKey)
      .maybeSingle();

    if (milestoneError || !milestone) {
      console.error("Milestone lookup error:", milestoneError);
      console.error("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.error("Looking for milestone key:", milestoneKey);
      
      // Try to get all milestones to see what's available
      const { data: allMilestones } = await supabase
        .from("milestones")
        .select("key")
        .order("display_order");
      console.error("Available milestones:", allMilestones?.map(m => m.key) || "none found");
      
      return { 
        success: false, 
        error: `Milestone '${milestoneKey}' not found. Have you run the seed-milestones.sql script in Supabase? Check the server logs for available milestones.` 
      };
    }

    // Check if already completed
    const { data: existingCompletion } = await supabase
      .from("milestone_completions")
      .select("*")
      .eq("user_id", user.id)
      .eq("milestone_id", milestone.id)
      .maybeSingle();

    if (existingCompletion) {
      return {
        success: true,
        completedAt: existingCompletion.completed_at,
      };
    }

    // Create completion
    const completedAt = new Date().toISOString();
    const { error: insertError } = await supabase
      .from("milestone_completions")
      .insert({
        user_id: user.id,
        milestone_id: milestone.id,
        completed_at: completedAt,
        notes: notes || null,
      });

    if (insertError) {
      console.error("Error marking complete:", insertError);
      return { success: false, error: insertError.message };
    }

    return { success: true, completedAt };
  } catch (error) {
    console.error("Error in markStepComplete:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Gets all milestones from Supabase
 */
export async function getAllMilestones(): Promise<Milestone[]> {
  const supabase = createServerClient();

  try {
    const { data: milestones, error } = await supabase
      .from("milestones")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching milestones:", error);
      return [];
    }

    return milestones || [];
  } catch (error) {
    console.error("Error in getAllMilestones:", error);
    return [];
  }
}

/**
 * Gets all milestone completions for all users
 * Returns data structured for grid display
 */
export async function getAllUsersCompletions(): Promise<Array<{
  user: User;
  completions: Array<{
    milestoneKey: string;
    milestoneTitle: string;
    completedAt: string;
  }>;
}>> {
  const supabase = createServerClient();

  try {
    // Get all users
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("*")
      .order("name", { ascending: true, nullsFirst: false });

    if (usersError || !users) {
      console.error("Error fetching users:", usersError);
      return [];
    }

    // Get all milestone completions with user and milestone info
    const { data: completions, error: completionsError } = await supabase
      .from("milestone_completions")
      .select(`
        completed_at,
        user_id,
        milestone_id,
        users!milestone_completions_user_id_fkey(id, email, name, clerk_user_id),
        milestones!milestone_completions_milestone_id_fkey(id, key, title)
      `)
      .order("completed_at", { ascending: false });

    if (completionsError) {
      console.error("Error fetching completions:", completionsError);
      return [];
    }

    // Group completions by user
    const userCompletionsMap = new Map<string, Array<{
      milestoneKey: string;
      milestoneTitle: string;
      completedAt: string;
    }>>();

    // Initialize map with all users
    users.forEach((user) => {
      userCompletionsMap.set(user.id, []);
    });

    // Populate completions
    // Supabase can return objects or arrays depending on configuration
    interface CompletionWithRelations {
      user_id: string;
      milestone_id: string;
      completed_at: string;
      users: { id: string; email: string; name: string | null; clerk_user_id: string } | { id: string; email: string; name: string | null; clerk_user_id: string }[] | null;
      milestones: { id: string; key: string; title: string } | { id: string; key: string; title: string }[] | null;
    }

    completions?.forEach((completion: CompletionWithRelations) => {
      const userId = completion.user_id;
      // Handle both object and array formats from Supabase
      const milestone = Array.isArray(completion.milestones) 
        ? completion.milestones[0] 
        : completion.milestones;
      
      if (milestone && completion.completed_at) {
        const existing = userCompletionsMap.get(userId) || [];
        existing.push({
          milestoneKey: milestone.key,
          milestoneTitle: milestone.title,
          completedAt: completion.completed_at,
        });
        userCompletionsMap.set(userId, existing);
      }
    });

    // Transform to array format
    return users.map((user) => ({
      user,
      completions: userCompletionsMap.get(user.id) || [],
    }));
  } catch (error) {
    console.error("Error in getAllUsersCompletions:", error);
    return [];
  }
}

