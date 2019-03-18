<h1>vue-router-multi-view</h1>

<p>
<a href="https://www.npmjs.com/package/vue-router-multi-view"><img src="https://img.shields.io/npm/v/vue-router-multi-view.svg"/> <img src="https://img.shields.io/npm/dm/vue-router-multi-view.svg"/></a> <a href="https://vuejs.org/"><img src="https://img.shields.io/badge/vue-2.x-brightgreen.svg"/></a>
</p>

<p>
  <a href="https://www.patreon.com/akryum" target="_blank">
    <img src="https://c5.patreon.com/external/logo/become_a_patron_button.png" alt="Become a Patreon">
  </a>
</p>

## Sponsors

### Silver

<p align="center">
  <a href="https://vueschool.io/" target="_blank">
    <img src="https://vueschool.io/img/logo/vueschool_logo_multicolor.svg" alt="VueSchool logo" width="200px">
  </a>

  <a href="https://www.vuemastery.com/" target="_blank">
    <img src="https://cdn.discordapp.com/attachments/258614093362102272/557267759130607630/Vue-Mastery-Big.png" alt="Vue Mastery logo" width="200px">
  </a>
</p>

### Bronze

<p align="center">
  <a href="https://vuetifyjs.com" target="_blank">
    <img src="https://cdn.discordapp.com/attachments/537832759985700914/537832771691872267/Horizontal_Logo_-_Dark.png" width="100">
  </a>

  <a href="https://www.frontenddeveloperlove.com/" target="_blank" title="Frontend Developer Love">
    <img src="https://cdn.discordapp.com/attachments/258614093362102272/557267744249085953/frontend_love-logo.png" width="56">
  </a>
</p>

<br>

## About

Replace `<router-view/>` with `<router-multi-view/>` to keep the DOM of the deactivated route alive.

<br>

<img src="https://raw.githubusercontent.com/Akryum/vue-router-multi-view/master/dom.png?token=ACqyfFwilHbGgjKVXt9ptb7GI0nS2zYVks5aHqoqwA%3D%3D"/>

<br>

<img src="https://raw.githubusercontent.com/Akryum/vue-router-multi-view/master/devtool.png?token=ACqyfDURGLlC0Gyb0z5xWHOUJCjZhbmYks5aHs85wA%3D%3D" />

<br>

**Useful Links**

- [Live Demo](https://akryum.github.io/vue-router-multi-view/)

<br>


# Installation

## Npm

```
npm install --save vue-router-multi-view
```

Install the plugin into Vue:

```javascript
import Vue from 'vue'
import VueRouterMultiView from 'vue-router-multi-view'

Vue.use(VueRouterMultiView)
```

Or use the directives and components directly:

```javascript
import Vue from 'vue'
import { VueRouterMultiView } from 'vue-router-multi-view'

Vue.directive('router-multi-view', VueRouterMultiView)
```

## Browser

Include [vue-router-multi-view](/dist/vue-router-multi-view.min.js) in the page.

```html
<script src="https://unpkg.com/vue-router-multi-view"></script>
```

**If Vue is detected in the Page, the plugin is installed automatically.**

Manually install the plugin into Vue:

```javascript
Vue.use(VueRouterMultiView)
```

# Usage

Replace `<router-view/>` with `<router-multi-view/>` and replace the `name` prop by the `viewName` prop (this is to prevent potential conflicts with `<transition-group>`).

**:warning: Contrary to `<router-view/>`, `<router-multi-view/>` will need to wrap the content with an element or component (default: `<div>`).**

If you were using the [keep-alive](https://vuejs.org/v2/api/#keep-alive) component, you need to remove it. So if you had:

```html
<keep-alive>
  <router-view />
</keep-alive>
```

It should be replaced by:

```html
<router-multi-view />
```

`<router-multi-view />` already includes keep-alive and will trigger the `activated` and `deactivated` hooks on the children components.

**:warning: It is recommended to use [props](https://router.vuejs.org/en/essentials/passing-props.html) for the routes.**

Example:

```html
<template>
  <div id="app">
    <router-multi-view view-name="header" />
    <router-multi-view />
    <router-multi-view view-name="footer" />
  </div>
</template>
```

Example of rendered HTML:

```html
<div>
  <div class="page" data-route-path="/c" style="display: none;">
      <h1>Nested routes</h1>
      <nav><a href="/c/" class="">Nested 1</a> <a href="/c/nested2" class="">Nested 2</a></nav>
      <!---->
  </div>
  <div class="page" data-route-path="/b2/:id" data-route-name="page-b2" style="display: none;">
      <h1>Route with props params</h1>

      bar
  </div>
  <div class="page" data-route-path="" data-route-name="page-a" data-is-active="true">
      <h1>Simple page</h1>
  </div>
</div>
```

You can change the element or component used to wrap the routes with the `morph` prop:

```html
<router-multi-view morph="section" class="my-section" />
```

To use transition, you need to use the `viewName` prop to set the name of the view, to prevent a conflict with the `name` prop for the transition:

```html
<router-multi-view
  class="wrapper"

  view-name="default"
  morph="transition-group"

  tag="div"
  name="fade"
/>
```

Here `view-name` and `morph` are `<router-multi-view/>` props, while `tag` and `name` are `<transition-group>` props.
