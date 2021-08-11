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
        <form @submit.prevent="submit">
          <b-field label="Felhasználó név">
            <ValidationObserver>
              <ValidationProvider
                v-slot="{ errors }"
                name="felhasznaló név"
                rules="required|min:4"
              >
                <b-input
                  v-model="username"
                  type="text"
                  required
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </ValidationObserver>
          </b-field>
          <p
            v-if="!userValid"
            class="has-text-danger is-size-7"
          >
            Legalább 3 karakter hosszú felhasználó nevet kell beírni!
          </p>
          <b-field label="Email cím">
            <b-input
              v-model="email"
              type="email"
              required
            />
          </b-field>
          <p
            v-if="!emailValid"
            class="has-text-danger is-size-7"
          >
            Érvényes email címet kell megadni!
          </p>
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
          <p
            v-if="!pwValid"
            class="has-text-danger is-size-7"
          >
            A két jelszónak meg kell egyeznie!
          </p>
          <hr>
          <b-field class="is-size-6">
            <b-checkbox v-model="aszf">
              Elfogadom az <a
                href="https://deel.hu/aszf"
                target="_blank"
              >ÁSZF</a>-et
            </b-checkbox>
          </b-field>
          <b-field class="is-size-6">
            <b-checkbox v-model="adatvedelem">
              Elfogadom az <a
                href="https://deel.hu/adatvedelmi-nyilatkozat"
                target="_blank"
              > Adatvédelmi nyilatkozatban </a> foglaltakat
            </b-checkbox>
          </b-field>
          <p
            v-if="!formValid"
            class="has-text-danger is-size-7"
          >
            Az aszf-et és az adatvédelmit is el kell fogadni!
          </p>
          <hr>
          <div class="field">
            <div class="field-body">
              <div class="field columns">
                <button
                  type="submit"
                  class="button is-primary is-fullwidth"
                  :class="{'is-loading': isLoading}"
                  :disabled="!sendValid"
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
import CardComponent from '@/components/common/CardComponent'
// import { ValidationProvider, ValidationObserver } from 'vee-validate/dist/vee-validate.full.esm'

export default {
  components: {
    CardComponent
    /* ValidationProvider,
    ValidationObserver */
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

    userValid () {
      return this.username.length > 2
    },

    pwValid () {
      return (this.password.length > 0 && this.password === this.password2)
    },
    formValid () {
      return (this.adatvedelem && this.aszf)
    },
    emailValid () {
      const reg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i
      return reg.test(this.email)
    },
    sendValid () {
      return (this.emailValid && this.formValid && this.pwValid)
    }
  },
  methods: {

    async submit () {
      if (this.sendValid) {
        this.allValid = true
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
}
</script>

<style>
</style>
