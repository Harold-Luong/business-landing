/// <reference types="node" />
import { mkdir, writeFile, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { publicConfig, robots, sitemap } from './shared/config'
import { routes } from './shared/site'

const config = publicConfig(process.env)

export default defineNuxtConfig({
  builder: 'vite',
  debug: false,
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  // Preserve the existing CSS; the scaffold's optional UI/editor modules are not used.
  modules: [],
  components: [{ path: '~/components', pathPrefix: false }],
  css: ['~/assets/css/main.css'],
  runtimeConfig: { public: config },
  app: {
    head: {
      htmlAttrs: { lang: 'vi' },
      meta: [{ name: 'theme-color', content: '#fdfefb' }],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },
  nitro: {
    prerender: { crawlLinks: false, routes, failOnError: true },
    hooks: {
      async 'prerender:done'() {
        const output = resolve('.output/public')
        await mkdir(output, { recursive: true })
        await writeFile(resolve(output, 'robots.txt'), robots(config.siteUrl))
        if (config.siteUrl) await writeFile(resolve(output, 'sitemap.xml'), sitemap(config.siteUrl, routes))
        else await rm(resolve(output, 'sitemap.xml'), { force: true })
      },
    },
  },
})
