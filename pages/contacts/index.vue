<template>
  <div>
    <hero-bar>
      Kontaktok
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table"
        title="Kontaktok"
        icon="account-multiple"
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
        field: 'customer',
        title: 'Ügyfél'
      }, {
        field: 'isNewsletterSubscribed',
        title: 'Hírlevél'
      }]
    }
  },
  head () {
    return {
      title: 'Kontaktok'
    }
  },
  computed: {
    titleStack () {
      return ['Leadek', 'Kontaktok']
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
