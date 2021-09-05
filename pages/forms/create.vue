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
      <div class="card">
        <div class="card-content">
          <div class="level">
            <div
              class="level-right"
              style="margin: 2rem"
            >
              <nuxt-link
                slot="right"
                to="/contact-forms/create"
                class="button is-primary"
                style="width: 100%"
              >
                <span>Új <strong>Kontakt</strong> űrlap</span>
              </nuxt-link>
            </div>
            <div
              class="level-left"
              style="margin: 2rem"
            >
              <nuxt-link
                slot="right"
                to="/purchase-forms/create"
                class="button is-primary"
                style="width: 100%"
              >
                <span>Új <strong>Vásárlás</strong> űrlap</span>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeroBar from '@/components/common/HeroBar'
/* import CardComponent from '@/components/common/CardComponent' */
/* import Tiles from '@/components/common/Tiles' */

export default {
  name: 'FormCreate',
  components: {
    /* Tiles, */
    /* CardComponent, */
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
