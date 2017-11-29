<template>
  <div class="page">
    <h1>Nested routes</h1>

    <SubComp />

    <nav>
      <router-link :to="{ name: 'page-c1' }" exact>Nested 1</router-link>
      <router-link :to="{ name: 'page-c2' }" exact>Nested 2</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script>
import SubComp from './PageCSub.vue'

export default {
  components: {
    SubComp,
  },

  data () {
    return {
      foo: {
        bar: ':)',
      },
    }
  },

  activated () {
    console.log('PageC activated', this.foo.bar)
  },

  deactivated () {
    console.log('PageC deactivated', this.foo.bar)
  },
}
</script>
