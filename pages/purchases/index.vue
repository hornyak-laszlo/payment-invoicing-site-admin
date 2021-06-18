<template>
  <div>
    <hero-bar>
      Vásárlások
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table"
        title="Vásárlások"
        icon="shopping-basket"
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
  name: 'Purchases',
  components: {
    HeroBar,
    DataTable,
    CardComponent
  },
  data () {
    return {
      collection: 'purchases',
      fields: [{
        field: 'firstName',
        title: 'Vezetéknév'
      }, {
        field: 'lastName',
        title: 'Keresztnév'
      }, {
        field: 'paymentMethod',
        title: 'Fizetési mód'
      }, {
        field: 'sumOfPurchase',
        title: 'Vásárlás értéke'
      }]
    }
  },
  head () {
    return {
      title: 'Vásárlások'
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
