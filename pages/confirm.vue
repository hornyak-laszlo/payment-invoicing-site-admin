<template>
  <section
    class="columns is-vcentered"
    style="height: 100vh"
  >
    <div class="column is-half is-offset-one-quarter">
      <card-component
        title="Regisztráció megerősítése"
        pack="fas"
        icon="user"
        class="title is-child"
      >
        <p class="has-text-centered mb-4">
          Küldtünk egy emailt a <em style="color: #374785">{{ $strapi.user.email }}</em> címedre, amivel meg tudod erősíteni a regisztrációdat.
        </p>
        <hr>
        <nuxt-link to="/login">
          <button class="button is-primary is-fullwidth ">
            Tovább a bejelentkezéshez
          </button>
        </nuxt-link>
      </card-component>
    </div>
  </section>
</template>
<script>
import CardComponent from '@/components/common/CardComponent'

export default {
  components: {
    CardComponent
  },
  layout: 'unauthorized',
  data () {
    return {}
  },
  head () {
    return {
      title: 'DeelPay megerősítés'
    }
  },
  computed: {},
  methods: {}
}
</script>
