<template>
  <div class="page">
    <h1>Route with params</h1>

    {{ $route.params.id }}

    <p>You should not use the '$route' object reactively in the component: it will change when leaving the route.</p>
    <p>It is recommended to user <a href="https://router.vuejs.org/en/essentials/passing-props.html" target="_blank">props</a> instead!</p>
  </div>
</template>
