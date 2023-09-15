import { Routify, Router } from '../../../node_modules/.pnpm/@roxi+routify@3.0.0-next.1/node_modules/@roxi/routify/lib/runtime/index.js'
import routes from './routes.default.js'

export const instance = new Routify({routes})
export { Router }
