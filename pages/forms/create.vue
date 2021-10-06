<template>
  <div>
    <hero-bar>
      <b-icon
        pack="fas"
        icon="columns"
        size="is-small"
        style="margin: 1rem"
      />
      Űrlap hozzáadása
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
          <b-field label="Űrlap típusa" />
          <b-field>
            <b-radio
              v-model="type"
              native-value="contact-forms"
            >
              Kontakt űrlap
            </b-radio>
            <b-radio
              v-model="type"
              native-value="purchase-forms"
            >
              Vásárlás űrlap
            </b-radio>
          </b-field>
          <b-field
            label="Név"
            message="Űrlap neve"
          >
            <b-input
              v-model="form.name"
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
                v-model="form.link"
                required
              />
            </b-field>
            <b-field
              label="Sikeres link"
              message="Sikeres kapcsolatfevétel linkje"
              expanded
            >
              <b-input
                v-model="form.successLink"
                required
              />
            </b-field>
          </b-field>
          <b-field
            label="Sikeres szöveg"
            message="Sikeres kapcsolatfevétel szövege"
          >
            <b-input
              v-model="form.successText"
              required
              type="textarea"
            />
          </b-field>
          <b-field label="Űrlap promociós tartalom">
            <client-only>
              <quill-editor
                ref="editor"
                v-model="content"
                :options="editorOption"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)"
              />
            </client-only>
          </b-field>

          <b-field label="Feliratkozás a hírlevélre">
            <b-checkbox>
              Legyen feliratkozás a hírlevélre lehetőség
            </b-checkbox>
          </b-field>
          <hr>
          <b-field
            v-if="type === 'purchase-forms'"
            label="Fizetési lehetőségek"
          >
            <b-field>
              <b-checkbox v-model="form.bankTransferEnabled">
                Banki utalás
              </b-checkbox>
              <b-checkbox
                v-model="form.stripeEnabled"
                :disabled="!stripeIntegrated"
              >
                Kártyás fizetés: <b>Stripe</b>
              </b-checkbox>
              <b-checkbox
                v-model="form.simplePayEnabled"
                :disabled="!simplePayIntegrated"
              >
                Kártyás fizetés: <b>SimplePay</b>
              </b-checkbox>
            </b-field>
          </b-field>
          <b-field v-if="type === 'contact-forms'">
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

        <card-component v-if="type === 'purchase-forms'">
          <b-field
            v-if="type === 'purchase-forms'"
            label="Termék típusa"
          >
            <b-field v-if="type === 'purchase-forms'">
              <b-radio
                v-model="productType"
                native-value="subscription"
              >
                Előfizetéses
              </b-radio>
              <b-radio
                v-model="productType"
                native-value="one_time"
              >
                Egyszeri vásárlás
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
                outlined
                style="border-radius: 5px"
                type="is-primary"
                label="Termék hozzáadása"
                expanded
                @click="addProduct = true"
              />
            </b-field>
          </b-field>

          <b-field
            v-if="productType === 'subscription' && addProduct"
            class="add-product-no-label"
            horizontal
            label-position="inside"
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
              expanded
              :loading="isLoading"
              @click="addNewSubProduct()"
            />
            <b-button
              style="border-radius: 5px"
              label="Mégse"
              size="is-small"
              expanded
              :loading="isLoading"
              @click="addProduct = false"
            />
          </b-field>
          <b-field
            v-if="productType === 'one_time' && addProduct"
            horizontal
            class="add-product-no-label"
          >
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

            <b-button
              style="border-radius: 5px"
              type="is-primary"
              size="is-small"
              label="Hozzáadás"
              :loading="isLoading"
              expanded
              @click="addNewOneProduct()"
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

          <b-table
            v-if="form.products.length !== 0"
            :striped="true"
            :hoverable="true"
            default-sort="id"
            :data="form.products"
            :mobile-cards="true"
          >
            <template slot-scope="props">
              <b-table-column
                label="Termék"
                field="name"
              >
                {{ props.row.name }}
              </b-table-column>
              <b-table-column
                label="Ár"
                field="grossPrice"
              >
                {{ props.row.grossPrice }} Ft
              </b-table-column>

              <b-table-column
                custom-key="actions"
                class="is-actions-cell"
              >
                <div class="buttons is-right">
                  <b-button
                    size="is-small"
                    @click="deleteProduct(props.row.id)"
                  >
                    <b-icon
                      pack="fas"
                      icon="trash-alt"
                      size="is-small"
                      type="is-danger"
                    />
                  </b-button>
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
      form: this.getClearFormObject(),
      allProducts: [],
      selectedProductID: 0,
      productType: '',
      plusProductId: 0,
      plusProduct: [],
      addProduct: false,
      subProductAdded: false,
      type: '',
      content: 'testing',
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }], [{ font: [] }], ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'], [{ align: [] }], ['link', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }], [{ indent: '-1' }, { indent: '+1' }],
            [{ color: [] }, { background: [] }], ['clean']
          ]
        }
      },
      stripeIntegrated: null,
      simplePayIntegrated: null

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
    this.getClearFormObject()
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
  },
  methods: {
    getClearFormObject () {
      return {
        name: '',
        link: '',
        successLink: '',
        successText: '',
        products: [],
        company: '',
        stripeEnabled: null,
        simplePayEnabled: null,
        bankTransferEnabled: true
      }
    },

    onEditorBlur (editor) {
      console.log('editor blur!', editor)
      console.log(this.content)
    },
    onEditorFocus (editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      console.log('editor ready!', editor)
    },

    deleteProduct (id) {
      this.form.products = this.form.products.filter(product => product.id !== id)
      console.log(this.form.products)
    },

    addNewSubProduct () {
      this.plusProduct = []
      this.plusProduct.push(this.allProducts.find(product => product.id === this.plusProductId))
      this.form.products = this.plusProduct
      this.addProduct = false
      this.subProductAdded = true
      console.log(this.form.products)
      this.$buefy.snackbar.open({
        message: 'Termék sikeresen hozzáadva',
        queue: false
      })
    },

    addNewOneProduct () {
      if (this.form.products.find(product => product.type === 'subscription') !== undefined) {
        this.form.products = []
        this.form.products.push(this.allProducts.find(product => product.id === this.selectedProductID))
        this.addProduct = false
        console.log(this.form.products)
        this.$buefy.snackbar.open({
          message: 'Termék sikeresen hozzáadva',
          queue: false
        })
        this.selectedProductID = 0
      } else if (this.form.products.find(product => product.id === this.selectedProductID) !== undefined) {
        this.$buefy.snackbar.open({
          message: 'Ez a termék már hozzá van adva az űrlaphoz',
          type: 'is-danger',
          queue: false
        })
      } else {
        this.form.products.push(this.allProducts.find(product => product.id === this.selectedProductID))
        this.addProduct = false
        console.log(this.form.products)
        this.$buefy.snackbar.open({
          message: 'Termék(ek) sikeresen hozzáadva',
          queue: false
        })
        this.selectedProductID = 0
      }
    },

    async submit () {
      try {
        this.isLoading = true
        if (this.type === 'purchase-forms') {
          await this.$strapi.create('purchase-forms', this.form)
        } else if (this.type === 'contact-forms') {
          await this.$strapi.create('contact-forms', this.form)
        }

        this.form = this.getClearFormObject()
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
