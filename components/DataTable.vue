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
      :height="tableHeight()"
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
        <b-table-column
          label="Létrehozva"
          field="created_at"
          sortable
        >
          <small
            class="has-text-grey is-abbr-like"
            :title="props.row.created_at"
          >{{ props.row.created_at }}</small>
        </b-table-column>
        <b-table-column
          label="Módosítva"
          field="updated_at"
          sortable
        >
          <small
            class="has-text-grey is-abbr-like"
            :title="props.row.updated_at"
          >{{ props.row.updated_at }}</small>
        </b-table-column>
        <b-table-column
          custom-key="actions"
          class="is-actions-cell"
          style="display: flex;justify-content: space-around;"
        >
          <div class="buttons is-right">
            <div class="t-button-wrapper">
              <nuxt-link
                v-if="readOnly"
                :to="getViewLink(props.row)"
                class="button is-small"
              >
                <b-icon
                  pack="fas"
                  icon="eye"
                  size="is-small"
                  type="is-primary"
                />
              </nuxt-link>
              <nuxt-link
                v-if="!readOnly"
                :to="getEditLink(props.row)"
                class="button is-small"
              >
                <b-icon
                  pack="fas"
                  icon="eye"
                  size="is-small"
                  type="is-primary"
                />
              </nuxt-link>
              <b-button
                v-if="!readOnly"
                class="button is-small"
                type="button"
                @click.prevent="trashModal(props.row)"
              >
                <b-icon
                  pack="fas"
                  icon="trash-alt"
                  size="is-small"
                  type="is-danger"
                />
              </b-button>
            </div>
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
import { convertToHungarianTime } from '../utils/dateHelpers'

export default {
  name: 'DataTable',
  components: { ModalBox },
  props: {
    customCollectionFn: {
      type: Function,
      default: null
    },
    customDataFn: {
      type: Function,
      default: null
    },
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
    trashObjectName () {
      if (this.trashObject) {
        return this.trashObject.name
      }

      return null
    }
  },
  async mounted () {
    await this.loadData()
  },
  methods: {
    tableHeight () {
      const header = 52
      const sectionHeader = 85
      const tablePadding = 24 + 48
      const border = 2
      const tableHeader = 49
      const tableFooter = 72
      const tabHeight = 43
      return `calc(100vh - ${header + sectionHeader + tablePadding + tableHeader + tableFooter + border + tabHeight}px`
    },
    getViewLink (row) {
      const collection = this.customCollectionFn ? this.customCollectionFn(row) : this.collection
      return `/${collection}/view/${row.id}`
    },
    getEditLink (row) {
      const collection = this.customCollectionFn ? this.customCollectionFn(row) : this.collection
      return `/${collection}/edit/${row.id}`
    },
    async loadData () {
      this.isLoading = true
      try {
        const customFunctions = this.fields.filter(f => f.customFn)
        this.data = this.customDataFn ? await this.customDataFn() : await this.$strapi.find(this.collection)
        this.isLoading = false
        this.data.forEach((data) => {
          customFunctions.forEach((e) => {
            data[e.field] = e.customFn(data)
          })
          data.created_at = convertToHungarianTime(data.created_at)
          data.updated_at = convertToHungarianTime(data.updated_at)
        })
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
    },
    trashModal (trashObject) {
      this.trashObject = trashObject
      this.isModalActive = true
    },
    async trashConfirm () {
      const collection = this.customCollectionFn ? this.customCollectionFn(this.trashObject) : this.collection
      await this.$strapi.delete(collection, this.trashObject.id)
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
