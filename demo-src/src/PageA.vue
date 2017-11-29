<template>
  <div class="page">
    <h1>Simple page</h1>
    <p>Open the devtools and watch the content of the HTML!</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      foo: 'bar',
    }
  },

  created () {
    console.log('Page A created')
  },

  activated () {
    console.log('Simple page activated', this.foo)
  },

  deactivated () {
    console.log('Simple page deactivated', this.foo)
  },
}
</script>
