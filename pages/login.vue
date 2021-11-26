<template>
  <section
    class="columns is-vcentered"
    style="height: 100vh"
  >
    <div class="column is-4 is-offset-one-third">
      <card-component
        title="Belépés"
        icon="user-lock"
        class="title is-child"
      >
        <ValidationObserver v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <b-field label="Email cím">
              <ValidationProvider
                v-slot="{ errors }"
                name="email"
                rules="required|email"
              >
                <b-input
                  v-model="email"
                  type="text"
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>

            <b-field label="Jelszó">
              <ValidationProvider
                v-slot="{ errors }"
                name="jelszó"
                rules="required"
              >
                <b-input
                  v-model="password"
                  type="password"
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>

            <hr>

            <div>
              <button
                type="submit"
                class="button is-primary is-fullwidth"
                :class="{'is-loading': isLoading}"
                :disabled="invalid"
              >
                Bejelentkezés
              </button>
              <div class="mt-4">
                <nuxt-link
                  to="/register"
                  class="button is-fullwidth is-outlined is-primary-passive"
                  :class="{'is-loading': isLoading}"
                >
                  Fiók létrehozása
                </nuxt-link>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </card-component>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'
import CardComponent from '@/components/common/CardComponent'

export default {
  components: {
    CardComponent
  },
  layout: 'unauthorized',
  data () {
    return {
      isLoading: false,
      email: '',
      password: ''
    }
  },
  head () {
    return {
      title: 'DeelPay login'
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

        const error = err && err.message ? err.message : ''
        const message =
          error === 'Identifier or password invalid.'
            ? 'Hibás email cím vagy jelszó'
            : 'Hiba történt'

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
