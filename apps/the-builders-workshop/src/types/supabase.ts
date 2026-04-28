export interface User {
  id: string;
  clerk_user_id: string;
  email: string;
  name: string | null;
  slug: string | null;
  role: string | null;
  github_username: string | null;
  created_at: string;
  updated_at: string;
}

export interface Milestone {
  id: string;
  key: string;
  title: string;
  description: string | null;
  display_order: number;
  created_at: string;
}

export interface MilestoneCompletion {
  id: string;
  user_id: string;
  milestone_id: string;
  completed_at: string;
  notes: string | null;
}

export interface MilestoneWithCompletion extends Milestone {
  completed_at?: string;
  notes?: string | null;
}

export interface Comment {
  id: string;
  source_type: string;
  source_id: string;
  user_id: string;
  user_name: string | null;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface Reaction {
  id: string;
  source_type: string;
  source_id: string;
  user_id: string;
  reaction_type: string;
  created_at: string;
}

export interface ReactionSummary {
  count: number;
  userReacted: boolean;
}

