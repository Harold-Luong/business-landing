/// <reference types="node" />
import { mkdir, writeFile, rm } from 'node:fs/promises'
import { resolve } from 'node:path'
import { publicConfig, robots, sitemap } from './shared/config'
import { routes } from './shared/site'

const config = publicConfig(process.env)
const environment = process.env.WEBSHEET_DEPLOY_ENV || 'dev'
if (!['dev', 'production'].includes(environment)) throw new Error('Invalid WEBSHEET_DEPLOY_ENV')
const outputDir = resolve('.output', environment)

export default defineNuxtConfig({
  buildDir: `.nuxt/${environment}`,
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
    output: {
      dir: outputDir,
      publicDir: resolve(outputDir, 'public'),
      serverDir: resolve(outputDir, 'server'),
    },
    prerender: { crawlLinks: false, routes, failOnError: true },
    hooks: {
      async 'prerender:done'() {
        const output = resolve(outputDir, 'public')
        await mkdir(output, { recursive: true })
        await writeFile(resolve(output, 'robots.txt'), robots(config.siteUrl))
        if (config.siteUrl) await writeFile(resolve(output, 'sitemap.xml'), sitemap(config.siteUrl, routes))
        else await rm(resolve(output, 'sitemap.xml'), { force: true })
        if (environment === 'dev') {
          await writeFile(resolve(output, '_headers'), '/*\n  X-Robots-Tag: noindex, follow\n')
        } else {
          await rm(resolve(output, '_headers'), { force: true })
        }
      },
    },
  },
})
