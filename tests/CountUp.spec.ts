import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import CountUp from '../components/CountUp.vue'

describe('CountUp', () => {
  it('reaches the target value after duration', async () => {
    vi.useFakeTimers()
    const originalNow = performance.now
    const originalRAF = global.requestAnimationFrame
    Object.defineProperty(performance, 'now', {
      value: () => Date.now(),
      configurable: true
    })
    global.requestAnimationFrame = (cb: FrameRequestCallback) =>
      setTimeout(() => cb(Date.now()), 16) as unknown as number

    const wrapper = mount(CountUp, {
      props: {
        to: 50,
        duration: 1000,
        start: true
      }
    })

    await vi.advanceTimersByTimeAsync(1000)
    await vi.runOnlyPendingTimersAsync()

    expect((wrapper.vm as any).displayValue).toBe(50)

    vi.useRealTimers()
    Object.defineProperty(performance, 'now', { value: originalNow })
    global.requestAnimationFrame = originalRAF
  })
})

