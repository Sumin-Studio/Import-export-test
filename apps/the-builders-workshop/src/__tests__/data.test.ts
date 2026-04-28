import { describe, it, expect } from 'vitest'
import { getBuilders, BuilderSchema } from '@/lib/builders'
import buildersData from '@/data/builders.json'
import { z } from 'zod'

describe('Data Integrity', () => {
    it('validates builders.json against the schema', () => {
        // This will throw if invalid, which fails the test
        const result = z.array(BuilderSchema).safeParse(buildersData)

        if (!result.success) {
            console.error(JSON.stringify(result.error.format(), null, 2))
        }

        expect(result.success).toBe(true)
    })

    it('ensures no duplicate slugs', () => {
        const builders = getBuilders()
        const slugs = builders.map(b => b.slug)
        const uniqueSlugs = new Set(slugs)
        expect(slugs.length).toBe(uniqueSlugs.size)
    })
})
