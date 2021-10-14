export const state = () => ({
  /* Strapi user */
  user: null,
  // ownCompany: null,

  /* NavBar */
  isNavBarVisible: true,

  /* FooterBar */
  isFooterBarVisible: true,

  /* Aside */
  isAsideVisible: true,
  isAsideMobileExpanded: false
})

export const getters = {
  username (state) {
    return state.user ? state.user.username : ''
  },
  email (state) {
    return state.user ? state.user.email : ''
  },
  role (state) {
    return state.user ? state.user.role.name : ''
  },
  taxNumber (state) {
    return state.user && state.user.company ? state.user.company.taxNumber : ''
  },
  logo (state) {
    return state.user && state.user.company ? state.user.company.logo : ''
  }
}

export const mutations = {
  /* Strapi user */
  setUser (state, payload) {
    state.user = payload
  },

  setCompany (state, payload) {
    if (!state.user) {
      return
    }

    state.user.company = payload
  },

  /* Aside Mobile */
  asideMobileStateToggle (state, payload = null) {
    const htmlClassName = 'has-aside-mobile-expanded'

    let isShow

    if (payload !== null) {
      isShow = payload
    } else {
      isShow = !state.isAsideMobileExpanded
    }

    if (isShow) {
      document.documentElement.classList.add(htmlClassName)
    } else {
      document.documentElement.classList.remove(htmlClassName)
    }

    state.isAsideMobileExpanded = isShow
  }
}
