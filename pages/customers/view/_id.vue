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
            <b-input
              v-model="customer.purchases[0].lastName"
              readonly="true"
              required
            />
          </b-field>
          <b-field
            label="Keresztnév"
            message="A vásárló keresztneve"
            horizontal
          >
            <b-input
              v-model="customer.purchases[0].firstName"
              readonly="true"
              required
            />
          </b-field>
          <b-field
            label="Cégnév"
            message="A vásárló cégneve"
            horizontal
          >
            <b-input
              v-model="customer.purchases[0].companyName"
              readonly="true"
              required
            />
          </b-field>

          <b-field
            label="Telefonszám"
            message="A vásárló telefonszáma"
            horizontal
          >
            <b-input
              v-model="customer.purchases[0].phoneNumber"
              readonly="true"
              type="number"
              required
            />
          </b-field>
          <b-field
            label="Email cím"
            message="A vásárló email címe"
            horizontal
          >
            <b-input
              v-model="customer.email"
              readonly="true"
              type="email"
              required
            />
          </b-field>

          <b-field
            label="Legutóbbi számlázási cím"
            message="A legutóbbi számlán szereplő cím"
            horizontal
          >
            <ValidationProvider
              v-slot="{ errors }"
              name="Ország"
              rules="required"
            >
              <b-input
                v-model="customer.purchases[0].invoiceCountry"
                readonly="true"
                placeholder="Ország"
                required
              />
              <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              name="Irányítószám"
              rules="required"
            >
              <b-input
                v-model="customer.purchases[0].invoiceZip"
                readonly="true"
                placeholder="Irányítószám"
                required
                type="number"
              />
              <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              name="Város"
              rules="required"
            >
              <b-input
                v-model="customer.purchases[0].invoiceCity"
                readonly="true"
                placeholder="Város"
                required
              />
              <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              name="Utca és házszám"
              rules="required"
            >
              <b-input
                v-model="customer.purchases[0].invoiceStreetNo"
                readonly="true"
                placeholder="Utca és házszám"
                required
              />
              <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-field>

          <b-field
            label="Legutóbbi szállítási cím"
            message="Ahova a terméket legutóbb szállítani kellett"
            horizontal
          >
            <b-input
              v-model="customer.purchases[0].deliveryCountry"
              placeholder="Ország"
              required
              readonly="true"
            />
            <b-input
              v-model="customer.purchases[0].deliveryZip"
              placeholder="Irányítószám"
              required
              readonly="true"
            />
            <b-input
              v-model="customer.purchases[0].deliveryCity"
              placeholder="Város"
              required
              readonly="true"
            />
            <b-input
              v-model="customer.purchases[0].deliveryStreetNo"
              placeholder="Utca és házszám"
              required
              readonly="true"
            />
          </b-field>

          <b-collapse
            v-for="(purchase, index) of customer.purchases"
            :key="index"
            style="max-width: 80%; margin-left: 19%;"
            class="card"
            animation="slide"
          >
            <template #trigger="props">
              <div
                class="card-header"
                role="button"
              >
                <p class="card-header-title">
                  Rendelés {{ purchase.created_at }}-kor
                </p>
                <a class="card-header-icon">
                  <b-icon :icon="props.open ? 'menu-up' : 'menu-down'" />
                </a>
              </div>
            </template>
            <div class="card-content">
              <div class="content">
                <p>
                  <strong>Rendelés összege:</strong>
                  {{ purchase.sumOfPurchase }}
                </p>
              </div>
              <div class="content">
                <p>
                  <strong>Rendelés státusza:</strong>
                  <span v-if="purchase.status === 'payed'">Fizetve</span>
                  <span v-else-if="purchase.status === 'ordered'">Megrendelve</span>
                  <span v-else-if="purchase.status === 'shipped'">Kiszállítva</span>
                  <span v-else>Nincs státusza</span>
                </p>
              </div>
            </div>
            <footer class="card-footer">
              <nuxt-link
                :to="`/purchases/edit/${purchase.id}`"
                style="width: 100%"
              >
                <b-button
                  expanded
                  outlined
                  type="is-primary"
                  style="border-top-left-radius: 0; border-top-right-radius: 0; border-color: whitesmoke;"
                  label="Vásárlás szerkesztése"
                  icon-pack="fas"
                  icon-left="list"
                  class="card-footer-item"
                >
                  Vásárlás szerkesztése
                </b-button>
              </nuxt-link>
            </footer>
          </b-collapse>

          <hr>
          <b-field horizontal>
            <nuxt-link
              to="/customers"
              class="button is-primary"
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
