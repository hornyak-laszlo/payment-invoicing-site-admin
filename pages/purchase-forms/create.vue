<template>
  <div>
    <hero-bar>
      Vásárlás űrlap hozzáadása
      <nuxt-link
        slot="right"
        to="/forms"
        class="button"
      >
        Vissza az űrlapokhoz
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        title="Új űrlap"
        icon="columns"
        class="tile is-child"
      >
        <form @submit.prevent="submit">
          <b-field
            label="Név"
            message="Űrlap neve"
            horizontal
          >
            <b-input
              v-model="purchaseForm.name"
              required
            />
          </b-field>
          <b-field
            label="Link"
            message="Link ahol elérhető lesz az űrlap"
            horizontal
          >
            <b-input
              v-model="purchaseForm.link"
              required
            />
          </b-field>
          <b-field
            label="Sikeres link"
            message="Sikeres kapcsolatfevétel linkje"
            horizontal
          >
            <b-input
              v-model="purchaseForm.successLink"
              required
            />
          </b-field>

          <b-field
            label="Sikeres szöveg"
            message="Sikeres kapcsolatfevétel szövege"
            horizontal
          >
            <b-input
              v-model="purchaseForm.successText"
              required
              type="textarea"
            />
          </b-field>
          <b-field
            v-if="addProduct"
            label="Termék típusa"
            message="Milyen típusú terméket lehet itt rendelni"
            horizontal
          >
            <b-select
              v-model="productType"
              required
            >
              <option value="subscription">
                Előfizetéses
              </option>
              <option value="one_time">
                Egyszeri vásárlás
              </option>
            </b-select>
          </b-field>
          <b-field
            v-if="productType === 'subscription' && addProduct"
            horizontal
          >
            <b-select
              v-model="plusProductId"
              required
            >
              <option
                v-for="product in subscriptionProducts"
                :key="product.id"
                :value="product.id"
              >
                {{ product.name }}
              </option>
            </b-select>
            <b-button
              style="border-radius: 5px"
              type="is-primary"
              label="Hozzáadás"
              size="is-small"
              :loading="isLoading"
              @click="addNewProduct()"
            />
          </b-field>
          <hr>
          <b-field horizontal>
            <b-button
              type="is-primary"
              :loading="isLoading"
              native-type="submit"
              expanded
            >
              Létrehozás
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
  name: 'FormCreate',
  components: {
    CardComponent,
    HeroBar
  },
  data () {
    return {
      isLoading: false,
      purchaseForm: this.getClearFormObject(),
      allProducts: [],
      productType: '',
      plusProductId: 0,
      addProduct: true
    }
  },
  head () {
    return {
      title: 'Űrlap hozzáadása'
    }
  },
  computed: {
    subscriptionProducts () {
      return this.allProducts.filter(product => product.type === 'subscription')
    },
    oneTimeProducts () {
      return this.allProducts.filter(product => product.type === 'one_time')
    }
  },
  async mounted () {
    this.allProducts = await this.$strapi.find('products')
    console.log(this.allProducts)
  },

  methods: {
    getClearFormObject () {
      return {
        type: 'purchase-forms',
        name: '',
        link: '',
        successLink: '',
        successText: '',
        products: [],
        company: ''
      }
    },

    addNewProduct () {
      const plusProduct = this.allProducts.find(product => product.id === this.plusProductId)
      this.purchaseForm.products.push(plusProduct)
      this.addProduct = false
      this.$buefy.snackbar.open({
        message: 'Termék sikeresen hozzáadva',
        queue: false
      })
    },

    async submit () {
      try {
        this.isLoading = true
        if (this.purchaseForm.type === 'purchase-forms') {
          await this.$strapi.create('purchase-forms', this.purchaseForm)
        }

        this.purchaseForm = this.getClearFormObject()
        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Létrehozás sikeres',
          type: 'is-white has-text-white has-background-primary',
          queue: false
        })
        this.$router.push('/forms')
      } catch (err) {
        this.isLoading = false
        this.$buefy.snackbar.open({
          message: `Error: ${err.message}`,
          type: 'is-danger',
          queue: false
        })
      }
    }
  }
}
</script>
