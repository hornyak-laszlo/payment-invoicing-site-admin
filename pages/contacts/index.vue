<template>
  <div>
    <hero-bar>
      Kontaktok
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table"
        title="Kontaktok"
        icon="user"
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
  name: 'Contacts',
  components: {
    HeroBar,
    DataTable,
    CardComponent
  },
  data () {
    return {
      collection: 'contacts',
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
        title: 'Email cím'
      }, {
        field: 'phoneNumber',
        title: 'Telefonszám'
      }]
    }
  },
  head () {
    return {
      title: 'Kontaktok'
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
