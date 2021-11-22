<template>
  <div>
    <hero-bar>
      <b-icon
        pack="fas"
        icon="columns"
        size="is-small"
        style="margin: 1rem"
      />
      Űrlapok
      <nuxt-link
        slot="right"
        to="/forms/create"
        class="button is-primary"
      >
        <p>Új űrlap</p>
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table">
        <data-table
          :fields="fields"
          :custom-collection-fn="customCollectionFn"
          :custom-data-fn="customDataFn"
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
  name: 'Forms',
  components: {
    HeroBar,
    DataTable,
    CardComponent
  },
  data () {
    return {
      fields: [
        {
          field: 'name',
          title: 'Név'
        },
        {
          field: 'link',
          title: 'Link'
        }
      ],
      customCollectionFn: (row) => {
        return row.type
      },
      customDataFn: async () => {
        const contactFormsData = await this.$strapi.find('contact-forms')
        const purchaseFormsData = await this.$strapi.find('purchase-forms')
        contactFormsData.forEach((data) => {
          data.type = 'contact-forms'
        })
        purchaseFormsData.forEach((data) => {
          data.type = 'purchase-forms'
        })

        return [...contactFormsData, ...purchaseFormsData]
      }
    }
  },
  head () {
    return {
      title: 'DeelPay űrlapok'
    }
  },
  computed: {},
  mounted () {},
  methods: {}
}
</script>
