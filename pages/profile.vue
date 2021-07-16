
<template>
  <div>
    <hero-bar> Profil </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component
          title="Profil"
          icon="id-card"
          class="tile is-child"
        >
          <b-field label="Felhasználónév">
            <b-input
              :value="username"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field label="Email cím">
            <b-input
              :value="email"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field label="Jogosultság">
            <b-input
              :value="role"
              custom-class="is-static"
              readonly
            />
          </b-field>
        </card-component>
      </tiles>
      <tiles>
        <card-component
          title="Új Jelszó Beállítása"
          icon="key"
          class="tile is-child"
        >
          <form>
            <b-field label="Régi jelszó">
              <b-input
                v-model="password"
                type="password"
              />
            </b-field>
            <b-field label="Új jelszó">
              <b-input
                v-model="newPassword"
                type="password"
              />
            </b-field>
            <b-field label="Jelszó megerősítése">
              <b-input
                v-model="newPasswordConfirmation"
                type="password"
              />
            </b-field>
            <p
              v-if="!newPwMatch"
              class="has-text-danger is-size-6"
            >
              A két új jelszónak egyeznie kell!
            </p>
            <b-button
              type="is-primary is-outlined is-light"
              :disabled="!btnDisabled || isLoading"
              @click="changePassword"
            >
              Beállítás
            </b-button>
          </form>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import CardComponent from '@/components/common/CardComponent'
import HeroBar from '@/components/common/HeroBar'
import Tiles from '@/components/common/Tiles'

export default {
  name: 'Profile',
  components: {
    Tiles,
    HeroBar,
    CardComponent
  },
  data () {
    return {
      password: '',
      newPassword: '',
      newPasswordConfirmation: '',
      isLoading: false,
      response: ''
    }
  },
  head () {
    return {
      title: 'Profil'
    }
  },
  computed: {
    username () {
      return this.$strapi.user ? this.$strapi.user.username : ''
    },
    email () {
      return this.$strapi.user ? this.$strapi.user.email : ''
    },
    role () {
      return this.$strapi.user ? this.$strapi.user.role.name : ''
    },
    btnDisabled () {
      return this.password.length > 0 && this.newPassword.length > 0 && this.newPasswordConfirmation.length > 0 && this.newPassword === this.newPasswordConfirmation
    },
    newPwMatch () {
      return this.newPassword === this.newPasswordConfirmation
    }
  },
  methods: {
    async changePassword () {
      this.isLoading = true
      try {
        const response = await fetch('https://payment-invoicing-site.herokuapp.com/password', {
          method: 'POST',
          body: JSON.stringify({
            password: this.password,
            newPassword: this.newPassword,
            newPasswordConfirmation: this.newPasswordConfirmation
          })
        })
        this.isLoading = false
        this.response = await response.json()
      } catch (error) {
        this.response = error.message
      }
    }
  }
}
</script>
