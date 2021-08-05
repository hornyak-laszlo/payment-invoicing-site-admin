<template>
  <div>
    <modal-box
      :is-active="isModalActive"
      :trash-object-name="trashObjectName"
      @confirm="trashConfirm"
      @cancel="trashCancel"
    />
    <b-table
      :sticky-header="true"
      :height="tableHeight"
      :checked-rows.sync="checkedRows"
      :checkable="checkable"
      :loading="isLoading"
      :paginated="paginated"
      :per-page="perPage"
      :striped="true"
      :hoverable="true"
      default-sort="id"
      :data="data"
    >
      <template slot-scope="props">
        <b-table-column
          label="Id"
          field="id"
          sortable
        >
          {{ props.row.id }}
        </b-table-column>
        <b-table-column
          v-for="field in fields"
          :key="field.field"
          :label="field.title"
          :field="field.field"
          sortable
        >
          {{ props.row[field.field] }}
        </b-table-column>
        <b-table-column label="Létrehozva">
          <small
            class="has-text-grey is-abbr-like"
            :title="props.row.created_at"
          >{{ props.row.created_at }}</small>
        </b-table-column>
        <b-table-column label="Módosítva">
          <small
            class="has-text-grey is-abbr-like"
            :title="props.row.updated_at"
          >{{ props.row.updated_at }}</small>
        </b-table-column>
        <b-table-column
          v-if="!readOnly"
          custom-key="actions"
          class="is-actions-cell"
        >
          <div class="buttons is-right">
            <nuxt-link
              :to="`/${collection}/edit/${props.row.id}`"
              class="button is-small is-primary"
            >
              <b-icon
                pack="fas"
                icon="eye"
                size="is-small"
              />
            </nuxt-link>
            <button
              class="button is-small is-danger"
              type="button"
              @click.prevent="trashModal(props.row)"
            >
              <b-icon
                pack="fas"
                icon="trash-alt"
                size="is-small"
              />
            </button>
          </div>
        </b-table-column>
      </template>

      <section
        slot="empty"
        class="section"
      >
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon
                pack="fas"
                icon="ellipsis-h"
                size="is-large"
              />
            </p>
            <p>Adatok betöltése...</p>
          </template>
          <template v-else>
            <p>
              <b-icon
                pack="fas"
                icon="frown"
                size="is-large"
              />
            </p>
            <p>Nem található adat&hellip;</p>
          </template>
        </div>
      </section>
    </b-table>
  </div>
</template>

<script>
import ModalBox from '@/components/common/ModalBox'

export default {
  name: 'DataTable',
  components: { ModalBox },
  props: {
    readOnly: {
      type: Boolean,
      default: false
    },
    collection: {
      type: String,
      default: null
    },
    fields: {
      type: Array,
      default: () => []
    },
    checkable: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      windowHeight: 300,
      isModalActive: false,
      trashObject: null,
      data: [],
      isLoading: false,
      paginated: false,
      perPage: 10,
      checkedRows: []
    }
  },
  computed: {
    tableHeight () {
      const header = 52
      const sectionHeader = 85
      const tablePadding = 24 + 48
      const border = 2
      const tableHeader = 49
      const tableFooter = 72
      return this.windowHeight - (header + sectionHeader + tablePadding + tableHeader + tableFooter + border)
    },
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.name
      }

      return null
    }
  },
  async mounted () {
    window.addEventListener('resize', this.onResize)
    this.onResize()
    await this.loadData()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    async loadData () {
      if (this.collection) {
        this.isLoading = true
        try {
          this.data = await this.$strapi.find(this.collection)
          this.isLoading = false
          if (this.data.length > this.perPage) {
            this.paginated = true
          }
        } catch (err) {
          this.isLoading = false
          this.$buefy.toast.open({
            message: 'Nem sikerült betölteni az adatokat',
            type: 'is-danger'
          })
        }
      }
    },
    onResize () {
      this.windowHeight = window.innerHeight
    },
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    async trashConfirm () {
      await this.$strapi.delete(this.collection, this.trashObject.id)
      await this.loadData()
      this.isModalActive = false
      this.$buefy.snackbar.open({
        message: 'Sikeresen törölve',
        queue: false
      })
    },
    trashCancel () {
      this.isModalActive = false
    }
  }
}
</script>
