// plugins/intersect.client.js
export default defineNuxtPlugin((nuxtApp) => {
  // Explicit client-side check to prevent SSR issues
  if (process.client) {
    nuxtApp.vueApp.directive('intersect', {
      mounted(el, binding) {
        const options = {
          root: null,
          rootMargin: '0px',
          threshold: 0.1,
        }

        const observer = new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            binding.value?.callback?.()
            if (binding.value?.once) observer.unobserve(entry.target)
          }
        }, options)

        observer.observe(el)
        // Store observer on the element for cleanup
        el._intersectionObserver = observer
      },
      beforeUnmount(el) {
        el._intersectionObserver?.disconnect()
      },
    })
  }
})