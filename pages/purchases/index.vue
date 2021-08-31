<template>
  <div>
    <hero-bar>
      <b-icon
        pack="fas"
        icon="shopping-basket"
        size="is-small"
        style="margin: 1rem"
      />
      Vásárlások
      <nuxt-link
        slot="right"
        to="/purchases/create"
        class="button"
      >
        Új vásárlás
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table">
        <data-table
          :fields="fields"
          :collection="collection"
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
        field: 'lastName',
        title: 'Vezetéknév'
      }, {
        field: 'firstName',
        title: 'Keresztnév'
      }, {
        customFn: (data) => {
          const statuses = {
            payed: 'Fizetve',
            ordered: 'Megrendelve',
            shipped: 'Kiszállítva'
          }
          return statuses[data.status]
        },
        field: 'status',
        title: 'Vásárlás státusza'
      }, {
        field: 'sumOfPurchase',
        title: 'Vásárlás értéke'
      },
      {
        field: 'products',
        title: 'Termék típusa'
      }],
      purchases: [{ products: [] }],
      type: ''
    }
  },
  head () {
    return {
      title: 'Vásárlások'
    }
  },
  computed: {
    typeCheck () {
      return 'products[0].type'
    }
  },
  async mounted () {
    this.purchases = await this.$strapi.find('purchases')
    this.type = this.purchases[0].products[0].type
    console.log(this.type)
  },
  methods: {
  }
}
</script>
