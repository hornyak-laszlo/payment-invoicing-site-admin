<template>
  <div>
    <hero-bar>
      <b-icon
        pack="fas"
        icon="shopping-basket"
        size="is-small"
        style="margin: 1rem"
      />
      Vásárlás szerkesztése, ID: {{ $route.params.id }}
      <nuxt-link
        slot="right"
        to="/purchases"
        class="button is-primary"
      >
        Vissza a vásárlásokhoz
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <ValidationObserver v-slot="{ invalid }">
        <form
          class="flex-container"
          @submit.prevent="submit"
        >
          <card-component>
            <b-field grouped>
              <b-field
                label="Vezetéknév"
                message="Vásárló vezetékneve"
                expanded
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Vezetéknév"
                  rules="required"
                >
                  <b-input
                    v-model="purchase.lastName"
                    placeholder="Vezetéknév"
                    required
                  />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
              <b-field
                expanded
                label="Keresztnév"
                message="Vásárló keresztneve"
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Keresztnév"
                  rules="required"
                >
                  <b-input
                    v-model="purchase.firstName"
                    placeholder="Keresztnév"
                    required
                  />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
            </b-field>
            <b-field
              label="Email"
              message="Vásárló e-mail címe"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="Email"
                rules="required|email"
              >
                <b-input
                  v-model="purchase.email"
                  type="email"
                  required
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>
            <b-field
              label="Telefonszám"
              message="Vásárló telefonszáma"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="Telefonszám"
                rules="required"
              >
                <b-input
                  v-model="purchase.phoneNumber"
                  required
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>
            <b-field
              label="Cégnév"
              message="Vásárló cég neve"
            >
              <b-input v-model="purchase.companyName" />
            </b-field>

            <b-field
              label="Adószám"
              message="Vásárló adószáma"
            >
              <b-input v-model="purchase.taxNumber" />
            </b-field>
            <b-field label="Számlázási cím" />
            <b-field grouped>
              <b-field
                label="Ország"
                expanded
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Ország"
                  rules="required"
                >
                  <b-input
                    v-model="purchase.invoiceCountry"
                    placeholder="Ország"
                    required
                  />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
              <b-field
                label="Irányítószám"
                expanded
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Irányítószám"
                  rules="required"
                >
                  <b-input
                    v-model="purchase.invoiceZip"
                    placeholder="Irányítószám"
                    required
                    type="number"
                  />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
            </b-field>
            <b-field grouped>
              <b-field
                label="Város"
                expanded
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Város"
                  rules="required"
                >
                  <b-input
                    v-model="purchase.invoiceCity"
                    placeholder="Város"
                    required
                  />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
              <b-field
                label="Utca és házszám"
                expanded
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Utca és házszám"
                  rules="required"
                >
                  <b-input
                    v-model="purchase.invoiceStreetNo"
                    placeholder="Utca és házszám"
                    required
                  />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
            </b-field>
            <b-field label="Kiszállítási cím" />
            <b-field grouped>
              <b-field
                label="Ország"
                expanded
              >
                <b-input
                  v-model="purchase.deliveryCountry"
                  placeholder="Ország"
                />
              </b-field>
              <b-field
                expanded
                label="Irányítószám"
              >
                <b-input
                  v-model="purchase.deliveryZip"
                  placeholder="Irányítószám"
                  type="number"
                />
              </b-field>
            </b-field>
            <b-field grouped>
              <b-field
                expanded
                label="Város"
              >
                <b-input
                  v-model="purchase.deliveryCity"
                  placeholder="Város"
                />
              </b-field>
              <b-field
                label="Utca és házszám"
                expanded
              >
                <b-input
                  v-model="purchase.deliveryStreetNo"
                  placeholder="Utca és házszám"
                />
              </b-field>
            </b-field>
            <b-field grouped>
              <b-field
                label="Feltételeket elfogadta"
                message="A vásárló elfogadta az általános feltételeket"
                expanded
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Feltételek"
                  rules="required"
                >
                  <b-select
                    v-model="purchase.isGTCaccepted"
                    required
                  >
                    <option :value="true">
                      igen
                    </option>
                    <option :value="false">
                      nem
                    </option>
                  </b-select>
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
              <b-field
                label="Adatkezelést elfogadta"
                message="A vásárló elfogadta az adatkezelési feltételeket"
                expanded
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Adatkezelés"
                  rules="required"
                >
                  <b-select
                    v-model="purchase.isPrivacyPolicyAccepted"
                    required
                  >
                    <option :value="true">
                      igen
                    </option>
                    <option :value="false">
                      nem
                    </option>
                  </b-select>
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
              <b-field
                label="Hírlevélre feliratkozott"
                message="A vásárló feliratkozott a hírlevélre"
                expanded
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Hírlevél"
                  rules="required"
                >
                  <b-select
                    v-model="purchase.isNewsletterSubscribed"
                    required
                  >
                    <option :value="true">
                      igen
                    </option>
                    <option :value="false">
                      nem
                    </option>
                  </b-select>
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
            </b-field>
            <b-field
              label="Fizetési mód"
              message="Hogy fizet a vevő"
              expanded
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="Fizetési mód"
                rules="required"
              >
                <b-select
                  v-model="purchase.paymentMethod"
                  required
                  expanded
                >
                  <option value="bankTransfer">
                    Átutalás
                  </option>
                  <option value="stripe">
                    Bankkártya Stripe
                  </option>
                  <option value="simplePay">
                    Bankkártya SimplePay
                  </option>
                </b-select>
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>
            <b-field
              label="Rendelés státusza"
              message="Hol tart a rendelés"
              expanded
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="Rendelés státusza"
                rules="required"
              >
                <b-select
                  v-model="purchase.status"
                  required
                  expanded
                >
                  <option value="ordered">
                    Megrendelve
                  </option>
                  <option value="payed">
                    Kifizetve
                  </option>
                  <option value="shipped">
                    Kiszállítva
                  </option>
                </b-select>
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>
          </card-component>

          <card-component class="flex-item-2">
            <b-field grouped>
              <b-field
                label="Vásárláshoz tartozó termékek listája"
                expanded
              />
              <b-field expanded>
                <b-button
                  v-if="!addProduct"
                  outlined
                  type="is-primary"
                  size="is-small"
                  label="Termék hozzáadása"
                  :loading="isLoading"
                  expanded
                  @click="addProduct = true"
                />
              </b-field>
            </b-field>
            <b-field
              v-if="addProduct"
              horizontal
              class="add-product-no-label pl-4"
            >
              <b-field label="Termék">
                <b-select
                  v-model="plusProductId"
                  required
                  @change.native="getPlusProduct()"
                >
                  <option
                    v-for="product in allProducts"
                    :key="product.id"
                    :value="product.id"
                  >
                    {{ product.name }}
                  </option>
                </b-select>
              </b-field>
              <b-field label="Mennyiség">
                <b-input
                  v-model="plusProductQuantity"
                  type="number"
                  required
                  name="mennyiség"
                />
              </b-field>
              <b-field
                label="Bruttó ár"
                style="min-width: 85px"
              >
                <b-input
                  v-model="plusProductPrice"
                  type="number"
                  required
                />
              </b-field>
              <b-field>
                <b-button
                  style="border-radius: 5px; margin-top: 2.5em"
                  type="is-primary"
                  size="is-small"
                  label="Hozzáadás"
                  :loading="isLoading"
                  expanded
                  @click="addNewProduct()"
                />
                <b-button
                  style="border-radius: 5px; margin-top: 2.5em"
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
              :data="purchase.products"
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
                label="Mennyiség"
                field="quantity"
              >
                {{ props.row.quantity }}
              </b-table-column>
              <b-table-column
                v-slot="props"
                label="Összesen"
                field="quantity"
              >
                {{ props.row.quantity * props.row.grossPrice }} Ft
              </b-table-column>
              <b-table-column
                v-slot="props"
                custom-key="actions"
                class="is-actions-cell"
              >
                <div class="buttons is-right">
                  <div class="t-button-wrapper">
                    <nuxt-link
                      :to="`/products/edit/${props.row.productId}`"
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
                      @click="deleteProduct(props.row.productId)"
                    />
                  </div>
                </div>
              </b-table-column>
            </b-table>
            <b-field grouped>
              <b-field
                label="Teljes összeg"
                expanded
                style="marginLeft: 1.5em"
              />
              <b-field style="marginRight: 2em">
                <strong>{{ sumOfPurchase }} Ft</strong>
              </b-field>
            </b-field>
            <b-field
              v-if="purchase.type === 'subscription'"
              style="marginLeft: 1.5em"
              label="Előfizetés státusza"
              expanded
            >
              <b-select
                v-model="purchase.subscriptionStatus"
                style="marginRight: 1em"
                required
                expanded
              >
                <option value="active">
                  Aktív
                </option>
                <option value="inactive">
                  Inaktív
                </option>
                <option value="cancelled">
                  Lemondva
                </option>
              </b-select>
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
            <hr v-if="purchase.invoices.length">
            <b-field
              v-if="purchase.invoices.length"
              label="Vásárláshoz tartozó számlák listája"
            />
            <b-table
              v-if="purchase.invoices.length"
              :striped="true"
              :hoverable="true"
              default-sort="id"
              :data="purchase.invoices"
              :mobile-cards="true"
            >
              <b-table-column
                v-slot="props"
                label="ID"
                field="id"
              >
                {{ props.row.id }}
              </b-table-column>
              <b-table-column
                v-slot="props"
                label="Kiállítva"
                field="created_at"
              >
                {{ props.row.created_at }}
              </b-table-column>

              <b-table-column label="Vásárlás összege">
                {{ sumOfPurchase }}
              </b-table-column>

              <b-table-column
                v-slot="props"
                custom-key="actions"
                class="is-actions-cell"
              >
                <div class="buttons is-right">
                  <div class="t-button-wrapper">
                    <a
                      :href="props.row.pdfLink"
                      target="_blank"
                      class="button is-small"
                    >
                      <b-icon
                        pack="fas"
                        icon="download"
                        size="is-small"
                        type="is-primary"
                      />
                    </a>
                  </div>
                </div>
              </b-table-column>
            </b-table>
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
  name: 'PurchaseEdit',
  components: {
    CardComponent,
    HeroBar
  },
  data () {
    return {
      isLoading: false,
      purchase: this.getClearFormObject(),
      addProduct: false,
      allProducts: [],
      plusProductId: 0,
      plusProductQuantity: 1,
      plusProductPrice: 0
    }
  },
  head () {
    return {
      title: 'Vásárlás szerkesztése'
    }
  },
  computed: {
    sumOfPurchase () {
      if (this.purchase.products.length > 0) {
        const priceArray = this.purchase.products.map((product) => {
          return product.grossPrice * product.quantity
        })
        return priceArray.reduce((a, b) => a + b)
      } else {
        return 0
      }
    }
  },

  async mounted () {
    await this.getData()
    this.allProducts = await this.$strapi.find('products')
  },

  methods: {
    getClearFormObject () {
      return {
        id: '',
        firstName: '',
        lastName: '',
        isGTCaccepted: null,
        isNewsletterSubscribed: null,
        isPrivacyPolicyAccepted: null,
        paymentMethod: '',
        email: '',
        phoneNumber: '',
        companyName: '',
        deliveryCountry: '',
        deliveryCity: '',
        deliveryZip: '',
        deliveryStreetNo: '',
        taxNumber: '',
        invoiceCountry: '',
        invoiceCity: '',
        invoiceZip: '',
        invoiceStreetNo: '',
        products: [],
        status: '',
        subscriptionStatus: '',
        invoices: []
      }
    },

    getPlusProduct () {
      const foundPlusProduct = this.allProducts.find(
        product => product.id === this.plusProductId
      )
      this.plusProductPrice = foundPlusProduct.grossPrice
    },

    addNewProduct () {
      const foundPlusProduct = this.allProducts.find(
        product => product.id === this.plusProductId
      )
      if (foundPlusProduct !== undefined) {
        const plusProduct = {
          productId: this.plusProductId,
          quantity: this.plusProductQuantity,
          name: foundPlusProduct.name,
          nameInvoice: foundPlusProduct.nameInvoice,
          description: foundPlusProduct.description,
          grossPrice: this.plusProductPrice,
          isShippable: foundPlusProduct.isShippable,
          type: foundPlusProduct.type,
          period: foundPlusProduct.period,
          taxRatePercent: foundPlusProduct.taxRate.percent
        }
        this.purchase.products.push(plusProduct)
        this.addProduct = false
        this.plusProductId = 0
        this.plusProductQuantity = 1
        this.plusProductPrice = 0
      } else {
        this.$buefy.snackbar.open({
          message: 'Nem választottál ki terméket',
          type: 'is-danger',
          queue: false
        })
      }
    },
    deleteProduct (index) {
      this.$buefy.dialog.confirm({
        title: 'Termék törlése',
        message:
          'Biztos, hogy <b>törölni</b> akarod ezt a terméket? <br> A műveletet nem lehet visszavonni',
        confirmText: 'Termék törlése',
        cancelText: 'Mégse',
        type: 'is-danger',
        hasIcon: true,
        iconPack: 'fas',
        icon: 'trash-alt',
        onConfirm: () => {
          this.purchase.products = this.purchase.products.filter(
            product => product.productId !== index
          )
        }
      })
    },
    async getData () {
      if (this.$route.params.id) {
        try {
          this.purchase = await this.$strapi.findOne(
            'purchases',
            this.$route.params.id
          )
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

        await this.$strapi.update('purchases', this.purchase.id, this.purchase)

        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Sikeresen mentve',
          queue: false
        })
        this.$router.push('/purchases')
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
