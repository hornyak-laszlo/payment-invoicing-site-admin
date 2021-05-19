<template>
  <div>
    <h1>Hello World!</h1>
    <pre>{{page}}</pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useContext, useFetch, useMeta } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const { $strapi } = useContext()
    const page = ref([]) // page.value

    useFetch(async () => {
      const products = await $strapi.find('products')
      page.value = products
    })

    return {
      page
    }
  }
})
</script>

<style>
</style>
