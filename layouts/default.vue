<template>
  <div id="app">
    <nav-bar />
    <aside-menu :menu="menu" />
    <article
      v-if="!taxNumber"
      class="message is-danger"
    >
      <div class="message-body">
        A rendszer teljeskörű használatához <strong>ki kell töltened a cégadatokat!</strong>
        <nuxt-link to="/company">
          Kitöltés
        </nuxt-link>
      </div>
    </article>
    <nuxt />
    <footer-bar />
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/navbar/NavBar'
import AsideMenu from '@/components/sidebar/AsideMenu'
import FooterBar from '@/components/footer/FooterBar'

export default {
  name: 'App',
  components: {
    FooterBar,
    AsideMenu,
    NavBar
  },
  middleware: 'auth',
  data () {
    return {
      company: {
        name: '',
        taxNumber: '',
        bankAccountNumber: '',
        phoneNumber: '',
        email: '',
        notificationEmail: '',
        websiteLink: '',
        formOfEnterprise: '',
        city: '',
        zip: '',
        streetNo: '',
        country: '',
        companyRegistrationNumber: '',
        registrationNumber: '',
        swift: '',
        iban: ''
      }

    }
  },
  computed: {
    taxNumber () {
      return !!this.company.taxNumber
    },
    menu () {
      return [
        'Ügyfelek',
        [
          {
            to: '/',
            label: 'Dashboard',
            icon: 'chart-line'
          },
          {
            to: '/contacts',
            label: 'Kontaktok',
            icon: 'user'
          },
          {
            to: '/customers',
            label: 'Vásárlók',
            icon: 'user-tag'
          },
          {
            to: '/purchases',
            label: 'Vásárlások',
            icon: 'shopping-basket'
          }
        ],
        'Szerkesztés',
        [
          {
            to: '/products',
            label: 'Termékek',
            icon: 'tags'
          },
          {
            to: '/forms',
            label: 'Űrlapok',
            icon: 'columns'
          }
        ],
        'Beállítások',
        [
          {
            to: '/integrations',
            label: 'Integrációk',
            icon: 'key'
          },
          {
            to: '/documents',
            label: 'Jogi dokumentumok',
            icon: 'gavel'
          },
          {
            to: '/profile',
            label: 'Profil',
            icon: 'id-card'
          },
          {
            to: '/company',
            label: 'Cégadatok',
            icon: 'building'
          }
        ]
      ]
    }
  },
  async mounted () {
    document.documentElement.classList.add('has-aside-left')
    document.documentElement.classList.add('has-aside-mobile-transition')
    document.documentElement.classList.add('has-navbar-fixed-top')
    document.documentElement.classList.add('has-aside-expanded')
    try {
      this.company = await this.$strapi.$http.$get('/companies/own/data')
      console.log(this.company.name)
      if (this.company.taxNumber === '') {
        this.$buefy.snackbar.open({
          message: 'Mielőtt a rendszert teljeskörűen használhatnád, <br> <em>ki kell töltened a cégadatokat</em>',
          type: 'is-success',

          position: 'is-top-right',
          actionText: 'Kitöltés',
          indefinite: true,
          onAction: () => {
            this.$router.push('/company')
          }
        })
      }
    } catch (err) {
      console.error('Nem sikerült betölteni a cég adatait')
    }
  }

}
</script>

<style>
</style>
