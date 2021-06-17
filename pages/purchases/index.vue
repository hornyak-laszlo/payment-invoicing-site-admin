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
        field: 'customer',
        title: 'Ügyfél'
      }, {
        field: 'deliveryAddress',
        title: 'Szállítási cím'
      }, {
        field: 'invoiceAddress',
        title: 'Számlázási cím'
      }, {
        field: 'paymentMethod',
        title: 'Fizetési mód'
      }, {
        field: 'isNewsletterSubscribed',
        title: 'Hírlevél'
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
