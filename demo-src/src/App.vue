<template>
  <div id="app">
    <nav>
      <router-link
        v-for="route of routes"
        :key="route.to.name"
        :to="route.to"
        :exact="route.exact"
      >
        {{ route.label }}
      </router-link>
    </nav>
    <!-- <router-multi-view class="wrapper" /> -->
    <router-multi-view
      class="wrapper"
      morph="transition-group"
      tag="div"
      name="fade"
      view-name="default"
    />
  </div>
</template>

<script>
export default {
  created () {
    this.routes = [
      { to: { name: 'page-a' }, exact: true, label: 'Simple page' },
      { to: { name: 'page-b', params: { id: 'foo' } }, label: 'Route params' },
      { to: { name: 'page-b2', params: { id: 'bar' } }, label: 'Route props params' },
      { to: { name: 'page-c1' }, label: 'Nested route' },
    ]
  },
}
</script>


<style lang="stylus">
$color = #42b983

body
  margin 12px
  font-family "Source Sans Pro", "Helvetica Neue", Arial, sans-serif

a
  color $color

nav
  display flex
  align-items center
  justify-content center

  a
    display inline-block
    padding 4px 8px
    background white
    border solid 1px $color
    text-decoration none
    border-radius 3px
    flex auto 0 0

    &:not(:last-child)
      margin-right 4px

    &.router-link-active
      background $color
      color white

h1, h2
  font-weight normal

.wrapper
  width 100%
  max-width 900px
  height 600px
  margin 24px auto
  position relative

.page
  position absolute
  top 0
  left 0
  right 0
  padding 24px
  border-radius 3px
  box-shadow 0 15px 30px rgba(black, .04)

.fade-enter-active,
.fade-leave-active
  transition opacity .3s linear

.fade-enter,
.fade-leave-to
  opacity 0
</style>
