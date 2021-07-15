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
              v-model="email"
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
      password: ''
    }
  },
  head () {
    return {
      title: 'Regisztráció'
    }
  }
}
</script>

<style>
</style>
