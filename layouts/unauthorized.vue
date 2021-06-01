<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  mounted () {
    document.documentElement.classList.remove('has-aside-left')
    document.documentElement.classList.remove('has-aside-mobile-transition')
    document.documentElement.classList.remove('has-navbar-fixed-top')
    document.documentElement.classList.remove('has-aside-expanded')
  }
}
</script>

<style>
</style>
