<template>
  <div>
    <hero-bar>
      Vásárlás szerkesztése
      <nuxt-link
        slot="right"
        to="/purchases"
        class="button"
      >
        Vissza a vásárlásokhoz
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        :title="`Űrlap - ID: ${purchase.id}`"
        icon="shopping-basket"
        class="tile is-child"
      >
        <form @submit.prevent="submit">
          <b-field
            label="Név"
            message="Vásárló neve"
            horizontal
          >
            <b-input
              v-model="purchase.firstName"
              placeholder="Keresztnév"
              required
            />
            <b-input
              v-model="purchase.lastName"
              placeholder="Vezetéknév"
              required
            />
          </b-field>
          <b-field
            label="Email"
            message="Vásárló e-mail címe"
            horizontal
          >
            <b-input
              v-model="purchase.email"
              required
            />
          </b-field>
          <b-field
            label="Telefonszám"
            message="Vásárló telefonszáma"
            horizontal
          >
            <b-input
              v-model="purchase.phoneNumber"
              required
            />
          </b-field>
          <b-field
            label="Kiszállítási cím"
            message="Ahova a terméket szállítani kell"
            horizontal
          >
            <b-input
              v-model="purchase.deliveryCountry"
              placeholder="Ország"
              required
            />
            <b-input
              v-model="purchase.deliveryCity"
              placeholder="Város"
              required
            />
            <b-input
              v-model="purchase.deliveryZip"
              placeholder="Irányítószám"
              required
            />
            <b-input
              v-model="purchase.deliveryStreetNo"
              placeholder="Utca és házszám"
              required
            />
          </b-field>
          <b-field
            label="Fizetési mód"
            message="Hogy fizet a vevő"
            horizontal
          >
            <b-select
              v-model="purchase.paymentMethod"
              required
            >
              <option value="transfer">
                Átutalás
              </option>
              <option value="creditCard">
                Bankkártya
              </option>
            </b-select>
          </b-field>
          <hr>
          <b-field horizontal>
            <b-button
              type="is-primary"
              :loading="isLoading"
              native-type="submit"
              expanded
            >
              Mentés
            </b-button>
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
  name: 'PurchaseEdit',
  components: {
    CardComponent,
    HeroBar
  },
  data () {
    return {
      isLoading: false,
      purchase: this.getClearFormObject()
    }
  },
  head () {
    return {
      title: 'Vásárlás szerkesztése'
    }
  },
  async mounted () {
    this.purchase = await this.getData()
  },
  methods: {
    getClearFormObject () {
      return {
        id: '',
        firstName: '',
        lastName: '',
        isGTCaccepted: null,
        isNewsletterSubscribed: null,
        isPrivacyPolicyAccepted: null,
        paymentMethod: '',
        email: '',
        phoneNumber: '',
        companyName: '',
        deliveryCountry: '',
        deliveryCity: '',
        deliveryZip: '',
        deliveryStreetNo: '',
        taxNumber: '',
        invoiceCountry: '',
        invoiceCity: '',
        invoiceZip: '',
        invoiceStreetNo: '',
        sumOfPurchase: '',
        products: [],
        status: '',
        company: {}
      }
    },
    async getData () {
      if (this.$route.params.id) {
        try {
          const res = await this.$strapi.findOne('purchases', this.$route.params.id)
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

        await this.$strapi.update('purchases', this.purchase.id, this.purchase)

        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Sikeresen mentve',
          queue: false
        })
        this.$router.push('/purchases')
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
