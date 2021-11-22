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
                  <span>Jelszó beállítása</span>
                </p>
              </header>
              <div class="card-content">
                <form @submit.prevent="submit">
                  <b-field label="Jelszó">
                    <b-input
                      v-model="password"
                      type="password"
                      required
                    />
                  </b-field>
                  <b-field label="Jelszó megerősítése">
                    <b-input
                      v-model="passwordConfirmation"
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
                            Mentés
                          </button>
                        </div>
                        <div class="column is-half">
                          <nuxt-link
                            to="/login"
                            class="button is-fullwidth is-outlined is-primary-passive"
                            :class="{'is-loading': isLoading}"
                          >
                            Vissza
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
export default {
  layout: 'unauthorized',
  data () {
    return {
      isLoading: false,
      password: '',
      passwordConfirmation: ''
    }
  },
  head () {
    return {
      title: 'DeelPay jelszó visszaállítás'
    }
  },
  methods: {
    async submit () {
      this.isLoading = true
      try {
        await this.$strapi.resetPassword({
          code: this.$route.query.code,
          password: this.password,
          passwordConfirmation: this.passwordConfirmation
        })
        this.isLoading = false

        this.$buefy.toast.open({
          message: 'A jelszavad sikeresen elmentettük!',
          type: 'is-success',
          queue: false
        })

        this.$router.push('/login')
      } catch (err) {
        this.isLoading = false

        this.$buefy.toast.open({
          message: 'Nem sikerült elmenteni a jelszavad',
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
