import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import { required, min, email } from 'vee-validate/dist/rules'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('required', {
  ...required,
  message: 'A {_field_} kitöltése kötelező'
})
extend('min', {
  ...min,
  message: (fieldName, params) => {
    return `A ${fieldName} mezőnek legalább ${params.length} karaktert kell tartalmaznia`
  }
})
extend('email', {
  ...email,
  message: 'Érvényes email email címet kell megadni'
})
