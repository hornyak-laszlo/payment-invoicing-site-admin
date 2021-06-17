<template>
  <div>
    <hero-bar>
      Űrlap szerkesztése
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        :title="`Űrlap - ID: ${contactForm.id}`"
        icon="columns"
        class="tile is-child"
      >
        <form @submit.prevent="submit">
          <b-field label="Név" message="Űrlap neve" horizontal>
            <b-input
              v-model="contactForm.name"
              required
            />
          </b-field>
          <b-field label="Link" message="Link ahol elérhető lesz az űrlap" horizontal>
            <b-input
              v-model="contactForm.contactLink"
              required
            />
          </b-field>
          <b-field label="Sikeres link" message="Sikeres kapcsolatfevétel linkje" horizontal>
            <b-input
              v-model="contactForm.successfulContactLink"
              required
            />
          </b-field>
          <hr>
          <b-field horizontal>
            <b-button
              type="is-primary"
              :loading="isLoading"
              native-type="submit"
            >
              Mentés
            </b-button>
            <nuxt-link
              to="/forms"
              class="button is-secondary"
            >
              Vissza
            </nuxt-link>
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
  name: 'ContactFormEdit',
  components: {
    CardComponent,
    HeroBar
  },
  data () {
    return {
      isLoading: false,
      contactForm: this.getClearFormObject()
    }
  },
  head () {
    return {
      title: 'Kontakt űrlap szerkesztése'
    }
  },
  async mounted () {
    this.contactForm = await this.getData()
  },
  methods: {
    getClearFormObject () {
      return {
        id: '',
        name: '',
        contactLink: '',
        successfulContactLink: ''
      }
    },
    async getData () {
      if (this.$route.params.id) {
        try {
          const res = await this.$strapi.findOne('contact-forms', this.$route.params.id)
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

        await this.$strapi.update('contact-forms', this.contactForm.id, this.contactForm)

        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Sikeresen mentve',
          queue: false
        })
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
