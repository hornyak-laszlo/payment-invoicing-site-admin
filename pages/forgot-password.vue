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
                  <span>Elfelejtett jelszó</span>
                </p>
              </header>
              <div class="card-content">
                <form @submit.prevent="submit">
                  <b-field label="Email cím">
                    <b-input v-model="email" type="email" required />
                  </b-field>
                  <hr>
                  <div class="field">
                    <div class="field-body">
                      <div class="field columns">
                        <div class="column is-half">
                          <button type="submit" class="button is-fullwidth is-primary" :class="{'is-loading': isLoading}">
                            Jelszó visszaállítása
                          </button>
                        </div>
                        <div class="column is-half">
                          <nuxt-link to="/login" class="button is-fullwidth is-outlined is-primary-passive" :class="{'is-loading': isLoading}">
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
      email: ''
    }
  },
  methods: {
    async submit () {
      this.isLoading = true
      try {
        await this.$strapi.forgotPassword({
          email: this.email
        })
        this.isLoading = false

        this.$buefy.toast.open({
          message: 'A jelszavad visszaállításához szükséges linket elküldtük az email címedre',
          type: 'is-success',
          queue: false
        })

        this.$router.push('/login')
      } catch (err) {
        this.isLoading = false

        this.$buefy.toast.open({
          message: 'A jelszavad visszaállításához szükséges linket elküldtük az email címedre',
          type: 'is-success',
          queue: false
        })

        this.$router.push('/login')
      }
    }
  }
}
</script>

<style>
</style>
