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
        class="tile is-child"
        :title="`Vásárlás - ID: ${$route.params.id}`"
        icon="shopping-basket"
      >
        <form @submit.prevent="submit">
          <b-field
            label="Keresztnév"
            message="A kontakt keresztneve"
            horizontal
          >
            <b-input
              v-model="customer.firstName"
              required
            />
          </b-field>
          <b-field
            label="Család név"
            message="A kontakt vezetékneve"
            horizontal
          >
            <b-input
              v-model="customer.lastName"
              required
            />
          </b-field>
          <b-field
            label="Cégnév"
            message="A kontakt cégneve"
            horizontal
          >
            <b-input
              v-model="customer.companyName"
              required
            />
          </b-field>

          <b-field
            label="Telefonszám"
            message="A kontakt telefonszáma"
            horizontal
          >
            <b-input
              v-model="customer.phoneNumber"
              required
            />
          </b-field>
          <b-field
            label="Email cím"
            message="A kontakt email címe"
            horizontal
          >
            <b-input
              v-model="customer.email"
              required
            />
          </b-field>
          <b-field
            label="Vásárlások összege"
            message="A vásárló eddigi összes vásárlásának összege"
            horizontal
          >
            <b-input
              v-model="customer.sumOfPurchase"
              required
            />
          </b-field>

          <b-field
            label="Számlázási cím"
            message="A vásárló számlázási címe"
            horizontal
          >
            <b-select
              v-model="customer.invoiceAddresses.id"
              required
            >
              <option
                v-for="invoiceAddress in allInvoiceAddresses"
                :key="invoiceAddress.id"
                :value="invoiceAddress.id"
              >
                {{ invoiceAddress.streetNo }}, {{ invoiceAddress.companyName }}
              </option>
            </b-select>
          </b-field>
          <b-field
            label="Szállítási cím"
            message="A vásárló szállítási címe"
            horizontal
          >
            <b-select
              v-model="customer.deliveryAddresses.id"
              required
              @blur="cons1"
            >
              <option
                v-for="deliveryAddress in allDeliveryAddresses"
                :key="deliveryAddress.id"
                :value="deliveryAddress.id"
              >
                {{ deliveryAddress.streetNo }}
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

  components: {
    HeroBar,
    CardComponent
  },
  data () {
    return {
      allDeliveryAddresses: [],
      allInvoiceAddresses: [],
      isLoading: false,
      collection: 'customers',
      searchParams: { id: `${this.$route.params.id}` },
      customer: this.getClearFormObject()
    }
  },
  head () {
    return {
      title: 'Vásárló szerkesztése'
    }
  },
  computed: {

  },
  async mounted () {
    this.allDeliveryAddresses = await this.$strapi.find('delivery-addresses')
    this.allInvoiceAddresses = await this.$strapi.find('incoice-addresses')
    this.customer = await this.getData()
  },
  methods: {
    getClearFormObject () {
      return {
        firstName: '',
        lastName: '',
        companyName: '',
        phoneNumber: '',
        SumOfPurchase: 0,
        deliveryAddresses: {
          id: null
        },
        invoiceAddresses: {
          id: null
        },
        email: ''

      }
    },
    cons1 () {
      console.log(this.customer.deliveryAddresses)
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

        await this.$strapi.update(this.collection, parseInt(this.$route.params.id), this.customer)

        this.isLoading = false
        // alternative success message
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
