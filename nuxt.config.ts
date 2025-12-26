// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  css: ['~/assets/css/main.css'],
  modules: ['nuxt-mail'],
  mail: {
    message: {
      to: process.env.NUXT_MAIL_TO || 'placeholder@example.com',
      from: process.env.NUXT_MAIL_FROM || 'placeholder@example.com'
    },
    smtp: {
      host: process.env.NUXT_MAIL_SMTP_HOST || 'localhost',
      port: Number(process.env.NUXT_MAIL_SMTP_PORT) || 587,
      secure: process.env.NUXT_MAIL_SMTP_SECURE === 'true',
      auth: {
        user: process.env.NUXT_MAIL_SMTP_USER || '',
        pass: process.env.NUXT_MAIL_SMTP_PASS || ''
      }
    }
  },
  app: {
    head: {
      title: 'Adnan Al Rakka | Software Developer Portfolio',
      meta: [
        { name: 'description', content: 'Professional portfolio of Adnan Al Rakka, Software Developer specialized in Laravel, Vue.js and 3D web experiences.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  }
})
