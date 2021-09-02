<template>
  <div>
    <hero-bar>
      <b-icon
        pack="fas"
        icon="tags"
        size="is-small"
        style="margin: 1rem"
      />
      Termék Szerkesztése, ID: {{ $route.params.id }}
      <nuxt-link
        slot="right"
        to="/products"
        class="button is-primary"
      >
        Vissza a termékekhez
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component>
        <form @submit.prevent="submit">
          <b-field
            label="Név"
            message="A termék neve"
          >
            <b-input
              v-model="product.name"
              required
            />
          </b-field>
          <b-field
            label="Leírás"
            message="A termék leírása"
          >
            <b-input
              v-model="product.description"
              type="textarea"
              required
            />
          </b-field>
          <b-field
            label="Számlázási név"
            message="A termék számlázási neve"
          >
            <b-input
              v-model="product.nameInvoice"
              required
            />
          </b-field>
          <b-field grouped>
            <b-field
              label="Bruttó ár"
              message="A termék bruttó ára"
              expanded
            >
              <b-input
                v-model="product.grossPrice"
                required
              />
            </b-field>
            <b-field
              label="Áfa tartalom"
              message="A termék áfa tartalma"
              expanded
            >
              <b-select
                v-model="product.taxRate.id"
                required
                expanded
              >
                <option
                  v-for="taxRate in taxRates"
                  :key="taxRate.id"
                  :value="taxRate.id"
                >
                  {{ taxRate.name }}
                </option>
              </b-select>
            </b-field>
          </b-field>

          <b-field
            label="Egyszeri vagy előfizetés"
            message="A terméknek egyszeri ára van, vagy előfizetéses?"
          >
            <b-select
              v-model="product.type"
              required
              expanded
            >
              <option :value="'one_time'">
                Egyszeri
              </option>
              <option :value="'subscription'">
                Előfizetéses
              </option>
            </b-select>
          </b-field>
          <b-field
            v-if="subscription"
            label="Előfizetés gyakorisága"
            message="Milyen gyakran kell fizetni az előfizetést"
          >
            <b-select
              v-model="product.period"
              :placeholder="product.period"
              required
              expanded
            >
              <option :value="'weekly'">
                Heti
              </option>
              <option :value="'monthly'">
                Havi
              </option>
              <option :value="'yearly'">
                Éves
              </option>
            </b-select>
          </b-field>

          <b-field
            label="Szállítható-e"
            message="A termék szállítható?"
          >
            <b-select
              v-model="product.isShippable"
              required
              expanded
            >
              <option :value="false">
                Nem
              </option>
              <option :value="true">
                Igen
              </option>
            </b-select>
          </b-field>

          <hr>
          >
          <b-button
            type="is-primary"
            expanded
            :loading="isLoading"
            native-type="submit"
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
      taxRates: [],
      isLoading: false,
      collection: 'products',
      product: this.getClearFormObject()
    }
  },
  head () {
    return {
      title: 'Termék szerkesztése'
    }
  },
  computed: {
    subscription () {
      return this.product.type === 'subscription'
    }
  },
  async mounted () {
    this.taxRates = await this.$strapi.find('tax-sets')
    this.product = await this.getData()
    /* console.log(this.product.taxRate.name) */
  },
  methods: {
    getClearFormObject () {
      return {
        name: '',
        description: '',
        nameInvoice: '',
        grossPrice: '',
        isShippable: false,
        type: '',
        period: '',
        taxRate: {
          id: null
        }
      }
    },
    async getData () {
      if (this.$route.params.id) {
        try {
          const res = await this.$strapi.findOne('products', this.$route.params.id)
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
        if (this.product.type === 'one_time') {
          delete this.product.period
        }

        await this.$strapi.update('products', parseInt(this.$route.params.id), this.product)

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
        this.$router.push('/products')
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
