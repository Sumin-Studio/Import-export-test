-- Migration: Seed Making Stuff Milestones
-- This ensures the create-first-html-file and create-first-web-app milestones exist
-- Safe to run multiple times - uses ON CONFLICT to update existing records

-- Making Stuff Milestones (display_order 7-8)
INSERT INTO milestones (key, title, description, display_order)
VALUES 
    ('create-first-html-file', 'Create your first HTML file', 'Create a simple HTML file using Cursor', 7),
    ('create-first-web-app', 'Create your first web app', 'Build a Next.js web app using Cursor', 8)
ON CONFLICT (key) DO UPDATE 
SET 
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    display_order = EXCLUDED.display_order;

-- Fix display_order conflict: move stay-tuned to 9 if it's at 7
UPDATE milestones 
SET display_order = 9 
WHERE key = 'stay-tuned' AND display_order = 7;
