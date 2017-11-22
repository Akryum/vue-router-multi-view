import Vue from 'vue'
import VueRouter from 'vue-router'
import PageA from './PageA.vue'
import PageB from './PageB.vue'
import PageB2 from './PageB2.vue'
import PageC from './PageC.vue'
import PageC1 from './PageC1.vue'
import PageC2 from './PageC2.vue'

Vue.use(VueRouter)

export const routes = [
  { path: '/', name: 'page-a', component: PageA, meta: { exact: true } },
  { path: '/b/:id', name: 'page-b', component: PageB },
  { path: '/b2/:id', name: 'page-b2', component: PageB2, props: true },
  {
    path: '/c',
    component: PageC,
    children: [
      { path: '', name: 'page-c1', component: PageC1 },
      { path: 'nested2', name: 'page-c2', component: PageC2 },
    ],
  },
]

export const router = new VueRouter({
  routes,
  mode: 'history',
})
