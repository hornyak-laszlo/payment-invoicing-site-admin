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
        title="Új kontakt hozzáadása"
        icon="user"
      >
        <ValidationObserver v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <b-field
              label="Keresztnév"
              message="A kontakt keresztneve"
              horizontal
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="Keresztnév"
                rules="required"
              >
                <b-input
                  v-model="contact.firstName"
                  required
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>
            <b-field
              label="Vezetéknév"
              message="A kontakt vezetékneve"
              horizontal
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="Család név"
                rules="required"
              >
                <b-input
                  v-model="contact.lastName"
                  required
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>
            <b-field
              label="Cég név"
              message="A kontakt cégének a neve"
              horizontal
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="Cég név"
                rules="required"
              >
                <b-input
                  v-model="contact.companyName"
                  required
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
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
              <ValidationProvider
                v-slot="{ errors }"
                name="Telefonszám"
                rules="required"
              >
                <b-input
                  v-model="contact.phoneNumber"
                  type="number"
                  required
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>
            <b-field
              label="Email cím"
              message="A kontakt email címe"
              horizontal
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="Email"
                rules="required|email"
              >
                <b-input
                  v-model="contact.email"
                  type="email"
                  required
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>

            <hr>
            <b-field horizontal>
              <b-button
                type="is-primary"
                :loading="isLoading"
                native-type="submit"
                expanded
                :disabled="invalid"
              >
                Mentés
              </b-button>
            </b-field>
          </form>
        </ValidationObserver>
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
