<template>
  <div>
    <hero-bar>
      <b-icon
        pack="fas"
        icon="columns"
        size="is-small"
        style="margin: 1rem"
      /> Űrlap szerkesztése, ID: {{ contactForm.id }}
      <nuxt-link
        slot="right"
        to="/forms"
        class="button is-primary"
      >
        Vissza az űrlapokhoz
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component>
        <form @submit.prevent="submit">
          <b-field
            label="Név"
            message="Űrlap neve"
          >
            <b-input
              v-model="contactForm.name"
              required
            />
          </b-field>
          <b-field>
            <b-field
              label="Link"
              expanded
              message="Link ahol elérhető lesz az űrlap"
            >
              <b-input
                :value="slugLink"
                required
                readonly
              />
            </b-field>
          </b-field>
          <b-field
            label="Köszönő link vagy szöveg"
            message="Köszönet az űrlap kitöltése után"
          />

          <b-field>
            <b-radio
              v-model="thanksType"
              native-value="link"
              size="is-medium"
              style="font-size: 1rem"
            >
              Linket adok meg
            </b-radio>
            <b-radio
              v-model="thanksType"
              native-value="text"
              size="is-medium"
              style="font-size: 1rem"
            >
              Szöveget adok meg
            </b-radio>
          </b-field>

          <b-field v-if="thanksType === 'link'">
            <ValidationProvider
              v-slot="{errors}"
              name="link"
              :rules="{ regex: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/ }"
            >
              <b-input
                v-model="
                  contactForm.successLink"
                required
              />
              <span class="has-text-danger is-size-7">{{ errors[0] }}</span>
            </ValidationProvider>
          </b-field>

          <b-field v-if="thanksType === 'text'">
            <client-only>
              <quill-editor
                ref="editor"
                v-model="contactForm.successText"
                :options="editorOption"
              />
            </client-only>
          </b-field>

          <b-field label="Űrlap promociós tartalom">
            <client-only>
              <quill-editor
                ref="editor"
                v-model="contactForm.promotionText"
                :options="editorOption"
              />
            </client-only>
          </b-field>

          <b-field label="Feliratkozás a hírlevélre">
            <b-checkbox v-model="contactForm.newsletterCheckbox">
              Legyen feliratkozás a hírlevélre lehetőség
            </b-checkbox>
          </b-field>
          <hr>
          <b-field>
            <b-button
              type="is-primary"
              :loading="isLoading"
              native-type="submit"
              expanded
            >
              Mentés
            </b-button>
          </b-field>
        </form>
      </card-component>
    </section>
  </div>
</template>

<script>
import slugify from 'slugify'
import HeroBar from '@/components/common/HeroBar'
import CardComponent from '@/components/common/CardComponent'

export default {
  name: 'ContactFormEdit',
  components: {
    CardComponent,
    HeroBar
  },
  data () {
    return {
      isLoading: false,
      thanksType: '',
      contactForm: this.getClearFormObject(),
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ align: [] }],
            ['link', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ color: [] }, { background: [] }],
            ['clean']
          ]
        }
      }
    }
  },
  head () {
    return {
      title: 'DeelPay kontakt űrlap szerkesztése'
    }
  },
  computed: {
    slugLink () {
      return slugify(this.contactForm.name, {
        lower: true
      })
    }
  },
  async mounted () {
    this.contactForm = await this.getData()
  },
  methods: {
    getClearFormObject () {
      return {
        id: '',
        name: '',

        successLink: '',
        successText: '',
        promotionText: '',
        newsletterCheckbox: null
      }
    },

    async getData () {
      if (this.$route.params.id) {
        try {
          const res = await this.$strapi.findOne(
            'contact-forms',
            this.$route.params.id
          )
          return res
        } catch (err) {
          this.$buefy.toast.open({
            message: `Error: ${err.message}`,
            type: 'is-danger',
            queue: false
          })
        }
      }
    },

    async submit () {
      try {
        this.isLoading = true

        await this.$strapi.update(
          'contact-forms',
          this.contactForm.id,
          this.contactForm
        )

        this.isLoading = false
        this.$buefy.snackbar.open({
          message: 'Sikeresen mentve',
          queue: false
        })
        this.$router.push('/forms')
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
