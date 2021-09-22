<template>
  <b-modal
    :active="true"
    :can-cancel="false"
    has-modal-card
  >
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          Alap adatok megadása
        </p>
      </header>
      <ValidationObserver v-slot="{ invalid }">
        <form @submit.prevent="submit">
          <section class="modal-card-body">
            <b-field label="Alap adatok" />
            <b-field
              label="Név"
              message="A cég neve"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="Név"
                rules="required"
              >
                <b-input
                  v-model="name"
                  placeholder="Cégnév"
                  required
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>
            <b-field
              label="Email"
              message="A cég e-mail címe"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="Email"
                rules="required|email"
              >
                <b-input
                  v-model="email"
                  type="email"
                  required
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>
          </section>
          <footer class="modal-card-foot">
            <b-button
              type="is-primary"
              :loading="isLoading"
              expanded
              :disabled="invalid"
              @click="submit"
            >
              Mentés
            </b-button>
          </footer>
        </form>
      </ValidationObserver>
    </div>
  </b-modal>
</template>

<script>

export default {
  name: 'CreateCompanyModal',
  data () {
    return {
      name: '',
      email: '',
      isLoading: false
    }
  },
  methods: {
    async submit () {
      try {
        this.isLoading = true
        await this.$strapi.create('companies', {
          name: this.name,
          email: this.email
        })

        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Sikeresen mentve',
          queue: false
        })
        this.$router.push('/')
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
