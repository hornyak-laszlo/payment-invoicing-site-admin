<template>
  <div>
    <hero-bar>
      Vásárlók
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table"
        title="Vásárlók"
        icon="user-tag"
      >
        <data-table
          :fields="fields"
          :collection="collection"
          :read-only="true"
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
  name: 'Customers',
  components: {
    HeroBar,
    DataTable,
    CardComponent
  },
  data () {
    return {
      collection: 'customers',
      fields: [{
        field: 'lastPurchaseName',
        title: 'Név'
      }, {
        field: 'email',
        title: 'Email cím'
      }, {
        field: 'sumOfPurchases',
        title: 'Összes vásárlás összege'
      }, {
        field: 'lastPurchaseDate',
        title: 'Legutóbbi vásárlás'
      }]
    }
  },
  head () {
    return {
      title: 'Vásárlók'
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
