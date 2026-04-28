-- ============================================
-- Seed Milestones for The Builders Workshop
-- ============================================
-- This script creates all milestones used in the application.
-- Safe to run multiple times - uses ON CONFLICT to update existing records.
--
-- HOW TO RUN:
-- Option 1: Use Supabase Migrations (recommended)
--   - This has already been applied via migration: seed_all_milestones
--
-- Option 2: Run in Supabase SQL Editor
--   - Go to SQL Editor in Supabase dashboard
--   - Make sure you're in the correct project
--   - Copy and paste this entire file
--   - Click "Run" (not "Run as read-only")
--
-- If you get "Only SELECT queries allowed", you're in read-only mode.
-- Make sure you're in the SQL Editor (not a read-only query view).

-- Getting Started Milestones (display_order 1-6)
INSERT INTO milestones (key, title, description, display_order)
VALUES 
    ('install-cursor', 'Install Cursor', 'Request access to Cursor and get it on your machine.', 1),
    ('receiving-cursor-access', 'Receive cursor access', 'Access requests are processed by IT. This usually takes a few days, but can sometimes take longer depending on workload.', 2),
    ('request-admin-access', 'Request Admin Access', 'You''ll need local admin rights to install dev tools. Use this form and the message below.', 3),
    ('receiving-admin-access', 'Receive admin access', 'This can take anywhere from a few hours to a few days or weeks. Hang tight!', 4),
    ('setup-code-folder', 'Set Up Your Code Folder', 'Create a code folder and open it in Cursor.', 5),
    ('first-cursor-query', 'Put your first query into Cursor', 'Copy the setup commands into Cursor chat and let it do its thing.', 6)
ON CONFLICT (key) DO UPDATE 
SET 
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    display_order = EXCLUDED.display_order;

-- Making Stuff Milestones (display_order 7-10)
INSERT INTO milestones (key, title, description, display_order)
VALUES
    ('create-first-html-file', 'Create your first HTML file', 'Create a simple HTML file using Cursor', 7),
    ('create-first-web-app', 'Create your first web app', 'Build a Next.js web app using Cursor', 8),
    ('connect-figma-mcp', 'Connect Figma MCP', 'Connect Figma to Cursor via MCP', 9),
    ('connect-glean-mcp', 'Connect Glean MCP', 'Connect Glean to Cursor via MCP', 10)
ON CONFLICT (key) DO UPDATE
SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    display_order = EXCLUDED.display_order;

-- Final Milestone (display_order 11)
INSERT INTO milestones (key, title, description, display_order)
VALUES
    ('stay-tuned', 'Stay tuned!', 'Join the Slack channel and stay connected with the team.', 11)
ON CONFLICT (key) DO UPDATE
SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    display_order = EXCLUDED.display_order;

-- GitHub Setup Milestones (display_order 12-15)
INSERT INTO milestones (key, title, description, display_order)
VALUES
    ('github-request-access', 'Request GitHub Access via Okta', 'Request access to GitHub Enterprise Cloud through Okta Self Service.', 12),
    ('github-setup-account', 'Set Up Your GitHub Account', 'Sign in via Okta and set up your profile so teammates can recognize you.', 13),
    ('github-install-git', 'Install Git', 'Install Git command line tools on your Mac.', 14),
    ('github-create-repository', 'Create Your First Repository', 'Create a repository for your prototype project on GitHub Enterprise Cloud.', 15)
ON CONFLICT (key) DO UPDATE 
SET 
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    display_order = EXCLUDED.display_order;

-- Verify the milestones were created
SELECT 
    key,
    title,
    display_order
FROM milestones
ORDER BY display_order;
