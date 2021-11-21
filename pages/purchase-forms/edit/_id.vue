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
        <form
          class="flex-container"
          @submit.prevent="submit"
        >
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
              label="Köszönő link vagy szöveg"
              message="Köszönet az űrlap kitöltése után"
            />
            <b-field>
              <b-radio
                v-model="thanksType"
                native-value="link"
                size="is-medium"
                style="font-size: 1rem"
              >
                Linket adok meg
              </b-radio>
              <b-radio
                v-model="thanksType"
                native-value="text"
                size="is-medium"
                style="font-size: 1rem"
              >
                Szöveget adok meg
              </b-radio>
            </b-field>
            <b-field v-if="thanksType === 'link'">
              <ValidationProvider
                v-slot="{errors}"
                name="link"
                :rules="{ regex: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/ }"
              >
                <b-input
                  v-model="
                    purchaseForm.successLink"
                  required
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>
            <b-field v-if="thanksType === 'text'">
              <client-only>
                <quill-editor
                  ref="editor"
                  v-model="purchaseForm.successText"
                  :options="editorOption"
                />
              </client-only>
            </b-field>

            <b-field label="Űrlap promociós tartalom">
              <client-only>
                <quill-editor
                  ref="editor"
                  v-model="purchaseForm.promotionText"
                  :options="editorOption"
                />
              </client-only>
            </b-field>
            <b-field label="Feliratkozás a hírlevélre">
              <b-checkbox v-model="purchaseForm.newsletterCheckbox">
                Legyen feliratkozás a hírlevélre lehetőség
              </b-checkbox>
            </b-field>
            <hr>
            <b-field label="Fizetési lehetőségek">
              <b-field>
                <b-checkbox v-model="purchaseForm.bankTransferEnabled">
                  Banki utalás
                </b-checkbox>
                <b-checkbox
                  v-model="purchaseForm.stripeEnabled"
                  :disabled="!stripeIntegrated"
                >
                  Kártyás fizetés: <b>Stripe</b>
                </b-checkbox>
                <b-checkbox
                  v-model="purchaseForm.simplePayEnabled"
                  :disabled="!simplePayIntegrated"
                >
                  Kártyás fizetés: <b>SimplePay</b>
                </b-checkbox>
              </b-field>
            </b-field>
          </card-component>

          <card-component class="flex-item-2">
            <b-field label="Termék típusa">
              <b-field>
                <b-radio
                  v-model="productType"
                  native-value="one_time"
                >
                  Egyszeri vásárlás
                </b-radio>
                <b-radio
                  v-model="productType"
                  native-value="subscription"
                >
                  Előfizetéses
                </b-radio>
              </b-field>
            </b-field>
            <b-field grouped>
              <b-field
                label="Űrlaphoz tartozó termékek listája"
                expanded
              />
              <b-field expanded>
                <b-button
                  v-if="!addProduct"
                  outlined
                  size="is-small"
                  type="is-primary"
                  label="Termék hozzáadása"
                  :loading="isLoading"
                  expanded
                  @click="addNewProduct()"
                />
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
                  size="is-small"
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
                  size="is-small"
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
              <b-table-column
                v-slot="props"
                label="Termék"
                field="name"
              >
                {{ props.row.name }}
              </b-table-column>
              <b-table-column
                v-slot="props"
                label="Ár"
                field="grossPrice"
              >
                {{ props.row.grossPrice }} Ft
              </b-table-column>
              <b-table-column
                v-slot="props"
                custom-key="actions"
                class="is-actions-cell"
              >
                <div class="buttons is-right">
                  <div class="t-button-wrapper">
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
                </div>
              </b-table-column>
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
      productType: 'one_time',
      plusProductId: 0,
      selectedProductID: 0,
      plusProduct: [],
      thanksType: '',
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ align: [] }],
            ['link', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ color: [] }, { background: [] }],
            ['clean']
          ]
        }
      },
      stripeIntegrated: null,
      simplePayIntegrated: null
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
    this.productType = await this.purchaseForm.products[0].type

    try {
      this.allProducts = await this.$strapi.find('products')
      const data = await this.$strapi.$http.$get('/companies/own/integrations')
      this.stripeIntegrated = data.stripeIntegrated
      this.simplePayIntegrated = data.simplePayIntegrated
    } catch (err) {
      this.$buefy.toast.open({
        message: 'Nem sikerült betölteni az adatokat',
        type: 'is-danger'
      })
    }

    if (this.purchaseForm.products.length > 0) {
      this.selectedProductIDs = this.purchaseForm.products.map(
        product => product.id
      )
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
        promotionText: '',
        products: [],
        newsletterCheckbox: null,
        stripeEnabled: null,
        simplePayEnabled: null,
        bankTransferEnabled: null
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
          this.purchaseForm.products = this.purchaseForm.products.filter(
            product => product.id !== id
          )
          console.log(this.purchaseForm.products)
          this.$buefy.snackbar.open({
            message: 'Sikeresen törölve',
            queue: false
          })
        }
      })
    },
    addNewProduct () {
      if (
        this.purchaseForm.products.some(
          product => product.type === 'subscription'
        )
      ) {
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
          const res = await this.$strapi.findOne(
            'purchase-forms',
            this.$route.params.id
          )
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
      if (this.plusProductId === 0) {
        this.$buefy.snackbar.open({
          message: 'Válassz egy terméket!',
          type: 'is-danger',
          queue: false
        })
      } else {
        this.plusProduct = []
        this.plusProduct.push(
          this.allProducts.find(product => product.id === this.plusProductId)
        )
        this.purchaseForm.products = this.plusProduct
        this.addProduct = false
        this.subProductAdded = true
        console.log(this.purchaseForm.products)
        this.$buefy.snackbar.open({
          message: 'Termék sikeresen hozzáadva',
          queue: false
        })
        this.plusProductId = 0
      }
    },

    addNewOneProduct () {
      const subProductPresent = this.purchaseForm.products.some(
        product => product.type === 'subscription'
      )
      const productAlreadyAdded = this.purchaseForm.products.some(
        product => product.id === this.selectedProductID
      )
      if (subProductPresent && this.selectedProductID !== 0) {
        this.purchaseForm.products = []
        this.purchaseForm.products.push(
          this.allProducts.find(
            product => product.id === this.selectedProductID
          )
        )
        this.addProduct = false
        this.$buefy.snackbar.open({
          message: 'Termék sikeresen hozzáadva',
          queue: false
        })
        this.plusProductId = 0
        this.selectedProductID = 0
      } else if (productAlreadyAdded && this.selectedProductID !== 0) {
        this.$buefy.snackbar.open({
          message: 'Ez a termék már szerepel az űrlapon',
          type: 'is-danger',
          queue: false
        })
      } else if (this.selectedProductID === 0) {
        this.$buefy.snackbar.open({
          message: 'Válassz egy terméket!',
          type: 'is-danger',
          queue: false
        })
      } else {
        this.purchaseForm.products.push(
          this.allProducts.find(
            product => product.id === this.selectedProductID
          )
        )
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

        await this.$strapi.update(
          'purchase-forms',
          this.purchaseForm.id,
          this.purchaseForm
        )

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
