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
          <hr>
          <b-field horizontal>
            <b-button
              type="is-primary"
              :loading="isLoading"
              native-type="submit"
              expanded
            >
              Mentés
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

        await this.$strapi.update('purchase-forms', this.purchaseForm.id, this.contactForm)

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
