<template>
  <div>
    <hero-bar>
      Vásárló szerkesztése
      <nuxt-link
        slot="right"
        to="/customers"
        class="button"
      >
        Vissza a vásárlókhoz
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="tile is-child"
        :title="`Vásárló - ID: ${$route.params.id}`"
        icon="user-tag"
      >
        <form @submit.prevent="submit">
          <b-field
            label="Email cím"
            message="A kontakt email címe"
            horizontal
          >
            <b-input
              :value="customer.email"
              custom-class="is-static"
              readonly
            />
          </b-field>

          <b-field
            label="Tag"
            message="tag"
            horizontal
          >
            <b-input
              v-model="customer.tag"
              required
            />
          </b-field>

          <hr>
          <b-field horizontal>
            <b-button
              type="is-primary"
              :loading="isLoading"
              native-type="submit"
              expanded
            >
              Mentés
            </b-button>
          </b-field>
        </form>
      </card-component>
    </section>
  </div>
</template>

<script>

import HeroBar from '@/components/common/HeroBar'
import CardComponent from '@/components/common/CardComponent'

export default {

  components: {
    HeroBar,
    CardComponent
  },
  data () {
    return {
      isLoading: false,
      collection: 'customers',
      customer: this.getClearFormObject()
    }
  },
  head () {
    return {
      title: 'Vásárló szerkesztése'
    }
  },
  computed: {

  },
  async mounted () {
    this.customer = await this.getData()
  },
  methods: {
    getClearFormObject () {
      return {
        tag: '',
        email: '',
        purchases: []
      }
    },

    async getData () {
      if (this.$route.params.id) {
        try {
          const res = await this.$strapi.findOne(this.collection, this.$route.params.id)
          return res
        } catch (err) {
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger',
            queue: false
          })
        }
      }
    },
    async submit () {
      try {
        this.isLoading = true

        await this.$strapi.update(this.collection, parseInt(this.$route.params.id), this.customer)

        this.isLoading = false
        // alternative success message
        /* this.$buefy.toast.open({
          message: 'Sikeresen mentve',
          type: 'is-primary'
          queue: false
        }) */
        this.$buefy.snackbar.open({
          message: 'Sikeresen mentve',
          type: 'is-white has-text-white has-background-primary',
          queue: false
        })
        this.$router.push('/customers')
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

<style>
</style>
