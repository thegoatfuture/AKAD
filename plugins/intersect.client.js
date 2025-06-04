// plugins/v-intersect.js
export default defineNuxtPlugin((nuxtApp) => {
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
      }
    })
  })