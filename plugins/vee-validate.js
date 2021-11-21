import Vue from 'vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
// eslint-disable-next-line
import { required, min, email, alpha_num, confirmed, regex } from 'vee-validate/dist/rules'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('required', {
  ...required,
  message: 'Ennek a mezőnek a kitöltése kötelező'
})
extend('min', {
  ...min,
  message: (fieldName, params) => {
    return `A ${fieldName} mezőnek legalább ${params.length} karaktert kell tartalmaznia`
  }
})
extend('email', {
  ...email,
  message: 'Érvényes {_field_} címet kell megadni'
})
extend('alpha_num', {
  // eslint-disable-next-line
  ...alpha_num,
  message: 'A {_field_} csak alfanumerikus karaktereket tartalmazhat'
})
extend('confirmed', {
  ...confirmed,
  message: 'A két jelszó nem egyezik'
})
extend('regex', {
  ...regex,
  message: 'A {_field_} csak érvényes URL lehet'
})
