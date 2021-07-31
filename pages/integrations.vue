<template>
  <div>
    <hero-bar>
      Integrációk
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component title="Billingo" icon="file-invoice" class="tile is-child">
          <b-field label="Állapot">
            <b-switch v-model="billingoIntegrated" type="is-success">
              {{ billingoIntegrated ? 'Integrálva' : 'Nincs integrálva' }}
            </b-switch>
          </b-field>
          <b-field v-if="billingoIntegrated" label="API Kulcs">
            <b-input v-model="billingoApiKey" custom-class="is-static" readonly />
          </b-field>
        </card-component>
        <card-component title="Szamlazz.hu" icon="file-invoice" class="tile is-child">
          <b-field label="Állapot">
            <b-switch v-model="szamlazzIntegrated" type="is-success">
              {{ szamlazzIntegrated ? 'Integrálva' : 'Nincs integrálva' }}
            </b-switch>
          </b-field>
          <b-field v-if="szamlazzIntegrated" label="Auth Token">
            <b-input v-model="szamlazzAuthToken" custom-class="is-static" readonly />
          </b-field>
        </card-component>
      </tiles>
      <tiles>
        <card-component title="OTP SimplePay" icon="money-check-alt" class="tile is-child">
          <b-field label="Állapot">
            <b-switch v-model="simplePayIntegrated" type="is-success">
              {{ simplePayIntegrated ? 'Integrálva' : 'Nincs integrálva' }}
            </b-switch>
          </b-field>
          <b-field v-if="simplePayIntegrated" label="Privát kulcs">
            <b-input v-model="simplePayPrivateKey" custom-class="is-static" readonly />
          </b-field>
          <b-field v-if="simplePayIntegrated" label="Publikus kulcs">
            <b-input v-model="simplePayPublicKey" custom-class="is-static" readonly />
          </b-field>
        </card-component>
        <card-component title="Stripe" icon="cc-stripe" icon-pack="fab" class="tile is-child">
          <b-field label="Állapot">
            <b-switch v-model="stripeIntegrated" type="is-success">
              {{ stripeIntegrated ? 'Integrálva' : 'Nincs integrálva' }}
            </b-switch>
          </b-field>
          <b-field v-if="stripeIntegrated" label="Privát kulcs">
            <b-input v-model="stripePrivateKey" custom-class="is-static" readonly />
          </b-field>
          <b-field v-if="stripeIntegrated" label="Publikus kulcs">
            <b-input v-model="stripePublicKey" custom-class="is-static" readonly />
          </b-field>
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
      billingoIntegrated: false,
      billingoApiKey: '',
      szamlazzIntegrated: false,
      szamlazzAuthToken: '',
      simplePayIntegrated: false,
      simplePayPublicKey: '',
      simplePayPrivateKey: '',
      stripeIntegrated: false,
      stripePublicKey: '',
      stripePrivateKey: ''
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
      if (this.$strapi.user) {
        const companyId = (typeof this.$strapi.user.company === 'number') ? this.$strapi.user.company : this.$strapi.user.company.id
        const company = await this.$strapi.findOne('companies', companyId)
        this.stripeIntegrated = company.stripeIntegrated
      }
    } catch (err) {
      this.$buefy.toast.open({
        message: 'Nem sikerült betölteni az integrációs adatokat',
        type: 'is-danger'
      })
    }
  }
}
</script>
