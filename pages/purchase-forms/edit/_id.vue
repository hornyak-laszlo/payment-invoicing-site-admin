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
      <ValidationObserver v-slot="{ invalid }">
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
                type="textarea"
                required
              />
            </b-field>
            <b-field label="Űrlap promociós tartalom">
              <b-input type="textarea" />
            </b-field>
            <b-field label="Feliratkozás a hírlevélre">
              <b-checkbox v-model="purchaseForm.newsletterCheckbox">
                Legyen feliratkozás a hírlevélre lehetőség
              </b-checkbox>
            </b-field>
          </card-component>

          <card-component>
            <b-field grouped>
              <b-field
                label="Űrlaphoz tartozó termékek listája"
                expanded
              />
              <b-field expanded>
                <b-button
                  outlined
                  type="is-primary"
                  label="Termék hozzáadása"
                  :loading="isLoading"
                  expanded
                  @click="addNewProduct()"
                />
              </b-field>
            </b-field>

            <b-field
              v-if="addProduct"
              label="Termék típusa"
            >
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
            </b-field>
            <b-field
              v-if="productType === 'subscription' && addProduct"
              class="add-product-no-label"
              horizontal
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
              horizontal
              class="add-product-no-label"
            >
              <b-field expanded>
                <b-select
                  v-model="selectedProductID"
                  required
                  expanded
                >
                  <option
                    v-for="product in oneTimeProducts"
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
                  expanded
                  :loading="isLoading"
                  @click="addNewOneProduct()"
                />
              </b-field>
              <b-field expanded>
                <b-button
                  style="border-radius: 5px"
                  label="Mégse"
                  :loading="isLoading"
                  expanded
                  @click="addProduct = false"
                />
              </b-field>
            </b-field>

            <b-table
              :striped="true"
              :hoverable="true"
              default-sort="id"
              :data="purchaseForm.products"
              :mobile-cards="true"
            >
              <template slot-scope="props">
                <b-table-column
                  label="Termék"
                  field="name"
                  sortable
                >
                  {{ props.row.name }}
                </b-table-column>
                <b-table-column
                  label="Ár"
                  field="grossPrice"
                  sortable
                >
                  {{ props.row.grossPrice }}
                </b-table-column>

                <b-table-column
                  custom-key="actions"
                  class="is-actions-cell"
                >
                  <div class="buttons is-right">
                    <nuxt-link
                      :to="`/products/edit/${props.row.id}`"
                      class="button is-small"
                    >
                      <b-icon
                        pack="fas"
                        icon="eye"
                        size="is-small"
                        type="is-primary"
                      />
                    </nuxt-link>
                    <b-button
                      outlined
                      size="is-small"
                      type="is-danger"
                      icon-pack="fas"
                      icon-left="trash-alt"
                      @click="deleteProduct(props.row.id)"
                    />
                  </div>
                </b-table-column>
              </template>
            </b-table>

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
          </card-component>
        </form>
      </ValidationObserver>
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
      selectedProductID: 0,
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
        company: {},
        newsletterCheckbox: null
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
      if (this.purchaseForm.products.find(product => product.type === 'subscription') !== undefined) {
        this.purchaseForm.products = []
        this.purchaseForm.products.push(this.allProducts.find(product => product.id === this.selectedProductID))
        this.addProduct = false
        this.$buefy.snackbar.open({
          message: 'Termék sikeresen hozzáadva',
          queue: false
        })
        this.plusProductId = 0
        this.selectedProductID = 0
      } else if (this.purchaseForm.products.find(product => product.id === this.selectedProductID) !== undefined) {
        this.$buefy.snackbar.open({
          message: 'Ez a termék már szerepel az űrlapon',
          type: 'is-danger',
          queue: false
        })
      } else {
        this.purchaseForm.products.push(this.allProducts.find(product => product.id === this.selectedProductID))
        this.addProduct = false
        this.$buefy.snackbar.open({
          message: 'Termék sikeresen hozzáadva',
          queue: false
        })
        this.plusProductId = 0
        this.selectedProductID = 0
      }
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
