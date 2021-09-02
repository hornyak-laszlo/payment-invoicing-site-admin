<template>
  <div>
    <hero-bar>
      <b-icon
        pack="fas"
        icon="user-tag"
        size="is-small"
        style="margin: 1rem"
      />
      Vásárló megtekintése, ID: {{ $route.params.id }}
      <nuxt-link
        slot="right"
        to="/customers"
        class="button is-primary"
      >
        Vissza a vásárlókhoz
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component>
        <form @submit.prevent="submit">
          <b-field grouped>
            <b-field
              label="Vezetéknév"
              message="A vásárló vezetékneve"
              expanded
            >
              <b-input
                v-model="lastPurchase.lastName"
                readonly="true"
                required
              />
            </b-field>
            <b-field
              label="Keresztnév"
              message="A vásárló keresztneve"
              expanded
            >
              <b-input
                v-model="lastPurchase.firstName"
                readonly="true"
                required
              />
            </b-field>
          </b-field>
          <b-field
            label="Cégnév"
            message="A vásárló cégneve"
          >
            <b-input
              v-model="lastPurchase.companyName"
              readonly="true"
              required
            />
          </b-field>

          <b-field
            label="Telefonszám"
            message="A vásárló telefonszáma"
          >
            <b-input
              v-model="lastPurchase.phoneNumber"
              readonly="true"
              type="number"
              required
            />
          </b-field>
          <b-field
            label="Email cím"
            message="A vásárló email címe"
          >
            <b-input
              v-model="email"
              readonly="true"
              type="email"
              required
            />
          </b-field>

          <b-field label="Legutóbbi számlázási cím" />
          <b-field grouped>
            <b-field
              label="Ország"
              message="A legutóbbi számlán szereplő ország"
            >
              <b-input
                v-model="lastPurchase.invoiceCountry"
                readonly="true"
                placeholder="Ország"
                required
              />
            </b-field>
            <b-field
              label="Irányítószám"
              message="A legutóbbi számlán szereplő irányítószám"
            >
              <b-input
                v-model="lastPurchase.invoiceZip"
                readonly="true"
                placeholder="Irányítószám"
                required
                type="number"
              />
            </b-field>

            <b-field
              label="Város"
              message="A legutóbbi számlán szereplő város"
            >
              <b-input
                v-model="lastPurchase.invoiceCity"
                readonly="true"
                placeholder="Város"
                required
              />
            </b-field>

            <b-field
              label="Utca és házszám"
              message="A legutóbbi számlán szereplő utca és házszám"
            >
              <b-input
                v-model="lastPurchase.invoiceStreetNo"
                readonly="true"
                placeholder="Utca és házszám"
                required
              />
            </b-field>
          </b-field>

          <b-field label="Legutóbbi szállítási cím" />
          <b-field grouped>
            <b-field
              label="Ország"
              message="A legutóbbi számlán szereplő ország"
            >
              <b-input
                v-model="lastPurchase.deliveryCountry"
                readonly="true"
                placeholder="Ország"
                required
              />
            </b-field>
            <b-field
              label="Irányítószám"
              message="A legutóbbi számlán szereplő irányítószám"
            >
              <b-input
                v-model="lastPurchase.deliveryZip"
                readonly="true"
                placeholder="Irányítószám"
                required
                type="number"
              />
            </b-field>

            <b-field
              label="Város"
              message="A legutóbbi számlán szereplő város"
            >
              <b-input
                v-model="lastPurchase.deliveryCity"
                readonly="true"
                placeholder="Város"
                required
              />
            </b-field>

            <b-field
              label="Utca és házszám"
              message="A legutóbbi számlán szereplő utca és házszám"
            >
              <b-input
                v-model="lastPurchase.deliveryStreetNo"
                readonly="true"
                placeholder="Utca és házszám"
                required
              />
            </b-field>
          </b-field>

          <b-field
            label="Rendelések"
            horizontal
          >
            <b-table
              :striped="true"
              :hoverable="true"
              default-sort="id"
              :data="purchases"
            >
              <template slot-scope="props">
                <b-table-column
                  label="Id"
                  field="id"
                  sortable
                >
                  {{ props.row.id }}
                </b-table-column>
                <b-table-column
                  label="Státusza"
                  field="status"
                  sortable
                >
                  {{ props.row.status }}
                </b-table-column>
                <b-table-column
                  label="Rendelés összege"
                  field="sumOfPurchase"
                  sortable
                >
                  {{ props.row.sumOfPurchase }}
                </b-table-column>
                <b-table-column
                  label="Létrehozva"
                  field="created_at"
                  sortable
                >
                  {{ props.row.created_at }}
                </b-table-column>
                <b-table-column
                  custom-key="actions"
                  class="is-actions-cell"
                >
                  <div class="buttons is-right">
                    <nuxt-link
                      :to="`/purchases/edit/${props.row.id}`"
                      class="button is-small is-primary"
                    >
                      <b-icon
                        pack="fas"
                        icon="eye"
                        size="is-small"
                      />
                    </nuxt-link>
                  </div>
                </b-table-column>
              </template>

              <section
                slot="empty"
                class="section"
              >
                <div class="content has-text-grey has-text-centered">
                  <template v-if="isLoading">
                    <p>
                      <b-icon
                        pack="fas"
                        icon="ellipsis-h"
                        size="is-large"
                      />
                    </p>
                    <p>Adatok betöltése...</p>
                  </template>
                  <template v-else>
                    <p>
                      <b-icon
                        pack="fas"
                        icon="frown"
                        size="is-large"
                      />
                    </p>
                    <p>Nem található adat&hellip;</p>
                  </template>
                </div>
              </section>
            </b-table>
          </b-field>
        </form>
      </card-component>
    </section>
  </div>
</template>

<script>

import HeroBar from '@/components/common/HeroBar'
import CardComponent from '@/components/common/CardComponent'
import { convertToHungarianTime } from '@/utils/dateHelpers'

export default {

  components: {
    HeroBar,
    CardComponent
  },
  data () {
    return {
      isLoading: false,
      statuses: {
        payed: 'Fizetve',
        ordered: 'Megrendelve',
        shipped: 'Kiszállítva'
      },
      email: '',
      purchases: [],
      lastPurchase: {
        lastName: '',
        firstName: '',
        companyName: '',
        phoneNumber: '',
        invoiceCountry: '',
        invoiceZip: '',
        invoiceCity: '',
        invoiceStreetNo: '',
        deliveryCountry: '',
        deliveryZip: '',
        deliveryCity: '',
        deliveryStreetNo: ''
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
      const customer = await this.$strapi.findOne('customers', this.$route.params.id)
      customer.purchases.forEach((p) => {
        p.status = this.statuses[p.status] || 'Nincs státusza'
        p.created_at = convertToHungarianTime(p.created_at)
      })
      this.email = customer.email
      this.purchases = customer.purchases
      if (customer.purchases.length) {
        this.lastPurchase = customer.purchases[customer.purchases.length - 1]
      }
    } catch (err) {
      this.$buefy.toast.open({
        message: `Error: ${err.message}`,
        type: 'is-danger',
        queue: false
      })
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
