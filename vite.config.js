import { defineConfig, loadEnv } from 'vite'
import { fileURLToPath } from 'node:url'
import { normalizeSiteUrl, seoHead, robots, sitemap, servicePages, pageForPath } from './src/seo.mjs'
import { asterDemo } from './scripts/aster-plugin.mjs'
import { orbitDemo } from './scripts/orbit-plugin.mjs'
import { anStudioDemo } from './scripts/an-studio-plugin.mjs'

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const siteUrl = normalizeSiteUrl(env.SITE_URL)
    return {
        build: {
            rolldownOptions: {
                input: ['index.html', ...servicePages.map((page) => `${page.path.slice(1)}index.html`)]
                    .map((path) => fileURLToPath(new URL(path, import.meta.url))),
            },
        },
        plugins: [asterDemo(env.ASTER_DEMO_URL), anStudioDemo(env.AN_STUDIO_DEMO_URL), orbitDemo(env.ORBIT_DEMO_URL), {
            name: 'static-seo',
            transformIndexHtml(html, context) {
                return html.replace('<!-- SEO_HEAD -->', seoHead(siteUrl, pageForPath(context.path)))
            },
            generateBundle() {
                this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robots(siteUrl) })
                if (siteUrl) this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemap(siteUrl) })
            },
        }],
    }
})
