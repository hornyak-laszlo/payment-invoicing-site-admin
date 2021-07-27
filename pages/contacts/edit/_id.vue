<template>
  <div>
    <hero-bar>
      Kontakt szerkesztése
      <nuxt-link
        slot="right"
        to="/contacts"
        class="button"
      >
        Vissza a kontaktokhoz
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="tile is-child"
        :title="`Kontakt - ID: ${$route.params.id}`"
        icon="user"
      >
        <form @submit.prevent="submit">
          <b-field
            label="Keresztnév"
            message="A kontakt keresztneve"
            horizontal
          >
            <b-input
              v-model="contact.firstName"
              required
            />
          </b-field>
          <b-field
            label="Család név"
            message="A kontakt vezetékneve"
            horizontal
          >
            <b-input
              v-model="contact.lastName"
              required
            />
          </b-field>
          <b-field
            label="Cégnév"
            message="A kontakt cégneve"
            horizontal
          >
            <b-input
              v-model="contact.companyName"
              required
            />
          </b-field>

          <b-field
            label="Adatvédelmi nyilatkozat elfogadva"
            message="Elfogadta-e a kontakt az adatvédelmi nyilatkozatot"
            horizontal
          >
            <b-select
              v-model="contact.isPrivacyPolicyAccepted"
              required
            >
              <option :value="true">
                igen
              </option>
              <option :value="false">
                nem
              </option>
            </b-select>
          </b-field>
          <b-field
            label="Hírlevélre feliratkozott-e"
            message="A kontakt feliratkozott-e a hírlevélre"
            horizontal
          >
            <b-select
              v-model="contact.isNewsletterSubscribed"
              required
            >
              <option :value="true">
                igen
              </option>
              <option :value="false">
                nem
              </option>
            </b-select>
          </b-field>
          <b-field
            label="Telefonszám"
            message="A kontakt telefonszáma"
            horizontal
          >
            <b-input
              v-model="contact.phoneNumber"
              required
            />
          </b-field>
          <b-field
            label="Email cím"
            message="A kontakt email címe"
            horizontal
          >
            <b-input
              v-model="contact.email"
              required
            />
          </b-field>

          <hr>
          <b-field horizontal>
            <b-button
              type="is-primary"
              :loading="isLoading"
              native-type="submit"
            >
              Mentés
            </b-button>
            <nuxt-link
              to="/contacts"
              class="button is-secondary"
            >
              Vissza
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
      collection: 'contacts',
      searchParams: { id: `${this.$route.params.id}` },
      contact: this.getClearFormObject()
    }
  },
  head () {
    return {
      title: 'Kontakt szerkesztése'
    }
  },
  computed: {

  },
  async mounted () {
    this.contact = await this.getData()
    /* console.log(this.product.taxRate.name) */
  },
  methods: {
    getClearFormObject () {
      return {
        firstName: '',
        lastName: '',
        companyName: '',
        phoneNumber: '',
        isNewsletterSubscribed: true,
        isPrivacyPolicyAccepted: true,
        email: ''

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
