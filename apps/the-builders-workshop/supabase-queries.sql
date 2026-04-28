-- ============================================
-- Useful Supabase Queries for The Builders Workshop
-- ============================================

-- 1. View all milestones ordered by display order
SELECT 
    key,
    title,
    description,
    display_order,
    created_at
FROM milestones
ORDER BY display_order;

-- 2. View all users
SELECT 
    id,
    clerk_user_id,
    email,
    name,
    created_at,
    updated_at
FROM users
ORDER BY created_at DESC;

-- 3. View all milestone completions with user and milestone details
SELECT 
    u.email,
    u.name,
    m.key AS milestone_key,
    m.title AS milestone_title,
    mc.completed_at,
    mc.notes
FROM milestone_completions mc
JOIN users u ON mc.user_id = u.id
JOIN milestones m ON mc.milestone_id = m.id
ORDER BY mc.completed_at DESC;

-- 4. Count completions per milestone
SELECT 
    m.key,
    m.title,
    COUNT(mc.id) AS completion_count
FROM milestones m
LEFT JOIN milestone_completions mc ON m.id = mc.milestone_id
GROUP BY m.id, m.key, m.title
ORDER BY m.display_order;

-- 5. View user completion progress (who completed what)
SELECT 
    u.email,
    u.name,
    COUNT(mc.id) AS total_completions,
    STRING_AGG(m.key, ', ' ORDER BY m.display_order) AS completed_milestones
FROM users u
LEFT JOIN milestone_completions mc ON u.id = mc.user_id
LEFT JOIN milestones m ON mc.milestone_id = m.id
GROUP BY u.id, u.email, u.name
ORDER BY total_completions DESC, u.email;

-- 6. Check for the specific milestones used in Making Stuff tab
SELECT 
    key,
    title,
    display_order,
    CASE 
        WHEN key = 'create-first-html-file' THEN '✅ Used in Making Stuff tab'
        WHEN key = 'create-first-web-app' THEN '✅ Used in Making Stuff tab'
        ELSE ''
    END AS status
FROM milestones
WHERE key IN ('create-first-html-file', 'create-first-web-app')
ORDER BY display_order;

-- 7. Find users who completed "create-first-html-file"
SELECT 
    u.email,
    u.name,
    mc.completed_at,
    mc.notes
FROM milestone_completions mc
JOIN users u ON mc.user_id = u.id
JOIN milestones m ON mc.milestone_id = m.id
WHERE m.key = 'create-first-html-file'
ORDER BY mc.completed_at DESC;

-- 8. View recent completions (last 10)
SELECT 
    u.email,
    m.title AS milestone,
    mc.completed_at,
    mc.notes
FROM milestone_completions mc
JOIN users u ON mc.user_id = u.id
JOIN milestones m ON mc.milestone_id = m.id
ORDER BY mc.completed_at DESC
LIMIT 10;

-- 9. Check for display_order conflicts
SELECT 
    display_order,
    COUNT(*) AS count,
    STRING_AGG(key, ', ') AS milestone_keys
FROM milestones
GROUP BY display_order
HAVING COUNT(*) > 1
ORDER BY display_order;

-- 10. View all Getting Started milestones (first 6)
SELECT 
    key,
    title,
    display_order
FROM milestones
WHERE display_order <= 6
ORDER BY display_order;

-- 11. View Making Stuff milestones
SELECT 
    key,
    title,
    display_order
FROM milestones
WHERE key IN ('create-first-html-file', 'create-first-web-app')
ORDER BY display_order;

-- 12. Get completion rate for each milestone
SELECT 
    m.key,
    m.title,
    COUNT(DISTINCT u.id) AS total_users,
    COUNT(mc.id) AS completions,
    ROUND(COUNT(mc.id)::numeric / NULLIF(COUNT(DISTINCT u.id), 0) * 100, 1) AS completion_rate_percent
FROM milestones m
CROSS JOIN users u
LEFT JOIN milestone_completions mc ON mc.milestone_id = m.id AND mc.user_id = u.id
GROUP BY m.id, m.key, m.title, m.display_order
ORDER BY m.display_order;

-- 13. Verify all expected milestones exist (compare code vs database)
-- Expected milestones from the codebase:
WITH expected_milestones AS (
    SELECT unnest(ARRAY[
        'request-admin-access',
        'install-cursor',
        'receiving-admin-access',
        'receiving-cursor-access',
        'setup-code-folder',
        'first-cursor-query',
        'create-first-html-file',
        'create-first-web-app'
    ]) AS expected_key
)
SELECT 
    e.expected_key,
    CASE 
        WHEN m.key IS NOT NULL THEN '✅ EXISTS'
        ELSE '❌ MISSING'
    END AS status,
    m.title,
    m.display_order
FROM expected_milestones e
LEFT JOIN milestones m ON e.expected_key = m.key
ORDER BY 
    CASE WHEN m.display_order IS NULL THEN 999 ELSE m.display_order END,
    e.expected_key;

-- 14. DIAGNOSTIC: Test milestone lookup (simulates what the code does)
-- This tests if the milestone can be found by key (like the code does)
SELECT 
    'create-first-html-file' AS test_key,
    CASE 
        WHEN EXISTS (SELECT 1 FROM milestones WHERE key = 'create-first-html-file') 
        THEN '✅ FOUND' 
        ELSE '❌ NOT FOUND' 
    END AS lookup_result,
    (SELECT id FROM milestones WHERE key = 'create-first-html-file' LIMIT 1) AS milestone_id;

SELECT 
    'create-first-web-app' AS test_key,
    CASE 
        WHEN EXISTS (SELECT 1 FROM milestones WHERE key = 'create-first-web-app') 
        THEN '✅ FOUND' 
        ELSE '❌ NOT FOUND' 
    END AS lookup_result,
    (SELECT id FROM milestones WHERE key = 'create-first-web-app' LIMIT 1) AS milestone_id;
