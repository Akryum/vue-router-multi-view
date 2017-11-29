<template>
  <div>Sub component</div>
</template>

<script>
export default {
  data () {
    return {
      foo: {
        bar: 42,
      },
    }
  },

  activated () {
    console.log('PageCSub activated', this.foo.bar)
  },

  deactivated () {
    console.log('PageCSub deactivated', this.foo.bar)
  },
}
</script>
