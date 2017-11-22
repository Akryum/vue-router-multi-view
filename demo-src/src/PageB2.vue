<template>
  <div class="page">
    <h1>Route with props params</h1>

    {{ id }}
  </div>
</template>

<script>
export default {
  props: ['id'],
}
</script>
