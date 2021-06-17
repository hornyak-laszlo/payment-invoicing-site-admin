<template>
  <div>
    <hero-bar>
      Űrlap hozzáadása
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        title="Új űrlap"
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
              Létrehozás
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
  name: 'FormCreate',
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
      title: 'Űrlap hozzáadása'
    }
  },
  methods: {
    getClearFormObject () {
      return {
        type: 'contact-forms',
        name: '',
        contactLink: '',
        successfulContactLink: ''
      }
    },
    async submit () {
      try {
        this.isLoading = true
        if (this.contactForm.type === 'contact-forms') {
          await this.$strapi.create('contact-forms', this.contactForm)
        }

        this.contactForm = this.getClearFormObject()
        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Létrehozás sikeres',
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
