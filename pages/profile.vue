
<template>
  <div>
    <hero-bar>
      <b-icon
        pack="fas"
        icon="id-card"
        size="is-small"
        style="margin: 1rem"
      /> Profil
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component class="tile is-child">
          <b-field label="Felhasználónév">
            <b-input
              :value="username"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field label="Email cím">
            <b-input
              :value="email"
              custom-class="is-static"
              readonly
            />
          </b-field>
          <b-field label="Jogosultság">
            <b-input
              :value="role"
              custom-class="is-static"
              readonly
            />
          </b-field>
        </card-component>
      </tiles>
      <tiles>
        <card-component
          title="Új Jelszó Beállítása"
          icon="key"
          class="tile is-child"
        >
          <form>
            <ValidationObserver v-slot="{invalid}">
              <b-field label="Régi jelszó">
                <b-input
                  v-model="password"
                  type="password"
                />
              </b-field>
              <b-field label="Új jelszó">
                <ValidationProvider
                  v-slot="{ errors }"
                  name="jelszó"
                  rules="required|confirmed:confirmation"
                >
                  <b-input
                    v-model="newPassword"
                    type="password"
                  />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>
              <b-field label="Jelszó megerősítése">
                <ValidationProvider
                  v-slot="{ errors }"
                  vid="confirmation"
                  name="jelszó megerősítése"
                >
                  <b-input
                    v-model="newPasswordConfirmation"
                    type="password"
                  />
                  <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
                </ValidationProvider>
              </b-field>

              <b-button
                type="is-primary is-outlined is-light"
                :loading="isLoading"
                :disabled="invalid"
                @click="changePassword"
              >
                Jelszó módosítása
              </b-button>
            </ValidationObserver>
          </form>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      password: '',
      newPassword: '',
      newPasswordConfirmation: '',
      isLoading: false
    }
  },
  head () {
    return {
      title: 'DeelPay profil'
    }
  },
  computed: {
    ...mapGetters(['username', 'email', 'role'])
  },
  methods: {
    async changePassword () {
      try {
        this.isLoading = true
        const data = {
          password: this.password,
          newPassword: this.newPassword,
          newPasswordConfirmation: this.newPasswordConfirmation
        }

        await this.$strapi.create('password', data)

        this.isLoading = false
        this.$buefy.toast.open({
          message: 'A jelszavad sikeresen elmentettük!',
          type: 'is-success',
          queue: false
        })

        this.password = ''
        this.newPassword = ''
        this.newPasswordConfirmation = ''
      } catch (error) {
        this.isLoading = false
        this.$buefy.toast.open({
          message: 'Nem sikerült elmenteni a jelszavad',
          type: 'is-danger',
          queue: false
        })
      }
    }
  }
}
</script>
