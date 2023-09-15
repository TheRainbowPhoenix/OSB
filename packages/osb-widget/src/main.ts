import './app.css'
import App from './App.svelte'

const app = new App({
  target: document.getElementById('app'),
  hydrate: import.meta.env.ROUTIFY_SSR_ENABLE,
})

export default app
