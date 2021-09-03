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
      <!--  <nuxt-link
        slot="right"
        to="/contact-forms/create"
        class="button is-primary"
        style="marginRight: 1rem"
      >
        <p>Új <strong>kontakt</strong> űrlap</p>
      </nuxt-link>
      <nuxt-link
        slot="right"
        to="/purchase-forms/create"
        class="button is-primary"
      >
        <p>Új <strong>vásárlási</strong> űrlap</p>
      </nuxt-link> -->
      <nuxt-link
        slot="right"
        to="/forms/create"
        class="button is-primary"
      >
        <p><strong>Új</strong> űrlap</p>
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="has-table">
        <form-data-table />
      </card-component>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import HeroBar from '@/components/common/HeroBar'
import CardComponent from '@/components/common/CardComponent'
import FormDataTable from '@/components/FormDataTable'
export default {
  name: 'Forms',
  components: {
    HeroBar,
    FormDataTable,
    CardComponent
  },
  data () {
    return {
    }
  },
  head () {
    return {
      title: 'Űrlapok'
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
