import { siteFiles, serveFiles } from '../demos/orbit/scripts/site.mjs'

const prefix = '/demos/orbit/'
export function orbitDemo(demoUrl = '') {
    const href = demoUrl.trim() || prefix
    if (href !== prefix) {
        const url = new URL(href)
        if (url.protocol !== 'https:' || url.username || url.password) throw new Error('ORBIT_DEMO_URL phải là URL HTTPS công khai.')
    }
    const escapeHref = value => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
    return {
        name: 'orbit-demo',
        transformIndexHtml(html) {
            return html.replaceAll('<!-- ORBIT_DEMO_URL -->', escapeHref(href))
        },
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                if (!req.url?.startsWith(prefix.slice(0, -1))) return next()
                try { serveFiles(await siteFiles(), prefix)(req, res, () => { res.writeHead(404); res.end('Not found') }) }
                catch (error) { next(error) }
            })
        },
        async generateBundle() {
            for (const [path, source] of await siteFiles()) this.emitFile({ type: 'asset', fileName: prefix.slice(1) + path, source })
        },
    }
}
