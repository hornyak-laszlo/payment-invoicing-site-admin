<template>
  <div>
    <hero-bar>
      Termékek
      <nuxt-link
        slot="right"
        to="/client"
        class="button"
      >
        Termék hozzáadása
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table"
        title="Termékek"
        icon="tags"
      >
        <data-table
          :fields="fields"
          :collection="collection"
          :checkable="false"
          :search-params="searchParams"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
import HeroBar from '@/components/common/HeroBar'
import CardComponent from '@/components/common/CardComponent'
import DataTable from '@/components/DataTable'
export default {
  components: {
    HeroBar,
    DataTable,
    CardComponent
  },
  data () {
    return {
      collection: 'products',
      searchParams: { id: 3 },
      fields: [{
        field: 'name',
        title: 'Név'
      }, {
        field: 'description',
        title: 'Leírás'
      }]
    }
  },
  head () {
    return {
      title: 'Termékek'
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>

<style>
</style>
