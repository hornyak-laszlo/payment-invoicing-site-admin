<template>
  <div>
    <hero-bar>
      <b-icon
        pack="fas"
        icon="user-tag"
        size="is-small"
        style="margin: 1rem"
      />
      Vásárlók
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table">
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
import { convertToHungarianTime } from '@/utils/dateHelpers'
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
      fields: [
        {
          field: 'lastPurchaseName',
          title: 'Név'
        },
        {
          field: 'email',
          title: 'Email cím'
        },
        {
          field: 'sumOfPurchases',
          title: 'Összes vásárlás összege'
        },
        {
          customFn: data => convertToHungarianTime(data.lastPurchaseDate),
          field: 'lastPurchaseDate',
          title: 'Legutóbbi vásárlás'
        }
      ]
    }
  },
  head () {
    return {
      title: 'DeelPay vásárlók'
    }
  },
  computed: {},
  mounted () {},
  methods: {}
}
</script>
