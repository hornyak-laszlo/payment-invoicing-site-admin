<template>
  <div>
    <hero-bar>
      <b-icon
        pack="fas"
        icon="tags"
        size="is-small"
        style="margin: 1rem"
      />
      Termékek
      <nuxt-link
        slot="right"
        to="/products/create"
        class="button is-primary"
      >
        Termék hozzáadása
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table">
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
      fields: [
        {
          field: 'name',
          title: 'Név'
        },
        {
          field: 'grossPrice',
          title: 'Bruttó ár'
        }
      ]
    }
  },
  head () {
    return {
      title: 'DeelPay termékek'
    }
  },
  computed: {},
  mounted () {},
  methods: {}
}
</script>
