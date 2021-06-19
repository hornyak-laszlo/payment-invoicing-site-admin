<template>
  <div>
    <hero-bar>
      Vásárlási űrlapok
      <nuxt-link slot="right" to="/client" class="button">
        Űrlap hozzáadása
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table"
        title="Vásárlási űrlapok"
        icon="account-multiple"
      >
        <data-table
          :fields="fields"
          :collection="collection"
          :checkable="true"
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
  name: 'PurchaseForms',
  components: {
    HeroBar,
    DataTable,
    CardComponent
  },
  data () {
    return {
      collection: 'purchase-forms',
      fields: [{
        field: 'name',
        title: 'Név'
      }, {
        field: 'link',
        title: 'Link'
      }]
    }
  },
  head () {
    return {
      title: 'Vásárlási űrlapok'
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
