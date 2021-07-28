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
  name: 'Contacts',
  components: {
    HeroBar,
    DataTable,
    CardComponent
  },
  data () {
    return {
      collection: 'customers',
      fields: [{
        field: 'companyName',
        title: 'Cégnév'
      }, {
        field: 'firstName',
        title: 'Vezetéknév'
      }, {
        field: 'lastName',
        title: 'Keresztnév'
      }, {
        field: 'email',
        title: 'Email'
      }, {
        field: 'phoneNumber',
        title: 'Telefon'
      }, {
        field: 'sumOfPurchase',
        title: 'Vásárlói érték'
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
