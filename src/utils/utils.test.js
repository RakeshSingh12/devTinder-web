import { describe, it, expect, vi } from 'vitest'
import { debounce, memoize } from './performance'

describe('Performance Utils', () => {
    describe('debounce', () => {
        it('should delay function execution', () => {
            vi.useFakeTimers()
            const func = vi.fn()
            const debouncedFunc = debounce(func, 1000)

            debouncedFunc()
            expect(func).not.toHaveBeenCalled()

            vi.advanceTimersByTime(500)
            expect(func).not.toHaveBeenCalled()

            vi.advanceTimersByTime(500)
            expect(func).toHaveBeenCalledTimes(1)
        })

        it('should execute immediately if immediate is true', () => {
            const func = vi.fn()
            const debouncedFunc = debounce(func, 1000, true)

            debouncedFunc()
            expect(func).toHaveBeenCalledTimes(1)
        })
    })

    describe('memoize', () => {
        it('should cache results', () => {
            const func = vi.fn((x) => x * 2)
            const memoizedFunc = memoize(func)

            expect(memoizedFunc(2)).toBe(4)
            expect(func).toHaveBeenCalledTimes(1)

            expect(memoizedFunc(2)).toBe(4)
            expect(func).toHaveBeenCalledTimes(1) // Should be cached

            expect(memoizedFunc(3)).toBe(6)
            expect(func).toHaveBeenCalledTimes(2)
        })
    })
})
