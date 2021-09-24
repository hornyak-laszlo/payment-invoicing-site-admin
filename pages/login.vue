<template>
  <section class="section hero is-fullheight is-error-section">
    <div class="hero-body">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-three-fifths">
            <div class="card has-card-header-background">
              <header class="card-header">
                <p class="card-header-title">
                  <span class="icon"><i class="mdi mdi-lock default" /></span>
                  <span>Belépés</span>
                </p>
              </header>
              <div class="card-content">
                <form @submit.prevent="submit">
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
                  <hr>
                  <div class="field">
                    <div class="field-body">
                      <div class="field columns">
                        <div class="column is-half">
                          <button
                            type="submit"
                            class="button is-fullwidth is-primary"
                            :class="{'is-loading': isLoading}"
                          >
                            Bejelentkezés
                          </button>
                        </div>
                        <div class="column is-half">
                          <nuxt-link
                            to="/forgot-password"
                            class="button is-fullwidth is-outlined is-primary-passive"
                            :class="{'is-loading': isLoading}"
                          >
                            Elfelejtett a jelszó
                          </nuxt-link>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  layout: 'unauthorized',
  data () {
    return {
      isLoading: false,
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapMutations(['setUser']),
    async submit () {
      this.isLoading = true
      try {
        const { user } = await this.$strapi.login({
          identifier: this.email,
          password: this.password
        })
        this.isLoading = false

        this.setUser(user)
        if (!user.company) {
          this.$router.push('/company')
        } else {
          this.$router.push('/')
        }

        this.$buefy.snackbar.open({
          message: 'Üdvözlünk a Deel-ben',
          queue: false,
          actionText: null,
          type: 'has-text-white has-background-primary',
          duration: 2000

        })
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
</script>

<style>
</style>
