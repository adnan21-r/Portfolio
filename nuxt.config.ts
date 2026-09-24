// https://nuxt.com/docs/api/configuration/nuxt-config
const baseURL = process.env.NUXT_APP_BASE_URL || (process.env.GITHUB_ACTIONS ? '/Portfolio/' : '/')

// Runs before first paint: opt into entrance animations unless the visitor prefers
// reduced motion. If the app never hydrates, drop the flag so content stays visible.
const motionScript = `(function(d){try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.setAttribute('data-motion','');setTimeout(function(){if(!d.hasAttribute('data-motion-ready'))d.removeAttribute('data-motion')},4000)}catch(e){}})(document.documentElement)`

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  css: ['~/assets/css/main.css'],
  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Adnan Al Rakka · Software Developer',
      meta: [
        { name: 'description', content: 'Adnan Al Rakka is a software developer in Lebanon building Laravel backends, REST APIs and Vue.js interfaces.' },
        { name: 'theme-color', content: '#edeff2' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Adnan Al Rakka · Software Developer' },
        { property: 'og:description', content: 'Laravel backends, REST APIs and Vue.js interfaces.' },
        { name: 'twitter:card', content: 'summary' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `${baseURL}favicon.ico` },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500..800&family=Instrument+Sans:wght@400..600&family=Martian+Mono:wght@400;500&display=swap' }
      ],
      script: [
        { innerHTML: motionScript, tagPosition: 'head' }
      ]
    }
  },
  modules: [],
})
