<template>
  <div>
    <hero-bar>
      <b-icon
        pack="fas"
        icon="gavel"
        size="is-small"
        style="margin: 1rem"
      />
      Jogi dokumentumok
    </hero-bar>
    <section class="section is-main-section">
      <ValidationObserver v-slot="{ invalid }">
        <form @submit.prevent="submit">
          <card-component
            title="Adatvédelmi nyilatkozat"
            class="title is-child"
          >
            <b-field label="Adatvédelmi nyilatkozat szövege">
              <client-only>
                <quill-editor
                  ref="editor"
                  v-model="adatvedelmi"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)"
                />
              </client-only>
            </b-field>
          </card-component>

          <card-component
            title="Általános szerződési feltételek"
            class="title is-child"
          >
            <b-field label="aszf szövege">
              <client-only>
                <quill-editor
                  ref="editor"
                  v-model="aszf"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)"
                />
              </client-only>
            </b-field>
          </card-component>

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
        </form>
      </ValidationObserver>
    </section>
  </div>
</template>

<script>
import CardComponent from '@/components/common/CardComponent'
import HeroBar from '@/components/common/HeroBar'

/* import Tiles from '@/components/common/Tiles' */

export default {
  name: 'Documents',
  components: {
    /* Tiles, */

    HeroBar,
    CardComponent
  },
  data () {
    return {

      adatvedelmi: 'testing egyes',
      aszf: 'testing kettes',
      isLoading: false,
      editorOption: {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }], [{ font: [] }], ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'], [{ align: [] }], ['link', 'image'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }], [{ indent: '-1' }, { indent: '+1' }],
            [{ color: [] }, { background: [] }], ['clean']
          ]
        }
      }
    }
  },
  head () {
    return {
      title: 'Jogi dokumentumok'
    }
  },
  computed: {
  },
  async mounted () {
    /* try {
      this.company = await this.$strapi.$http.$get('/companies/own/data')
    } catch (err) {
      if (err && err.response.data && err.response.data.message && err.response.data.message === 'Your account does not belong to any company!') {
        this.companyDataFound = false
      } else {
        this.$buefy.toast.open({
          message: 'Nem sikerült betölteni a cég adatait',
          type: 'is-danger'
        })
      }
    } */
  },

  methods: {
    onEditorBlur (editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus (editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      console.log('editor ready!', editor)
    },

    async submit () {
      try {
        this.isLoading = true

        const companyUpd = await this.$strapi.$http.$put('/companies/own/data', this.company)
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
