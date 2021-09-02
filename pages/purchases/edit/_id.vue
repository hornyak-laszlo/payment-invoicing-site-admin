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
      <card-component>
        <ValidationObserver v-slot="{ invalid }">
          <form @submit.prevent="submit">
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
                  <option value="transfer">
                    Átutalás
                  </option>
                  <option value="creditCard">
                    Bankkártya
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
            <hr>
            <b-field label="Rendelt termékek">
              Vásárló által rendelt termékek listája:
            </b-field>
            <b-collapse
              v-for="(product, index) of purchase.products"
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
                    {{ product.name }}
                  </p>
                  <a class="card-header-icon">
                    <b-icon :icon="props.open ? 'menu-up' : 'menu-down'" />
                  </a>
                </div>
              </template>
              <div class="card-content">
                <div class="content">
                  <p>
                    <strong>Termék leírása:</strong>
                    {{ product.description }}
                  </p>
                </div>
                <div class="content">
                  <p>
                    <strong>Termék ára:</strong>
                    <b-input
                      v-model="product.grossPrice"
                      type="number"
                      required
                    />
                  </p>
                </div>
                <div class="content">
                  <p>
                    <strong>Rendelt mennyiség:</strong>
                    <b-input
                      v-model="product.quantity"
                      type="number"
                      required
                    />
                  </p>
                </div>
              </div>
              <footer class="card-footer">
                <b-button
                  expanded
                  outlined
                  type="is-danger"
                  style="border-top-left-radius: 0; border-top-right-radius: 0; border-color: whitesmoke;"
                  label="Termék törlése"
                  icon-pack="fas"
                  icon-left="trash-alt"
                  class="card-footer-item"
                  @click="deleteProduct(index)"
                />
              </footer>
            </b-collapse>
            <b-field
              v-if="!addProduct"
              horizontal
            >
              <b-button
                outlined
                type="is-primary"
                label="Termék hozzáadása"
                :loading="isLoading"
                @click="addProduct = true"
              />
            </b-field>
            <b-field
              v-else
              horizontal
            >
              <strong>Termék:</strong>
              <b-select
                v-model="plusProductId"
                required
              >
                <option
                  v-for="product in allProducts"
                  :key="product.id"
                  :value="product.id"
                >
                  {{ product.name }}
                </option>
              </b-select>
              <strong>Mennyiség:</strong>
              <b-input
                v-model="plusProductQuantity"
                type="number"
                required
              />
              <b-button
                style="border-radius: 5px"
                type="is-primary"
                label="Hozzáadás"
                size="is-small"
                :loading="isLoading"
                @click="addNewProduct()"
              />
              <b-button
                style="border-radius: 5px"
                type="is-danger"
                label="Mégse"
                size="is-small"
                :loading="isLoading"
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
      plusProductQuantity: 1
    }
  },
  head () {
    return {
      title: 'Vásárlás szerkesztése'
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
        status: ''
      }
    },
    addNewProduct () {
      const foundPlusProduct = this.allProducts.find(product => product.id === this.plusProductId)
      const plusProduct = {
        productId: this.plusProductId,
        quantity: this.plusProductQuantity,
        name: foundPlusProduct.name,
        nameInvoice: foundPlusProduct.nameInvoice,
        description: foundPlusProduct.description,
        grossPrice: foundPlusProduct.grossPrice,
        isShippable: foundPlusProduct.isShippable,
        type: foundPlusProduct.type,
        period: foundPlusProduct.period,
        taxRatePercent: foundPlusProduct.taxRate.percent
      }
      this.purchase.products.push(plusProduct)
      this.addProduct = false
    },
    deleteProduct (index) {
      this.$buefy.dialog.confirm({
        title: 'Termék törlése',
        message: 'Biztos, hogy <b>törölni</b> akarod ezt a terméket? <br> A műveletet nem lehet visszavonni',
        confirmText: 'Termék törlése',
        cancelText: 'Mégse',
        type: 'is-danger',
        hasIcon: true,
        iconPack: 'fas',
        icon: 'trash-alt',
        onConfirm: () => {
          this.purchase.products.splice(index, 1)
        }
      })
    },
    async getData () {
      if (this.$route.params.id) {
        try {
          this.purchase = await this.$strapi.findOne('purchases', this.$route.params.id)
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
