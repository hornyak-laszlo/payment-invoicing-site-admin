<template>
  <div>
    <hero-bar>
      Kontakt űrlapok
      <nuxt-link slot="right" to="/client" class="button">
        Űrlap hozzáadása
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table"
        title="Kontakt űrlapok"
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
  name: 'ContactForms',
  components: {
    HeroBar,
    DataTable,
    CardComponent
  },
  data () {
    return {
      collection: 'contact-forms',
      fields: [{
        field: 'name',
        title: 'Név'
      }, {
        field: 'contactLink',
        title: 'Link'
      }]
    }
  },
  head () {
    return {
      title: 'Kontakt űrlapok'
    }
  },
  computed: {
    titleStack () {
      return ['Leadek', 'Űrlapok']
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
