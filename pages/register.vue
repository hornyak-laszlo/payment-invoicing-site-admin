<template>
  <section
    class="columns is-vcentered"
    :style="{height: '100vh'}"
  >
    <div class="column is-half is-offset-one-quarter">
      <card-component
        title="Regisztráció"
        icon="user-lock"
        class="title is-child"
      >
        <form @submit.prevent="submit">
          <b-field label="Felhasználó név">
            <b-input
              v-model="username"
              type="text"
              required
            />
          </b-field>
          <b-field label="Email cím">
            <b-input
              v-model="email"
              type="email"
              required
            />
          </b-field>
          <b-field label="Jelszó">
            <b-input
              v-model="password"
              type="password"
              required
            />
          </b-field>
          <b-field label="Jelszó megerősítése">
            <b-input
              v-model="password2"
              type="password"
              required
            />
          </b-field>
          <hr>
          <b-field :style="{fontSize: '1rem'}">
            <b-checkbox v-model="aszf">
              Elfogadom az ÁSZF-et
            </b-checkbox>
          </b-field>
          <b-field :style="{fontSize: '1rem'}">
            <b-checkbox v-model="adatvedelem">
              Hozzájárulok adataim kezeléséhez
            </b-checkbox>
          </b-field>
          <hr>
          <div class="field">
            <div class="field-body">
              <div class="field columns">
                <button
                  type="submit"
                  class="button is-primary is-fullwidth"
                  :class="{'is-loading': isLoading}"
                >
                  Regisztráció
                </button>
              </div>
            </div>
          </div>
        </form>
      </card-component>
    </div>
  </section>
</template>

<script>
// import Tiles from '@/components/common/Tiles'
import CardComponent from '@/components/common/CardComponent'
export default {
  components: {
  //  Tiles,
    CardComponent
  },
  layout: 'unauthorized',
  data () {
    return {
      isLoading: false,
      email: '',
      password: '',
      password2: '',
      username: '',
      adatvedelem: false,
      aszf: false,
      formValid: false
    }
  },
  head () {
    return {
      title: 'Regisztráció'
    }
  },
  methods: {
    check () {
      if (this.password === this.password2 && this.adatvedelem && this.aszf) {
        this.formValid = true
      } else {
        alert('Minden mező kitöltése kötelező')
      }
    },
    async submit () {
      this.check()
      if (this.formValid) {
        this.isLoading = true
        try {
          await this.$strapi.register({
            email: this.email,
            password: this.password,
            username: this.username
          })
          this.isLoading = false

          this.$router.push('/login')
        } catch (err) {
          this.isLoading = false

          const error = (err && err.message) ? err.message : ''
          const message = (error === 'Identifier or password invalid.') ? 'Hibás email cím vagy jelszó' : 'Hiba történt'

          this.$buefy.toast.open({
            message,
            type: 'is-danger',
            queue: false
          })
        }
      }
    }
  }
}
</script>

<style>
</style>
