-- Verify GitHub milestones were created
-- Run this in Supabase SQL Editor to check

SELECT 
    key,
    title,
    display_order,
    created_at
FROM milestones 
WHERE key LIKE 'github-%'
ORDER BY display_order;

-- You should see 4 rows:
-- github-request-access (10)
-- github-setup-account (11)
-- github-install-git (12)
-- github-create-repository (13)
