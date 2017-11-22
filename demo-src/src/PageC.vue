<template>
  <div class="page">
    <h1>Nested routes</h1>

    <nav>
      <router-link :to="{ name: 'page-c1' }" exact>Nested 1</router-link>
      <router-link :to="{ name: 'page-c2' }" exact>Nested 2</router-link>
    </nav>

    <router-view />
  </div>
</template>
