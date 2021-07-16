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
        />
      </card-component>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import HeroBar from '@/components/common/HeroBar'
import CardComponent from '@/components/common/CardComponent'
import DataTable from '@/components/DataTable'
export default {
  name: 'Home',
  components: {
    HeroBar,
    DataTable,
    CardComponent
  },
  data () {
    return {
      collection: 'products',
      fields: [{
        field: 'name',
        title: 'Név'
      }, {
        field: 'grossPrice',
        title: 'Bruttó ár'
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
