<template>
  <div>
    <hero-bar>
      Termék Szerkesztése
      <nuxt-link
        slot="right"
        to="/products"
        class="button"
      >
        Vissza a termékekhez
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="tile is-child"
        :title="`Termék - ID: ${$route.params.id}`"
        icon="tags"
      >
        <form @submit.prevent="submit">
          <b-field
            label="Név"
            message="A termék neve"
            horizontal
          >
            <b-input
              v-model="product.name"
              required
            />
          </b-field>
          <b-field
            label="Leírás"
            message="A termék leírása"
            horizontal
          >
            <b-input
              v-model="product.description"
              required
            />
          </b-field>
          <b-field
            label="Bruttó ár"
            message="A termék bruttó ára"
            horizontal
          >
            <b-input
              v-model="product.grossPrice"
              required
            />
          </b-field>
          <b-field
            label="Számlázási név"
            message="A termék számlázási neve"
            horizontal
          >
            <b-input
              v-model="product.nameInvoice"
              required
            />
          </b-field>
          <b-field
            label="Szállítható-e"
            message="A termék szállítható?"
            horizontal
          >
            <b-select
              v-model="product.isShippable"
              required
            >
              <option :value="false">
                Nem
              </option>
              <option :value="true">
                Igen
              </option>
            </b-select>
          </b-field>
          <b-field
            label="Egyszeri vagy előfizetés"
            message="A terméknek egyszeri ára van, vagy előfizetéses?"
            horizontal
          >
            <b-select
              v-model="product.type"
              required
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
            horizontal
          >
            <b-select
              v-model="product.period"
              required
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
          <hr>
          <b-field horizontal>
            <b-button
              type="is-primary"
              :loading="isLoading"
              native-type="submit"
            >
              Mentés
            </b-button>
            <nuxt-link
              to="/products"
              class="button is-secondary"
            >
              Vissza
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
/* import DataTable from '@/components/DataTable' */
export default {
  components: {
    HeroBar,
    /* DataTable, */
    CardComponent
  },
  data () {
    return {
      isLoading: false,
      collection: 'products',
      searchParams: { id: `${this.$route.params.id}` },
      product: {
        name: '',
        description: '',
        nameInvoice: '',
        grossPrice: '',
        isShippable: false,
        type: '',
        period: ''
      }
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
    this.product = await this.getData()
  },
  methods: {
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
