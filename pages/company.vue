<template>
  <div>
    <hero-bar>
      Cégadatok
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component
          title="Cég"
          icon="building"
          class="tile is-child"
        >
          <ValidationObserver v-slot="{ invalid }">
            <form @submit.prevent="submit">
              <b-field
                label="Név"
                message="A cég neve"
                horizontal
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Név"
                  rules="required"
                >
                  <b-input
                    v-model="company.name"
                    placeholder="Cégnév"
                    required
                  />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
              <b-field
                label="Email"
                message="A cég e-mail címe"
                horizontal
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <b-input
                    v-model="company.email"
                    type="email"
                    required
                  />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>

              <b-field
                label="Telefonszám"
                message="Kapcsolattartó telefonszáma"
                horizontal
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Telefonszám"
                  rules="required"
                >
                  <b-input
                    v-model="company.phoneNumber"
                    required
                  />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
              <b-field
                label="Székhely"
                message="A cég székhelye"
                horizontal
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Ország"
                  rules="required"
                >
                  <b-input
                    v-model="company.country"
                    placeholder="Ország"
                    required
                  />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>

                <ValidationProvider
                  v-slot="{ errors }"
                  name="Irányítószám"
                  rules="required"
                >
                  <b-input
                    v-model="company.zip"
                    placeholder="Irányítószám"
                    required
                    type="number"
                  />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>

                <ValidationProvider
                  v-slot="{ errors }"
                  name="Város"
                  rules="required"
                >
                  <b-input
                    v-model="company.city"
                    placeholder="Város"
                    required
                  />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>

                <ValidationProvider
                  v-slot="{ errors }"
                  name="Utca és házszám"
                  rules="required"
                >
                  <b-input
                    v-model="company.streetNo"
                    placeholder="Utca és házszám"
                    required
                  />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>

              <b-field
                label="Bankszámla"
                message="A cég bankszámlaszáma"
                horizontal
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Bankszámlaszám"
                  rules="required"
                >
                  <b-input
                    v-model="company.bankAccountNumber"
                    required
                  />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>

              <b-field
                label="Vállalkozás formája"
                message="Cég, egyéni vállalkozó vagy magánszemély"
                horizontal
              >
                <ValidationProvider
                  v-slot="{ errors }"
                  name="Vállalkozás formája"
                  rules="required"
                >
                  <b-select
                    v-model="company.formOfEnterprise "
                    required
                  >
                    <option value="company">
                      Cég
                    </option>
                    <option value="self_employed">
                      Egyéni vállalkozó
                    </option>
                    <option value="private_person">
                      Magánszemély
                    </option>
                  </b-select>
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>

              <b-field
                v-if="company.formOfEnterprise === 'self_employed'"
                label="Nyilvántartási szám"
                message="Egyéni vállalkozó nyilvántartási száma (opcionális)"
                horizontal
              >
                <b-input v-model="company.registrationNumber" />
              </b-field>
              <b-field
                v-if="company.formOfEnterprise === 'company'"
                label="Cégjegyzék szám"
                message="Cég nyilvántartási száma (opcionális)"
                horizontal
              >
                <b-input v-model="company.companyRegistrationNumber" />
              </b-field>
              <b-field
                label="SWIFT szám"
                message="SWIFT szám utaláshoz (opcionális)"
                horizontal
              >
                <b-input v-model="company.companyRegistrationNumber" />
              </b-field>

              <b-field
                label="IBAN szám"
                message="IBAN szám utaláshoz (opcionális)"
                horizontal
              >
                <b-input v-model="company.companyRegistrationNumber" />
              </b-field>

              <hr>
              <b-field horizontal>
                <b-button
                  type="is-primary"
                  :loading="isLoading"
                  native-type="submit"
                  expanded
                  :disabled="invalid"
                >
                  Mentés
                </b-button>
              </b-field>
            </form>
          </ValidationObserver>
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
  name: 'Company',
  components: {
    Tiles,
    HeroBar,
    CardComponent
  },
  data () {
    return {
      company: {
        name: '',
        taxNumber: '',
        bankAccountNumber: '',
        phoneNumber: '',
        email: '',
        formOfEnterprise: '',
        city: '',
        zip: '',
        streetNo: '',
        country: '',
        companyRegistrationNumber: '',
        registrationNumber: '',
        swift: '',
        iban: ''
      },
      isLoading: false
    }
  },
  head () {
    return {
      title: 'Cégadatok'
    }
  },
  computed: {
  },
  async mounted () {
    try {
      if (this.$strapi.user) {
        const companyId = (typeof this.$strapi.user.company === 'number') ? this.$strapi.user.company : this.$strapi.user.company.id
        const company = await this.$strapi.findOne('companies', companyId)
        this.company = {
          name: company.name,
          taxNumber: company.taxNumber
        }
      }
    } catch (err) {
      this.$buefy.toast.open({
        message: 'Nem sikerült betölteni a cég adatait',
        type: 'is-danger'
      })
    }
  },

  methods: {
    async submit () {
      try {
        this.isLoading = true

        await this.$strapi.update('companies', this.$strapi.user.company.id, this.company)

        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Sikeresen mentve',
          queue: false
        })
        this.$router.push('/purchases')
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
