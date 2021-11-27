<template>
  <section
    class="columns is-vcentered"
    style="height: 100vh"
  >
    <div class="column is-4 is-offset-one-third">
      <card-component
        title="Regisztráció"
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
                vid="confirmation"
              >
                <b-input
                  v-model="password"
                  type="password"
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>
            <b-field label="Jelszó megerősítése">
              <ValidationProvider
                v-slot="{ errors }"
                name="jelszó megerősítése"
                rules="required|confirmed:confirmation"
              >
                <b-input
                  v-model="password2"
                  type="password"
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>

            <hr>
            <b-field class="is-size-6">
              <ValidationProvider
                v-slot="{ errors }"
                name="ÁSZF"
                :rules="{required: {allowFalse: false}}"
              >
                <b-checkbox v-model="aszf">
                  Elfogadom az <a
                    href="https://deel.hu/aszf"
                    target="_blank"
                  >ÁSZF</a>-et
                </b-checkbox>
                <p class="has-text-danger is-size-7">
                  {{ errors[0] }}
                </p>
              </ValidationProvider>
            </b-field>
            <b-field class="is-size-6">
              <ValidationProvider
                v-slot="{ errors }"
                name="ÁSZF"
                :rules="{required: {allowFalse: false}}"
              >
                <b-checkbox v-model="adatvedelem">
                  Elfogadom az <a
                    href="https://deel.hu/adatvedelmi-nyilatkozat"
                    target="_blank"
                  > Adatvédelmi nyilatkozatban </a> foglaltakat
                </b-checkbox>
                <p class="has-text-danger is-size-7">
                  {{ errors[0] }}
                </p>
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
                Regisztráció
              </button>
            </div>
            <div class="has-text-centered">
              <nuxt-link
                to="/login"
                class="is-size-6"
              >
                Van fiókom, belépek
              </nuxt-link>
            </div>
          </form>
        </ValidationObserver>
      </card-component>
    </div>
  </section>
</template>

<script>
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
      password: '',
      password2: '',
      adatvedelem: false,
      aszf: false
    }
  },
  head () {
    return {
      title: 'DeelPay regisztráció'
    }
  },
  computed: {},
  methods: {
    async submit () {
      this.isLoading = true
      try {
        await this.$strapi.register({
          email: this.email,
          password: this.password,
          username: this.email
        })

        this.isLoading = false
        this.$buefy.toast.open({
          message: 'Sikeres Regisztráció',
          type: 'is-success',
          queue: false
        })

        this.$router.push('/confirm')
      } catch (err) {
        this.isLoading = false
        this.$buefy.toast.open({
          message: `${err.message} error code: ${err.statusCode}`,
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
