-- Migration: Seed GitHub Setup Milestones
-- This ensures the GitHub setup milestones exist
-- Safe to run multiple times - uses ON CONFLICT to update existing records

-- GitHub Setup Milestones (display_order 10-13)
INSERT INTO milestones (key, title, description, display_order)
VALUES 
    ('github-request-access', 'Request GitHub Access via Okta', 'Request access to GitHub Enterprise Cloud through Okta Self Service.', 10),
    ('github-setup-account', 'Set Up Your GitHub Account', 'Sign in via Okta and set up your profile so teammates can recognize you.', 11),
    ('github-install-git', 'Install Git', 'Install Git command line tools on your Mac.', 12),
    ('github-create-repository', 'Create Your First Repository', 'Create a repository for your prototype project on GitHub Enterprise Cloud.', 13)
ON CONFLICT (key) DO UPDATE 
SET 
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    display_order = EXCLUDED.display_order;
