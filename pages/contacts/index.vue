<template>
  <div>
    <hero-bar>
      <b-icon
        pack="fas"
        icon="user"
        size="is-small"
        style="margin: 1rem"
      />
      Kontaktok
      <nuxt-link
        slot="right"
        to="/contacts/create"
        class="button is-primary"
      >
        Új kontakt hozzáadása
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
  name: 'Contacts',
  components: {
    HeroBar,
    DataTable,
    CardComponent
  },
  data () {
    return {
      collection: 'contacts',
      fields: [
        {
          field: 'companyName',
          title: 'Cégnév'
        },
        {
          field: 'lastName',
          title: 'Vezetéknév'
        },
        {
          field: 'firstName',
          title: 'Keresztnév'
        },
        {
          field: 'email',
          title: 'Email cím'
        },
        {
          field: 'phoneNumber',
          title: 'Telefonszám'
        }
      ]
    }
  },
  head () {
    return {
      title: 'DeelPay kontaktok'
    }
  },
  computed: {},
  mounted () {},
  methods: {}
}
</script>
