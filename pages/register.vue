<template>
  <section
    class="columns is-vcentered"
    style="height: 100vh"
  >
    <div class="column is-half is-offset-one-quarter">
      <card-component
        title="Regisztráció"
        icon="user-lock"
        class="title is-child"
      >
        <ValidationObserver v-slot="{ invalid }">
          <form @submit.prevent="submit">
            <b-field label="Felhasználó név">
              <ValidationProvider
                v-slot="{ errors }"
                name="felhasznaló név"
                rules="required|min:4|alpha_num"
              >
                <b-input
                  v-model="username"
                  type="text"
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>

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
                rules="required|confirmed:confirmation"
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
                vid="confirmation"
                name="jelszó megerősítése"
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
            <div class="field">
              <div class="field-body">
                <div class="field columns">
                  <button
                    type="submit"
                    class="button is-primary is-fullwidth"
                    :class="{'is-loading': isLoading}"
                    :disabled="invalid"
                  >
                    Regisztráció
                  </button>
                </div>
              </div>
            </div>
          </form>
        </ValidationObserver>
      </card-component>
    </div>
  </section>
</template>

<script>
import CardComponent from '@/components/common/CardComponent'
// import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full.esm'

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
      username: '',
      adatvedelem: false,
      aszf: false
    }
  },
  head () {
    return {
      title: 'Regisztráció'
    }
  },
  computed: {
  },
  methods: {

    async submit () {
      this.isLoading = true
      try {
        await this.$strapi.register({
          email: this.email,
          password: this.password,
          username: this.username
        })
        this.isLoading = false
        this.$buefy.toast.open({
          message: 'Sikeres Regisztráció',
          type: 'is-success',
          queue: false
        })

        this.$router.push('/login')
      } catch (err) {
        this.isLoading = false

        // const error = (err && err.message) ? err.message : ''
        // const message = (error === 'Identifier or password invalid.') ? 'Hibás email cím vagy jelszó' : 'Hiba történt'

        // console.log(err)
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
