// v-reveal: marks an element for a scroll-triggered entrance.
// The value (optional) is a stagger index, exposed to CSS as --d.
// When the element enters the viewport it gets `.is-in` and fires a `reveal` event.
export default defineNuxtPlugin((nuxtApp) => {
  let observer: IntersectionObserver | null = null

  const getObserver = () => {
    observer ??= new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.classList.add('is-in')
        entry.target.dispatchEvent(new CustomEvent('reveal'))
        observer!.unobserve(entry.target)
      }
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 })
    return observer
  }

  nuxtApp.vueApp.directive<HTMLElement, number | undefined>('reveal', {
    getSSRProps: (binding) => ({
      'data-reveal': '',
      ...(binding.value != null ? { style: `--d:${binding.value}` } : {}),
    }),
    mounted(el, binding) {
      el.setAttribute('data-reveal', '')
      if (binding.value != null) el.style.setProperty('--d', String(binding.value))
      getObserver().observe(el)
    },
    unmounted(el) {
      observer?.unobserve(el)
    },
  })

  if (import.meta.client) {
    nuxtApp.hook('app:mounted', () => {
      document.documentElement.setAttribute('data-motion-ready', '')
    })
  }
})
