import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseEnv } from 'node:util'

const root = fileURLToPath(new URL('../', import.meta.url))
const require = createRequire(import.meta.url)
const [environment, action, ...flags] = process.argv.slice(2)
const files = { dev: '.env.development', production: '.env.production' }
const actions = ['build', 'test:output', 'test:browser', 'preview', 'deploy']
if (!Object.hasOwn(files, environment) || !actions.includes(action)
    || flags.some(flag => flag !== '--dry-run') || (flags.length && action !== 'deploy')) {
    throw new Error('Usage: node scripts/environment.mjs <dev|production> <build|test:output|test:browser|preview|deploy> [--dry-run]')
}

const dotenv = files[environment]
const values = parseEnv(readFileSync(resolve(root, dotenv), 'utf8'))
const expectedSiteUrl = environment === 'dev' ? '' : 'https://websheet.shop/'
if (values.NUXT_PUBLIC_SITE_URL !== expectedSiteUrl) {
    throw new Error(`${dotenv}: NUXT_PUBLIC_SITE_URL must be ${JSON.stringify(expectedSiteUrl)}.`)
}
// Pin the SEO origin to the selected environment even if CI has a stale site URL.
// Other public values (email/demo URLs) can still be supplied independently by CI.
const env = {
    ...values,
    ...process.env,
    NUXT_PUBLIC_SITE_URL: expectedSiteUrl,
    WEBSHEET_DEPLOY_ENV: environment,
    WEBSHEET_OUTPUT_DIR: `.output/${environment}/public`,
    WRANGLER_LOG_PATH: resolve(root, '.wrangler/logs'),
}
const run = (entry, args = []) => {
    const result = spawnSync(process.execPath, [entry, ...args], { cwd: root, env, stdio: 'inherit' })
    if (result.error) throw result.error
    if (result.status !== 0) process.exit(result.status ?? 1)
}
const build = () => run(resolve(dirname(require.resolve('nuxt/package.json')), 'bin/nuxt.mjs'), ['generate', '--dotenv', dotenv])
const testOutput = () => run(resolve(root, 'tests/output.mjs'))

console.log(`WebSheet ${environment}: ${action} → ${env.WEBSHEET_OUTPUT_DIR}`)
if (action === 'build') build()
if (action === 'test:output') testOutput()
if (action === 'test:browser') run(resolve(root, 'tests/browser.mjs'))
if (action === 'preview') run(resolve(root, 'scripts/preview.mjs'))
if (action === 'deploy') {
    build()
    testOutput()
    run(resolve(dirname(require.resolve('wrangler/package.json')), 'bin/wrangler.js'), ['deploy', '--env', environment, ...flags])
}
