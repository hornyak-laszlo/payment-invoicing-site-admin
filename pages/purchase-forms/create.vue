<template>
  <div>
    <hero-bar>
      <b-icon
        pack="fas"
        icon="columns"
        size="is-small"
        style="margin: 1rem"
      />
      Vásárlás űrlap hozzáadása
      <nuxt-link
        slot="right"
        to="/forms"
        class="button is-primary"
      >
        Vissza az űrlapokhoz
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <form @submit.prevent="submit">
        <card-component>
          <b-field
            label="Név"
            message="Űrlap neve"
          >
            <b-input
              v-model="purchaseForm.name"
              required
            />
          </b-field>
          <b-field grouped>
            <b-field
              label="Link"
              message="Link ahol elérhető lesz az űrlap"
              expanded
            >
              <b-input
                v-model="purchaseForm.link"
                required
              />
            </b-field>
            <b-field
              label="Sikeres link"
              message="Sikeres kapcsolatfevétel linkje"
              expanded
            >
              <b-input
                v-model="purchaseForm.successLink"
                required
              />
            </b-field>
          </b-field>
          <b-field
            label="Sikeres szöveg"
            message="Sikeres kapcsolatfevétel szövege"
          >
            <b-input
              v-model="purchaseForm.successText"
              required
              type="textarea"
            />
          </b-field>

          <b-field label="Feliratkozás a hírlevélre">
            <b-checkbox>
              Legyen feliratkozás a hírlevélre lehetőség
            </b-checkbox>
          </b-field>
        </card-component>

        <card-component>
          <b-field grouped>
            <b-field
              v-if="!addProduct"
              label="Űrlaphoz tartozó termékek listája"
              expanded
            />
            <b-field
              v-if="!addProduct"
              expanded
            >
              <b-button
                outlined
                style="border-radius: 5px"
                type="is-primary"
                label="Termékek szerkesztése"
                expanded
                @click="addProduct = true"
              />
            </b-field>
          </b-field>
          <b-collapse
            v-for="(product, index) of purchaseForm.products"
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
                  Termék ID: {{ product.id }}, {{ product.name }}
                </p>
                <a class="card-header-icon">
                  <b-icon :icon="props.open ? 'menu-up' : 'menu-down'" />
                </a>
              </div>
            </template>
            <div class="card-content">
              <div class="content">
                <p>
                  <strong>Termék ára:</strong>
                  {{ product.grossPrice }}
                </p>
              </div>
              <div class="content">
                <p>
                  <strong>Termék leírása:</strong>
                  {{ product.description }}
                </p>
              </div>
            </div>
            <footer class="card-footer">
              <nuxt-link
                :to="`/products/edit/${product.id}`"
                style="width: 100%"
              >
                <b-button
                  expanded
                  outlined
                  type="is-primary"
                  style="border-top-left-radius: 0; border-top-right-radius: 0; border-color: whitesmoke;"
                  label="Termék szerkesztése"
                  icon-pack="fas"
                  icon-left="tag"
                  class="card-footer-item"
                >
                  Termék szerkesztése
                </b-button>
              </nuxt-link>
            </footer>
          </b-collapse>
          <b-field
            v-if="addProduct"
            label="Termék típusa"
          />
          <b-field v-if="addProduct">
            <b-radio
              v-model="productType"
              name="name"
              native-value="subscription"
            >
              Előfizetéses
            </b-radio>
            <b-radio
              v-model="productType"
              name="name"
              native-value="one_time"
            >
              Egyszeri vásárlás
            </b-radio>
          </b-field>
          <b-field
            v-if="productType === 'subscription' && addProduct"
            horizontal
          >
            <b-select
              v-model="plusProductId"
              required
              expanded
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
              expanded
              @click="addNewSubProduct()"
            />
            <b-button
              style="border-radius: 5px"
              label="Mégse"
              size="is-small"
              :loading="isLoading"
              expanded
              @click="addProduct = false"
            />
          </b-field>
          <b-field
            v-if="productType === 'one_time' && addProduct"
            horizontal
          >
            <b-dropdown
              v-model="selectedProductIDs"
              multiple
              expanded
            >
              <template #trigger>
                <b-button icon-right="menu-down">
                  {{ selectedProductIDs.length }} termék kiválasztva
                </b-button>
              </template>
              <b-dropdown-item
                v-for="product in oneTimeProducts"
                :key="product.id"
                :value="product.id"
              >
                <span>
                  {{ product.name }}
                </span>
              </b-dropdown-item>
            </b-dropdown>
            <b-button
              style="border-radius: 5px"
              type="is-primary"
              label="Hozzáadás"
              :loading="isLoading"
              expanded
              @click="addNewOneProduct()"
            />
            <b-button
              style="border-radius: 5px"
              label="Mégse"
              :loading="isLoading"
              expanded
              @click="addProduct = false"
            />
          </b-field>
          <hr>
          <b-field>
            <b-button
              type="is-primary"
              :loading="isLoading"
              native-type="submit"
              expanded
            >
              Létrehozás
            </b-button>
          </b-field>
        </card-component>
      </form>
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
      selectedProductIDs: [],
      productType: '',
      plusProductId: 0,
      plusProduct: [],
      addProduct: true,
      subProductAdded: false,
      oneTimeProductAdded: false
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

    addNewSubProduct () {
      this.plusProduct = []
      this.plusProduct.push(this.allProducts.find(product => product.id === this.plusProductId))
      this.purchaseForm.products = this.plusProduct
      this.addProduct = false
      this.subProductAdded = true
      console.log(this.purchaseForm.products)
      this.$buefy.snackbar.open({
        message: 'Termék sikeresen hozzáadva',
        queue: false
      })
    },

    addNewOneProduct () {
      this.plusProduct = []
      this.plusProduct = this.allProducts.filter(product => this.selectedProductIDs.includes(product.id))
      this.purchaseForm.products = this.plusProduct
      this.addProduct = false
      this.oneTimeProductAdded = true
      console.log(this.purchaseForm.products)
      this.$buefy.snackbar.open({
        message: 'Termék(ek) sikeresen hozzáadva',
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
