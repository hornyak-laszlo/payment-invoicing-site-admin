<template>
  <div>
    <hero-bar>
      Termékek
      <nuxt-link slot="right" to="/client" class="button">
        Termék hozzáadása
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table"
        title="Termékek"
        icon="account-multiple"
      >
        <clients-table-sample
          :data-url="`products`"
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
import ClientsTableSample from '@/components/ClientsTableSample'
export default {
  name: 'Home',
  components: {
    HeroBar,
    ClientsTableSample,
    CardComponent
  },
  data () {
    return {
    }
  },
  head () {
    return {
      title: 'Termékek'
    }
  },
  computed: {
    titleStack () {
      return ['Értékesítés', 'Termékek']
    }
  },
  mounted () {
  },
  methods: {
  }
}
</script>
