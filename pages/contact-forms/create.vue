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
      <card-component>
        <form @submit.prevent="submit">
          <b-field
            label="Név"
            message="Űrlap neve"
          >
            <b-input
              v-model="contactForm.name"
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
                v-model="contactForm.link"
                required
              />
            </b-field>
            <b-field
              label="Sikeres link"
              expanded
              message="Sikeres kapcsolatfevétel linkje"
            >
              <b-input
                v-model="contactForm.successLink"
                required
              />
            </b-field>
          </b-field>
          <b-field
            label="Sikeres szöveg"
            message="Sikeres kapcsolatfevétel szövege"
          >
            <b-input
              v-model="contactForm.successText"
              required
              type="textarea"
            />
          </b-field>
          <b-field label="Feliratkozás a hírlevélre">
            <b-checkbox v-model="contactForm.newsletterCheckbox">
              Legyen feliratkozás a hírlevélre lehetőség
            </b-checkbox>
          </b-field>
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
      contactForm: {
        type: 'contact-forms',
        name: '',
        link: '',
        successLink: '',
        successText: '',
        newsletterCheckbox: null
      }
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
        link: '',
        successLink: '',
        successText: '',
        newsletterCheckbox: null
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
