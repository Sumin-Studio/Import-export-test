import { describe, it, expect, vi } from 'vitest'
import { redirect } from 'next/navigation'

// Mock Next.js redirect
vi.mock('next/navigation', () => ({
    redirect: vi.fn(),
}))

describe('Home', () => {
    it('redirects to getting-started page', async () => {
        // Import after mocks are set up
        const { default: Home } = await import('../app/page')
        
        // Call the component (which should trigger redirect)
        Home()
        
        // Verify redirect was called with correct path
        expect(redirect).toHaveBeenCalledWith('/getting-started')
    })
})
