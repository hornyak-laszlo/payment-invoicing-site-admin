<template>
  <div>
    <hero-bar>
      Kontakt hozzáadása
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
        icon="tags"
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
      contact: {
        firstName: '',
        lastName: '',
        companyName: '',
        phoneNumber: '',
        isNewsletterSubscribed: true,
        isPrivacyPolicyAccepted: true,
        email: ''
      }
    }
  },
  head () {
    return {
      title: 'Kontakt hozzáadása'
    }
  },
  computed: {

    save () {
      return this.contact.name && this.contact.description && this.contact.nameInvoice && this.contact.grossPrice && this.contact.type && this.contact.taxRate.name.length > 2
    }
  },
  methods: {
    async submit () {
      try {
        this.isLoading = true

        await this.$strapi.create('contacts', this.contact)

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
