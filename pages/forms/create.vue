<template>
  <div>
    <hero-bar>
      <b-icon
        pack="fas"
        icon="columns"
        size="is-small"
        style="margin: 1rem"
      />
      Űrlap hozzáadása
      <nuxt-link
        slot="right"
        to="/forms"
        class="button is-primary"
      >
        Vissza az űrlapokhoz
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <nuxt-link
        slot="right"
        to="/contact-forms/create"
        class="button is-primary"
      >
        Kontakt űrlap
      </nuxt-link>

      <nuxt-link
        slot="right"
        to="/purchase-forms/create"
        class="button is-primary"
      >
        Vásárlás űrlap
      </nuxt-link>
    </section>
  </div>
</template>

<script>
import HeroBar from '@/components/common/HeroBar'
/* import CardComponent from '@/components/common/CardComponent' */

export default {
  name: 'FormCreate',
  components: {
    /* CardComponent */
    HeroBar
  },
  data () {
    return {
      isLoading: false

    }
  },
  head () {
    return {
      title: 'Űrlap hozzáadása'
    }
  },
  methods: {

  }
}
</script>
