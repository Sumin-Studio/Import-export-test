# Deploy GitHub Milestones to Database

This guide explains how to add the new GitHub setup milestones to your Supabase database.

## What's Being Added

Four new milestones for the "Connecting to GitHub" tab:

1. **github-request-access** (display_order: 10) - Request GitHub Access via Okta
2. **github-setup-account** (display_order: 11) - Set Up Your GitHub Account
3. **github-install-git** (display_order: 12) - Install Git
4. **github-create-repository** (display_order: 13) - Create Your First Repository

## Option 1: Run Migration File (Recommended)

If you're using Supabase migrations:

1. **Apply the migration**:
   ```bash
   # If you have Supabase CLI set up locally:
   supabase db push
   
   # Or manually apply via Supabase dashboard:
   # - Go to Database > Migrations
   # - Upload the file: supabase-migrations/20250115000000_seed_github_milestones.sql
   ```

## Option 2: Run SQL Directly in Supabase Dashboard (Easiest)

1. **Open Supabase Dashboard**:
   - Go to your Supabase project dashboard
   - Navigate to **SQL Editor** (in the left sidebar)

2. **Run the migration SQL**:
   - Open the file: `supabase-migrations/20250115000000_seed_github_milestones.sql`
   - Copy the entire contents
   - Paste into the SQL Editor
   - Click **Run** (make sure it's not "Run as read-only")

3. **Verify it worked**:
   - Run this query to see all milestones:
     ```sql
     SELECT key, title, display_order 
     FROM milestones 
     ORDER BY display_order;
     ```
   - You should see the 4 new GitHub milestones at the end (display_order 10-13)

## Option 3: Update seed-milestones.sql and Re-run

If you prefer to keep everything in one file:

1. The `seed-milestones.sql` file has already been updated with the GitHub milestones
2. Copy the entire `seed-milestones.sql` file
3. Paste it into Supabase SQL Editor
4. Click **Run**

This is safe to run multiple times - it uses `ON CONFLICT` to update existing records.

## Verify After Deployment

After running the migration, verify the milestones exist:

```sql
SELECT key, title, display_order 
FROM milestones 
WHERE key LIKE 'github-%'
ORDER BY display_order;
```

You should see all 4 GitHub milestones.

## Troubleshooting

- **"Only SELECT queries allowed"**: You're in read-only mode. Make sure you're in the SQL Editor, not a query view.
- **Migration already exists**: If you see an error about the migration already existing, that's fine - the `ON CONFLICT` clause will update existing records.
- **Milestones not showing**: Clear your browser cache and refresh the app. The milestones are fetched on page load.

## Next Steps

Once the milestones are in the database:
1. The "Connecting to GitHub" tab will automatically show completion buttons
2. Users can mark each step as complete/incomplete
3. Completion status will be saved and persist across sessions
