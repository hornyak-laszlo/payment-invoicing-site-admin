<template>
  <div>
    <hero-bar>
      Integrációk
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component
          title="Billingo"
          icon="file-invoice"
          class="tile is-child"
        >
          <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="submit">
              <b-field label="Állapot">
                <b-switch
                  v-model="company.billingoIntegrated"
                  type="is-success"
                >
                  {{ company.billingoIntegrated ? 'Integrálva' : 'Nincs integrálva' }}
                </b-switch>
              </b-field>
              <ValidationProvider
                v-slot="{ errors }"
                name="Billingo API kulcs"
                rules="required|min:5"
              >
                <b-field
                  v-if="company.billingoIntegrated"
                  label="API Kulcs"
                >
                  <b-input
                    v-model="company.billingoApiKey"
                    type="password"
                  />
                </b-field>
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
              <b-button
                v-if="company.billingoIntegrated"
                type="is-primary"
                :loading="isLoading"
                expanded
                :disabled="invalid"
                native-type="submit"
              >
                Mentés
              </b-button>
            </form>
          </ValidationObserver>
        </card-component>
        <card-component
          title="Szamlazz.hu"
          icon="file-invoice"
          class="tile is-child"
        >
          <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="submit">
              <b-field label="Állapot">
                <b-switch
                  v-model="company.szamlazzIntegrated"
                  type="is-success"
                >
                  {{ company.szamlazzIntegrated ? 'Integrálva' : 'Nincs integrálva' }}
                </b-switch>
              </b-field>
              <b-field
                v-if="company.szamlazzIntegrated"
                label="Auth Token"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Szamlazz Auth Token"
                  rules="required|min:5"
                >
                  <b-input v-model="company.szamlazzAuthToken" />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
              <b-button
                v-if="company.szamlazzIntegrated"
                type="is-primary"
                :loading="isLoading"
                expanded
                :disabled="invalid"
                native-type="submit"
              >
                Mentés
              </b-button>
            </form>
          </ValidationObserver>
        </card-component>
      </tiles>
      <tiles>
        <card-component
          title="OTP SimplePay"
          icon="money-check-alt"
          class="tile is-child"
        >
          <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="submit">
              <b-field label="Állapot">
                <b-switch
                  v-model="company.simplePayIntegrated"
                  type="is-success"
                >
                  {{ company.simplePayIntegrated ? 'Integrálva' : 'Nincs integrálva' }}
                </b-switch>
              </b-field>
              <b-field
                v-if="company.simplePayIntegrated"
                label="Privát kulcs"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="SimplePay privát kulcs"
                  rules="required|min:5"
                >
                  <b-input v-model="company.simplePayPrivateKey" />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
              <b-field
                v-if="company.simplePayIntegrated"
                label="Publikus kulcs"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="SimplePay publikus kulcs"
                  rules="required|min:5"
                >
                  <b-input v-model="company.simplePayPublicKey" />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
              <b-button
                v-if="company.simplePayIntegrated"
                type="is-primary"
                :loading="isLoading"
                expanded
                :disabled="invalid"
                native-type="submit"
              >
                Mentés
              </b-button>
            </form>
          </ValidationObserver>
        </card-component>
        <card-component
          title="Stripe"
          icon="cc-stripe"
          icon-pack="fab"
          class="tile is-child"
        >
          <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="submit">
              <b-field label="Állapot">
                <b-switch
                  v-model="company.stripeIntegrated"
                  type="is-success"
                >
                  {{ company.stripeIntegrated ? 'Integrálva' : 'Nincs integrálva' }}
                </b-switch>
              </b-field>
              <b-field
                v-if="company.stripeIntegrated"
                label="Privát kulcs"
              >
                <b-input
                  v-model="company.stripePrivateKey"
                  type="password"
                />
              </b-field>
              <b-field
                v-if="company.stripeIntegrated"
                label="Publikus kulcs"
              >
                <b-input
                  v-model="company.stripePublicKey"
                  type="password"
                />
              </b-field>
              <b-field
                v-if="company.stripeIntegrated"
                label="Webhook ID"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Stripe webhook ID"
                  rules="required|min:5"
                >
                  <b-input v-model="company.stripeWebhookId" />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
              <b-field
                v-if="company.stripeIntegrated"
                label="Webhook secret"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Stripe webhook secret"
                  rules="required|min:5"
                >
                  <b-input
                    v-model="company.stripeWebhookSecret"
                    type="password"
                  />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
              <b-button
                v-if="company.stripeIntegrated"
                type="is-primary"
                :loading="isLoading"
                expanded
                :disabled="invalid"
                native-type="submit"
              >
                Mentés
              </b-button>
            </form>
          </ValidationObserver>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import CardComponent from '@/components/common/CardComponent'
import HeroBar from '@/components/common/HeroBar'
import Tiles from '@/components/common/Tiles'

export default {
  name: 'Integrations',
  components: {
    Tiles,
    HeroBar,
    CardComponent
  },
  data () {
    return {
      company: {
        billingoIntegrated: false,
        billingoApiKey: '',
        szamlazzIntegrated: false,
        szamlazzAuthToken: '',
        simplePayIntegrated: false,
        simplePayPublicKey: '',
        simplePayPrivateKey: '',
        stripeIntegrated: false,
        stripePublicKey: '',
        stripePrivateKey: '',
        stripeWebhookId: '',
        stripeWebhookSecret: ''
      },
      isLoading: false
    }
  },
  head () {
    return {
      title: 'Integrációk'
    }
  },
  computed: {
  },
  async mounted () {
    try {
      if (this.$strapi.user.company >= 0) {
        const data = await this.$strapi.$http.$get('/companies/own/integrations')
        this.company.stripeIntegrated = data.stripeIntegrated
        this.company.stripePrivateKey = data.stripePrivateKey
        this.company.stripePublicKey = data.stripePublicKey
        this.company.stripeWebhookId = data.stripeWebhookId
        this.company.stripeWebhookSecret = data.stripeWebhookSecret
        this.company.billingoIntegrated = data.billingoIntegrated
        this.company.billingoApiKey = data.billingoApiKey
      }
    } catch (err) {
      this.$buefy.toast.open({
        message: 'Nem sikerült betölteni az integrációs adatokat',
        type: 'is-danger'
      })
    }
  },
  methods: {
    async submit () {
      try {
        this.isLoading = true

        await this.$strapi.$http.$put('/companies/own/integrations', this.company)

        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Sikeresen mentve',
          queue: false
        })
        this.$router.push('/integrations')
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
