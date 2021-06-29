<template>
  <div>
    <hero-bar>
      Profil
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component title="Profil" icon="id-card" class="tile is-child">
          <b-field label="Felhasználónév">
            <b-input :value="username" custom-class="is-static" readonly />
          </b-field>
          <b-field label="Email cím">
            <b-input :value="email" custom-class="is-static" readonly />
          </b-field>
          <b-field label="Jogosultság">
            <b-input :value="role" custom-class="is-static" readonly />
          </b-field>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import CardComponent from '@/components/common/CardComponent'
import HeroBar from '@/components/common/HeroBar'
import Tiles from '@/components/common/Tiles'

export default {
  name: 'Profile',
  components: {
    Tiles,
    HeroBar,
    CardComponent
  },
  data () {
    return {
    }
  },
  head () {
    return {
      title: 'Profil'
    }
  },
  computed: {
    username () {
      return this.$strapi.user ? this.$strapi.user.username : ''
    },
    email () {
      return this.$strapi.user ? this.$strapi.user.email : ''
    },
    role () {
      return this.$strapi.user ? this.$strapi.user.role.name : ''
    }
  }
}
</script>
