<template>
  <div>
    <h1>Hello World!</h1>
    <p v-if="loading">
      Loading products...
    </p>
    <pre v-else>{{ products }}</pre>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data () {
    return {
      loading: true,
      products: []
    }
  },
  async mounted () {
    await this.$nextTick(async () => {
      this.$nuxt.$loading.start()

      this.loading = true
      this.products = await this.$strapi.find('products')
      this.loading = false

      setTimeout(() => this.$nuxt.$loading.finish(), 0)
    })
  }
}
</script>
