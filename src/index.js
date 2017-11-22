import MultiView from './components/multi-view'


export function install (Vue) {
	if (install.installed) return
	install.installed = true

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
