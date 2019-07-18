import MultiView from './components/multi-view'

export let Vue

export function install (pVue, options = { forceMultiViews: false }) {
  if (install.installed) return
  install.installed = true

  Vue = pVue

  MultiView.props.forceMultiViews.default = options.forceMultiViews;

  Vue.component('router-multi-view', MultiView)
}

export const RouterMultiView = MultiView

const plugin = {
  install,
}

// Auto-install
let GlobalVue = null
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue
}
if (GlobalVue) {
  GlobalVue.use(plugin)
}

export default plugin
