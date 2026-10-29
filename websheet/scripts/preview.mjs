import { startServer } from '../tests/static-server.mjs'
const server = await startServer('.output/public', Number(process.env.PORT || 4174))
console.log(`WebSheet static preview: ${server.url}`)
for (const signal of ['SIGINT', 'SIGTERM']) process.on(signal, async () => { await server.close(); process.exit(0) })
