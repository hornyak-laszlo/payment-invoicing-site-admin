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
      :data="clients"
    >
      <template slot-scope="props">
        <b-table-column label="Id" field="id" sortable>
          {{ props.row.id }}
        </b-table-column>
        <b-table-column v-for="field in fields" :key="field.field" :label="field.title" :field="field.field" sortable>
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
        <b-table-column custom-key="actions" class="is-actions-cell">
          <div class="buttons is-right">
            <button
              class="button is-small is-primary"
            >
              <b-icon icon="account-edit" size="is-small" />
            </button>
            <button
              class="button is-small is-danger"
              type="button"
              @click.prevent="trashModal(props.row)"
            >
              <b-icon icon="trash-can" size="is-small" />
            </button>
          </div>
        </b-table-column>
      </template>

      <section slot="empty" class="section">
        <div class="content has-text-grey has-text-centered">
          <template v-if="isLoading">
            <p>
              <b-icon icon="dots-horizontal" size="is-large" />
            </p>
            <p>Adatok betöltése...</p>
          </template>
          <template v-else>
            <p>
              <b-icon icon="emoticon-sad" size="is-large" />
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
      clients: [],
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
    if (this.collection) {
      this.isLoading = true
      try {
        this.clients = await this.$strapi.find(this.collection)
        this.isLoading = false
        if (this.clients.length > this.perPage) {
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
  beforeDestroy () {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize () {
      this.windowHeight = window.innerHeight
    },
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    trashConfirm () {
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
