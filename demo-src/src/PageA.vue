<template>
  <div class="page">
    <h1>Simple page</h1>
    <p>Open the devtools and watch the content of the HTML!</p>
  </div>
</template>

<script>
export default {
  activated () {
    console.log('Simple page activated')
  },

  deactivated () {
    console.log('Simple page deactivated')
  },
}
</script>
