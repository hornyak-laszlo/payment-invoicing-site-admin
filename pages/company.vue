<template>
  <div>
    <hero-bar>
      <b-icon
        pack="fas"
        icon="building"
        size="is-small"
        style="margin: 1rem"
      />
      Cégadatok
    </hero-bar>
    <section class="section is-main-section">
      <ValidationObserver v-slot="{ invalid }">
        <form @submit.prevent="submit">
          <card-component
            title="Alap adatok"
            class="title is-child"
          >
            <b-field
              label="Logo"
              message="A cég logója"
            >
              <b-upload
                v-if="!logo"
                v-model="logo"
                drag-drop
                expanded
                accept="image/*"
              >
                <div class="content has-text-centered">
                  <p>
                    <b-icon
                      icon="upload"
                      size="is-large"
                    />
                  </p>
                  <p>Húzd ide a logodat, vagy kattints a feltöltéshez</p>
                </div>
              </b-upload>
              <div v-else>
                <span
                  v-if="!logo.url"
                  class="is-size-5 has-text-weight-normal"
                >
                  {{ logo.name }} kiválasztva feltöltésre
                </span>
                <div v-else>
                  <figure
                    class="image"
                    style="margin: 1rem 0 1rem 50%; transform: translateX(-50%); max-width: 50%; width: 256px"
                  >
                    <img
                      alt="logo"
                      :src="logo.url"
                    >
                  </figure>
                  <b-button
                    type="is-danger"
                    style="margin-left: 50%; transform: translateX(-50%)"
                    size="is-small"
                    @click="logo = null"
                  >
                    Törlés
                  </b-button>
                </div>
              </div>
            </b-field>
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
                  v-model="company.name"
                  placeholder="Cégnév"
                  required
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>
            <b-field
              label="URL prefix"
              message="Az azonosító ami az űrlap neve előtt megjelenik a címsorban"
            >
              <b-input v-model="company.urlPrefix" />
            </b-field>

            <b-field
              label="URL prefix előnézet"
              message="Ez fog a címsorban megjelenni"
            >
              <b-input
                :value="slugPrefix"
                readonly
              />
            </b-field>

            <b-field label="Székhely" />
            <b-field grouped>
              <b-field
                expanded
                label="Ország"
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
              </b-field>

              <b-field
                expanded
                label="Ir. szám"
              >
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
              </b-field>

              <b-field
                expanded
                label="Város"
              >
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
              </b-field>

              <b-field
                expanded
                label="Utca, házszám"
              >
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
            </b-field>

            <b-field
              label="Vállalkozás formája"
              message="Cég, egyéni vállalkozó vagy magánszemély"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="Vállalkozás formája"
                rules="required"
              >
                <b-select
                  v-model="company.formOfEnterprise "
                  required
                  expanded
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
              label="Adószám"
              message="A vállalkozás adószáma"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="Adószám"
                rules="required|min:4"
              >
                <b-input
                  v-model="company.taxNumber"
                  required
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>

            <b-field
              v-if="company.formOfEnterprise === 'self_employed'"
              label="Nyilvántartási szám"
              message="Egyéni vállalkozó nyilvántartási száma (opcionális)"
            >
              <b-input v-model="company.registrationNumber" />
            </b-field>
            <b-field
              v-if="company.formOfEnterprise === 'company'"
              label="Cégjegyzék szám"
              message="Cég nyilvántartási száma (opcionális)"
            >
              <b-input v-model="company.companyRegistrationNumber" />
            </b-field>
          </card-component>

          <card-component
            title="Kapcsolattartási adatok"
            class="title is-child"
          >
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
                  v-model="company.email"
                  type="email"
                  required
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>
            <b-field
              label="Értesítési email"
              message="Értesítési email cím"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="Értesítési email"
                rules="required|email"
              >
                <b-input
                  v-model="company.notificationEmail"
                  type="email"
                  required
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>
            <b-field
              label="Weboldal"
              message="A cég weboldalának linkje"
            >
              <ValidationProvider
                v-slot="{ errors }"
                name="Weboldal"
                rules="required"
              >
                <b-input
                  v-model="company.websiteLink"
                  type="text"
                  required
                />
                <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
              </ValidationProvider>
            </b-field>
            <b-field
              label="Telefonszám"
              message="Kapcsolattartó telefonszáma"
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
          </card-component>

          <card-component
            title="Bankszámla adatok"
            class="title is-child"
          >
            <b-field
              label="Bankszámla"
              message="A cég bankszámlaszáma"
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
              label="SWIFT szám"
              message="SWIFT szám utaláshoz (opcionális)"
            >
              <b-input v-model="company.swift" />
            </b-field>
            <b-field
              label="IBAN szám"
              message="IBAN szám utaláshoz (opcionális)"
            >
              <b-input v-model="company.iban" />
            </b-field>

            <hr>
            <b-field>
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
          </card-component>
        </form>
      </ValidationObserver>
    </section>
    <create-company-modal v-if="!companyDataFound" />
  </div>
</template>

<script>
import slugify from 'slugify'
import { mapMutations, mapGetters } from 'vuex'
import CardComponent from '@/components/common/CardComponent'
import HeroBar from '@/components/common/HeroBar'
import CreateCompanyModal from '@/components/CreateCompanyModal.vue'
/* import Tiles from '@/components/common/Tiles' */

export default {
  name: 'Company',
  components: {
    /* Tiles, */
    CreateCompanyModal,
    HeroBar,
    CardComponent
  },
  data () {
    return {
      companyDataFound: true,

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
        iban: '',
        urlPrefix: ''
      },
      isLoading: false
    }
  },
  head () {
    return {
      title: 'DeelPay cégadatok'
    }
  },
  computed: {
    ...mapGetters({
      logoFromStore: 'logo'
    }),
    logo: {
      get () {
        return this.logoFromStore
      },
      set (value) {
        this.$store.commit('setLogo', value)
      }
    },
    slugPrefix () {
      const link = slugify(this.company.urlPrefix, {
        lower: true
      })

      return `/${link}`
    }
  },
  async mounted () {
    try {
      this.company = await this.$strapi.$http.$get('/companies/own/data')
      this.logo = this.company.logo
    } catch (err) {
      if (
        err &&
        err.response.data &&
        err.response.data.message &&
        err.response.data.message ===
          'Your account does not belong to any company!'
      ) {
        this.companyDataFound = false
      } else {
        this.$buefy.toast.open({
          message: 'Nem sikerült betölteni a cég adatait',
          type: 'is-danger'
        })
      }
    }
  },

  methods: {
    ...mapMutations(['setCompany']),
    async submit () {
      try {
        this.isLoading = true

        const formData = new FormData()
        formData.append('data', JSON.stringify(this.company))
        formData.append('files.logo', this.logo)

        const companyUpd = await this.$strapi.$http.$put(
          '/companies/own/data',
          formData
        )
        this.setCompany(companyUpd)

        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Sikeresen mentve',
          queue: false
        })
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
