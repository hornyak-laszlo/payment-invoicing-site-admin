<template>
  <div>
    <hero-bar>
      Vásárló szerkesztése
      <nuxt-link
        slot="right"
        to="/customers"
        class="button"
      >
        Vissza a vásárlókhoz
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="tile is-child"
        :title="`Vásárló - ID: ${$route.params.id}`"
        icon="user"
      >
        <form @submit.prevent="submit">
          <b-field
            label="Vezetéknév"
            message="A vásárló vezetékneve"
            horizontal
          >
            <ValidationProvider
              v-slot="{ errors }"
              name="Vezetéknév"
              rules="required"
            >
              <b-input
                v-model="customer.purchases[0].lastName"
                required
              />
              <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-field>
          <b-field
            label="Keresztnév"
            message="A vásárló keresztneve"
            horizontal
          >
            <ValidationProvider
              v-slot="{ errors }"
              name="Család név"
              rules="required"
            >
              <b-input
                v-model="customer.purchases[0].firstName"
                required
              />
              <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-field>
          <b-field
            label="Cégnév"
            message="A vásárló cégneve"
            horizontal
          >
            <ValidationProvider
              v-slot="{ errors }"
              name="Cég név"
              rules="required"
            >
              <b-input
                v-model="customer.purchases[0].companyName"
                required
              />
              <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-field>

          <b-field
            label="Telefonszám"
            message="A vásárló telefonszáma"
            horizontal
          >
            <ValidationProvider
              v-slot="{ errors }"
              name="Telefonszám"
              rules="required"
            >
              <b-input
                v-model="customer.purchases[0].phoneNumber"
                type="number"
                required
              />
              <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-field>
          <b-field
            label="Email cím"
            message="A vásárló email címe"
            horizontal
          >
            <ValidationProvider
              v-slot="{ errors }"
              name="Email"
              rules="required|email"
            >
              <b-input
                v-model="customer.email"
                type="email"
                required
              />
              <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-field>

          <hr>
          <b-field horizontal>
            <nuxt-link
              to="/customers"
              class="button is-primary is-outlined"
            >
              Vissza a vásárlókhoz
            </nuxt-link>
          </b-field>
        </form>
      </card-component>
    </section>
  </div>
</template>

<script>

import HeroBar from '@/components/common/HeroBar'
import CardComponent from '@/components/common/CardComponent'

export default {

  components: {
    HeroBar,
    CardComponent
  },
  data () {
    return {
      isLoading: false,
      collection: 'customers',
      customer: {
        email: '',
        purchases: [{ products: [] }]
      }
    }
  },
  head () {
    return {
      title: 'Vásárló megtekintése'
    }
  },
  computed: {

  },
  async mounted () {
    try {
      this.customer = await this.$strapi.findOne(this.collection, this.$route.params.id)
    } catch (err) {
      this.$buefy.toast.open({
        message: `Error: ${err.message}`,
        type: 'is-danger',
        queue: false
      })
    }
    console.log(this.customer.purchases[0].firstName)
  },
  methods: {
    getClearFormObject () {
      return {
        firstName: '',
        lastName: '',
        companyName: '',
        phoneNumber: '',
        email: '',

        purchases: []

      }
    },
    async getData () {
      if (this.$route.params.id) {
        try {
          const res = await this.$strapi.findOne(this.collection, this.$route.params.id)
          return res
        } catch (err) {
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger',
            queue: false
          })
        }
      }
    },
    async submit () {
      try {
        this.isLoading = true

        await this.$strapi.update(this.collection, parseInt(this.$route.params.id), this.contact)

        this.isLoading = false
        /* this.$buefy.toast.open({
          message: 'Sikeresen mentve',
          type: 'is-primary'
          queue: false
        }) */
        this.$buefy.snackbar.open({
          message: 'Sikeresen mentve',
          type: 'is-white has-text-white has-background-primary',
          queue: false
        })
        this.$router.push('/contacts')
      } catch (err) {
        this.isLoading = false
        this.$buefy.toast.open({
          message: `Error: ${err.message}`,
          type: 'is-danger',
          queue: false
        })
      }
    }
  }
}
</script>

<style>
</style>
