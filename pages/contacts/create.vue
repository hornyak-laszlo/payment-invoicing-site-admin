<template>
  <div>
    <hero-bar>
      <b-icon
        pack="fas"
        icon="user"
        size="is-small"
        style="margin: 1rem"
      />
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
      <card-component>
        <ValidationObserver v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <b-field grouped>
              <b-field
                expanded
                label="Vezetéknév"
                message="A kontakt keresztneve"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Vezetéknév"
                  rules="required"
                >
                  <b-input
                    v-model="contact.lastName"
                    required
                    placeholder="Vezetéknév"
                  />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
              <b-field
                label="Keresztnév"
                message="A kontakt vezetékneve"
                expanded
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Keresztnév"
                  rules="required"
                >
                  <b-input
                    v-model="contact.firstName"
                    required
                    placeholder="Keresztnév"
                  />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
            </b-field>

            <b-field
              label="Email cím"
              message="A kontakt email címe"
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

            <b-field
              label="Telefonszám"
              message="A kontakt telefonszáma"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="Telefonszám"
                rules="required"
              >
                <b-input
                  v-model="contact.phoneNumber"
                  required
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>

            <b-field
              label="Cég név"
              message="A kontakt cégének a neve"
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

            <b-field grouped>
              <b-field
                expanded
                label="Adatvédelmi nyilatkozat elfogadva"
                message="Elfogadta-e a kontakt az adatvédelmi nyilatkozatot"
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
                expanded
                label="Hírlevélre feliratkozott-e"
                message="A kontakt feliratkozott-e a hírlevélre"
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
            </b-field>

            <hr>
            <b-field>
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
        isNewsletterSubscribed: null,
        isPrivacyPolicyAccepted: null,
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
