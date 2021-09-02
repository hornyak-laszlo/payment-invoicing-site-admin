<template>
  <div>
    <hero-bar>
      <b-icon
        pack="fas"
        icon="columns"
        size="is-small"
        style="margin: 1rem"
      />
      Űrlap szerkesztése, ID: {{ $route.params.id }}
      <nuxt-link
        slot="right"
        to="/forms"
        class="button is-primary"
      >
        Vissza az űrlapokhoz
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component class="tile is-child">
        <ValidationObserver v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <b-field
              label="Név"
              message="Űrlap neve"
            >
              <b-input
                v-model="purchaseForm.name"
                required
              />
            </b-field>
            <b-field
              label="Link"
              message="Link ahol elérhető lesz az űrlap"
            >
              <b-input
                v-model="purchaseForm.link"
                required
              />
            </b-field>
            <b-field
              label="Sikeres link"
              message="Sikeres kapcsolatfevétel linkje"
            >
              <b-input
                v-model="purchaseForm.successLink"
                required
              />
            </b-field>
            <b-field
              label="Sikeres szöveg"
              message="Sikeres kapcsolatfevétel szövege"
            >
              <b-input
                v-model="purchaseForm.successText"
                type="textarea"
                required
              />
            </b-field>
            <b-field label="Űrlaphoz tartozó termékek">
              <p>Az űrlaphoz tartozó termékek listája:</p>
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
                    label="Szerkesztés"
                    icon-pack="fas"
                    icon-left="tag"
                    class="card-footer-item"
                  >
                    Termék szerkesztése
                  </b-button>
                </nuxt-link>
                <b-button
                  expanded
                  outlined
                  type="is-danger"
                  style="border-top-left-radius: 0; border-top-right-radius: 0; border-color: whitesmoke;"
                  label="Törlés"
                  icon-pack="fas"
                  icon-left="trash-alt"
                  class="card-footer-item"
                  @click="deleteProduct(product.id)"
                >
                  Törlés
                </b-button>
              </footer>
            </b-collapse>
            <b-field horizontal>
              <b-button
                outlined
                type="is-primary"
                label="Űrlap termékek szerkesztése"
                :loading="isLoading"
                @click="addNewProduct()"
              />
            </b-field>
            <b-field
              v-if="addProduct"
              label="Termék típusa"
              message="Milyen típusú terméket lehet itt rendelni"
            >
              <b-select
                v-model="productType"
                required
                expanded
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
              grouped
            >
              <b-field expanded>
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
              </b-field>
              <b-field expanded>
                <b-button
                  style="border-radius: 5px"
                  type="is-primary"
                  label="Hozzáadás"
                  size="is-small"
                  :loading="isLoading"
                  expanded
                  @click="addNewSubProduct()"
                />
              </b-field>
              <b-field expanded>
                <b-button
                  style="border-radius: 5px"
                  label="Mégse"
                  size="is-small"
                  :loading="isLoading"
                  expanded
                  @click="addProduct = false"
                />
              </b-field>
            </b-field>

            <b-field
              v-if="productType === 'one_time' && addProduct"
              grouped
            >
              <b-field expanded>
                <b-dropdown
                  v-model="selectedProductIDs"
                  multiple
                >
                  <template #trigger>
                    <b-button icon-right="menu-down">
                      {{ selectedProductIDs.length }} kiválasztva
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
              </b-field>
              <b-field expanded>
                <b-button
                  style="border-radius: 5px"
                  type="is-primary"
                  label="Hozzáadás"
                  size="is-small"
                  :loading="isLoading"
                  expanded
                  @click="addNewOneProduct()"
                />
              </b-field>
              <b-field expanded>
                <b-button
                  style="border-radius: 5px"
                  label="Mégse"
                  size="is-small"
                  :loading="isLoading"
                  expanded
                  @click="addProduct = false"
                />
              </b-field>
            </b-field>

            <hr>
            <b-field>
              <b-button
                type="is-primary"
                :loading="isLoading"
                native-type="submit"
                expanded
                :disabled="invalid"
              >
                Mentés
              </b-button>
            </b-field>
          </form>
        </ValidationObserver>
      </card-component>
    </section>
  </div>
</template>

<script>
import HeroBar from '@/components/common/HeroBar'
import CardComponent from '@/components/common/CardComponent'

export default {
  name: 'PurchaseFormEdit',
  components: {
    CardComponent,
    HeroBar
  },
  data () {
    return {
      isLoading: false,
      purchaseForm: this.getClearFormObject(),
      allProducts: [],
      addProduct: false,
      productType: '',
      plusProductId: 0,
      selectedProductIDs: [],
      plusProduct: []
    }
  },
  head () {
    return {
      title: 'Vásárlás űrlap szerkesztése'
    }
  },
  computed: {
    subscriptionProducts () {
      return this.allProducts.filter(product => product.type === 'subscription')
    },
    oneTimeProducts () {
      return this.allProducts.filter(product => product.type === 'one_time')
    }
    /* selectedProductIDs: {
      get () {
        return this.purchaseForm.products.map(product => product.id)
      },
      set (value) {
        this.selectedProductIDs = value
      }
    } */

  },
  async mounted () {
    this.purchaseForm = await this.getData()
    this.allProducts = await this.$strapi.find('products')
    if (this.purchaseForm.products.length > 0) {
      this.selectedProductIDs = this.purchaseForm.products.map(product => product.id)
    }
  },
  methods: {
    getClearFormObject () {
      return {
        id: '',
        name: '',
        link: '',
        successLink: '',
        successText: '',
        products: [],
        company: {}
      }
    },
    deleteProduct (id) {
      this.$buefy.dialog.confirm({
        title: 'Termék törlése',
        message: 'Biztos, hogy el akarod távolítani ezt a terméket?',
        confirmText: 'Termék törlése',
        cancelText: 'Mégse',
        type: 'is-danger',
        hasIcon: true,
        iconPack: 'fas',
        icon: 'trash-alt',
        onConfirm: () => {
          this.purchaseForm.products = this.purchaseForm.products.filter(product => product.id !== id)
          console.log(this.purchaseForm.products)
          this.$buefy.snackbar.open({
            message: 'Sikeresen törölve',
            queue: false
          })
        }
      })
    },
    addNewProduct () {
      if (this.purchaseForm.products.some(product => product.type === 'subscription')) {
        this.$buefy.snackbar.open({
          message: 'Már egy előfizetéses termék szerepel az űrlapon',
          type: 'is-danger',
          queue: false
        })
      } else {
        this.addProduct = true
      }
    },
    async getData () {
      if (this.$route.params.id) {
        try {
          const res = await this.$strapi.findOne('purchase-forms', this.$route.params.id)
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

        await this.$strapi.update('purchase-forms', this.purchaseForm.id, this.purchaseForm)

        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Sikeresen mentve',
          queue: false
        })
        this.$router.push('/forms')
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
