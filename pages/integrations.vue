<template>
  <div>
    <hero-bar>
      <b-icon
        pack="fas"
        icon="key"
        size="is-small"
        style="margin: 1rem"
      />
      Integrációk
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component
          title="Billingo"
          icon="file-invoice"
          class="tile is-child"
        >
          <ValidationObserver>
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
            </form>
          </ValidationObserver>
        </card-component>
      </tiles>
      <tiles>
        <card-component
          title="Szamlazz.hu"
          icon="file-invoice"
          class="tile is-child"
        >
          <ValidationObserver>
            <form @submit.prevent="submit">
              <b-field label="Állapot">
                <b-switch
                  v-model="company.szamlazzhuIntegrated"
                  type="is-success"
                >
                  {{ company.szamlazzhuIntegrated ? 'Integrálva' : 'Nincs integrálva' }}
                </b-switch>
              </b-field>
              <b-field
                v-if="company.szamlazzhuIntegrated"
                label="Auth Token"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Szamlazz Auth Token"
                  rules="required|min:5"
                >
                  <b-input
                    v-model="company.szamlazzhuAuthToken"
                    type="password"
                  />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
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
          <ValidationObserver>
            <form @submit.prevent="submit">
              <b-field label="Állapot">
                <b-switch
                  v-model="company.otpSimplePayIntegrated"
                  type="is-success"
                >
                  {{ company.otpSimplePayIntegrated ? 'Integrálva' : 'Nincs integrálva' }}
                </b-switch>
              </b-field>
              <b-field
                v-if="company.otpSimplePayIntegrated"
                label="Privát kulcs"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="SimplePay privát kulcs"
                  rules="required|min:5"
                >
                  <b-input
                    v-model="company.otpSimplePayPrivateKey"
                    type="password"
                  />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
              <b-field
                v-if="company.otpSimplePayIntegrated"
                label="Publikus kulcs"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="SimplePay publikus kulcs"
                  rules="required|min:5"
                >
                  <b-input v-model="company.otpSimplePayPublicKey" />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
            </form>
          </ValidationObserver>
        </card-component>
      </tiles>
      <tiles>
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
              <hr>
              <b-button
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
        szamlazzhuIntegrated: false,
        szamlazzhuAuthToken: '',
        otpSimplePayIntegrated: false,
        otpSimplePayPublicKey: '',
        otpSimplePayPrivateKey: '',
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
      title: 'DeelPay integrációk'
    }
  },
  computed: {},
  async mounted () {
    try {
      this.company = await this.$strapi.$http.$get(
        '/companies/own/integrations'
      )
    } catch (err) {
      this.$buefy.toast.open({
        message: 'Nem sikerült betölteni az integrációs adatokat',
        type: 'is-danger'
      })
    }
  },
  methods: {
    async submit () {
      if (
        this.company.szamlazzhuIntegrated &&
        this.company.billingoIntegrated
      ) {
        this.$buefy.toast.open({
          message:
            'A Számlázázz.hu és a Billingo integráció nem lehet egyszerre bekapcsolva!',
          type: 'is-danger',
          size: 'is-big',
          queue: false,
          duration: 4000,
          pauseOnHover: true,
          position: 'is-bottom'
        })
      } else {
        try {
          this.isLoading = true

          await this.$strapi.$http.$put(
            '/companies/own/integrations',
            this.company
          )

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
}
</script>
