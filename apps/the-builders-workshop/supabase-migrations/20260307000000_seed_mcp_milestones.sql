-- Migration: Seed MCP Connection Milestones
-- Adds connect-figma-mcp and connect-glean-mcp milestones
-- Safe to run multiple times - uses ON CONFLICT to update existing records

-- MCP Milestones (display_order 9-10)
INSERT INTO milestones (key, title, description, display_order)
VALUES
    ('connect-figma-mcp', 'Connect Figma MCP', 'Connect Figma to Cursor via MCP', 9),
    ('connect-glean-mcp', 'Connect Glean MCP', 'Connect Glean to Cursor via MCP', 10)
ON CONFLICT (key) DO UPDATE
SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    display_order = EXCLUDED.display_order;

-- Bump stay-tuned out of the way if it conflicts
UPDATE milestones
SET display_order = 11
WHERE key = 'stay-tuned' AND display_order IN (9, 10);
