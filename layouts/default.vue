<template>
  <div id="app">
    <nav-bar />
    <aside-menu :menu="menu" />
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
  computed: {
    menu () {
      return [
        'Értékesítés',
        [
          {
            to: '/purchase-forms',
            label: 'Űrlapok',
            icon: 'table'
          },
          {
            to: '/products',
            label: 'Termékek',
            icon: 'table'
          },
          {
            to: '/purchases',
            label: 'Vásárlások',
            icon: 'table'
          },
          {
            to: '/customers',
            label: 'Vásárlók',
            icon: 'table'
          }
        ],
        'Leadek',
        [
          {
            to: '/contact-forms',
            label: 'Űrlapok',
            icon: 'table'
          },
          {
            to: '/contacts',
            label: 'Kontaktok',
            icon: 'table'
          }
        ],
        'Integrációk',
        [
          {
            to: '/invoicing',
            label: 'Számlázó integráció',
            icon: 'table'
          },
          {
            to: '/payment',
            label: 'Fizetés integráció',
            icon: 'table'
          }
        ],
        'Demo',
        [
          {
            to: '/demo/forms',
            label: 'Form demo',
            icon: 'square-edit-outline'
          },
          {
            to: '/demo/client',
            label: 'Létrehozás form',
            icon: 'square-edit-outline'
          },
          {
            to: '/demo/client/48',
            label: 'Szerkesztés form',
            icon: 'square-edit-outline'
          },
          {
            to: '/profile',
            label: 'Profil',
            icon: 'account-circle'
          }
        ]
        /*
        'General',
        [
          {
            to: '/',
            icon: 'desktop-mac',
            label: 'Dashboard'
          }
        ],
        'Examples',
        [
          {
            action: 'dark-mode-toggle',
            label: 'Dark / White',
            icon: 'weather-night'
          },
          {
            to: '/tables',
            label: 'Tables',
            icon: 'table',
            updateMark: true
          },
          {
            to: '/forms',
            label: 'Forms',
            icon: 'square-edit-outline'
          },
          {
            to: '/profile',
            label: 'Profile',
            icon: 'account-circle'
          },
          {
            label: 'Submenus',
            subLabel: 'Submenus Example',
            icon: 'view-list',
            menu: [
              {
                href: '#void',
                label: 'Sub-item One'
              },
              {
                href: '#void',
                label: 'Sub-item Two'
              }
            ]
          }
        ]
        */
      ]
    }
  },
  created () {
    this.$store.commit('user', {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg'
    })
  },
  mounted () {
    document.documentElement.classList.add('has-aside-left')
    document.documentElement.classList.add('has-aside-mobile-transition')
    document.documentElement.classList.add('has-navbar-fixed-top')
    document.documentElement.classList.add('has-aside-expanded')
  }
}
</script>

<style>
</style>
