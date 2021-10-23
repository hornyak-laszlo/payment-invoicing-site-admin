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
        class="button is-primary"
      >
        Új vásárlás
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table">
        <b-tabs
          type="is-boxed"
          expanded
        >
          <b-tab-item>
            <template #header>
              <b-icon
                pack="fas"
                icon="shopping-basket"
              />
              <span> <strong>Vásárlások</strong> </span>
            </template>
            <data-table
              :fields="fields"
              :collection="collection"
              :custom-data-fn="oneTimePurchases"
            />
          </b-tab-item>

          <b-tab-item>
            <template #header>
              <b-icon icon="information-outline" />
              <span> <strong>Előfizetések</strong> </span>
            </template>
            <data-table
              :fields="fields"
              :collection="collection"
              :custom-data-fn="subscriptionPurchases"
            />
          </b-tab-item>
        </b-tabs>
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
      subscriptions: [],
      oneTimeProducts: [],
      collection: 'purchases',
      fields: [
        {
          field: 'lastName',
          title: 'Vezetéknév'
        },
        {
          field: 'firstName',
          title: 'Keresztnév'
        },
        {
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
        },
        {
          field: 'sumOfPurchase',
          title: 'Vásárlás értéke'
        },
        {
          customFn: (data) => {
            const productTypes = {
              one_time: 'Egyszeri',
              subscription: 'Előfizetéses'
            }
            return productTypes[data.type]
          },
          field: 'purchaseType',
          title: 'Vásárlás típusa'
        }
      ],
      purchases: [{ products: [] }],
      type: '',
      columns: [
        {
          field: 'id',
          label: 'ID',
          sortable: true,
          numeric: true,
          width: '30'
        },
        {
          field: 'lastName',
          label: 'Vezetéknév'
        },
        {
          field: 'firstName',
          label: 'Keresztnév'
        },
        {
          field: 'status',
          label: 'Vásárlás státusza'
        },
        {
          field: 'sumOfPurchase',
          label: 'Vásárlás értéke'
        },
        {
          field: 'period',
          label: 'Gyakoriság'
        },
        {
          field: 'subscriptionStatus',
          label: 'Előfizetés státusza'
        },
        {
          field: 'type',
          label: 'Vásárlás típusa'
        }
      ],
      oneTimePurchases: async () => {
        const purchases = await this.$strapi.find('purchases')
        const subscriptions = purchases.filter(
          purchase => purchase.type === 'one_time'
        )
        return subscriptions
      },
      subscriptionPurchases: async () => {
        const purchases = await this.$strapi.find('purchases')
        const subscriptions = purchases.filter(
          purchase => purchase.type === 'subscription'
        )
        return subscriptions
      }
    }
  },
  head () {
    return {
      title: 'Vásárlások'
    }
  },
  computed: {},
  async mounted () {},
  methods: {}
}
</script>
