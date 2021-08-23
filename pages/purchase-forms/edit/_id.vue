<template>
  <div>
    <hero-bar>
      Űrlap szerkesztése
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
        :title="`Űrlap - ID: ${purchaseForm.id}`"
        icon="columns"
        class="tile is-child"
      >
        <ValidationObserver v-slot="{ invalid }">
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
                type="textarea"
                required
              />
            </b-field>
            <b-field
              label="Űrlaphoz tartozó termékek"
              horizontal
            >
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
                    Termék ID: {{ product.id }}
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
                <b-button
                  expanded
                  outlined
                  type="is-danger"
                  style="border-top-left-radius: 0; border-top-right-radius: 0; border-color: whitesmoke;"
                  label="Termék törlése"
                  icon-pack="fas"
                  icon-left="trash-alt"
                  class="card-footer-item"
                  @click="deleteProduct(product.id)"
                >
                  Termék törlése
                </b-button>
              </footer>
            </b-collapse>
            <b-field horizontal>
              <b-button
                outlined
                type="is-primary"
                label="Termék hozzáadása"
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
      purchaseForm: this.getClearFormObject()
    }
  },
  head () {
    return {
      title: 'Vásárlás űrlap szerkesztése'
    }
  },
  async mounted () {
    this.purchaseForm = await this.getData()
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
      console.log(this.purchaseForm.products.some(product => product.type === 'one_time'))
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
