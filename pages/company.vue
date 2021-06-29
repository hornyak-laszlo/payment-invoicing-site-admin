<template>
  <div>
    <hero-bar>
      Cégadatok
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component title="Cég" icon="building" class="tile is-child">
          <b-field label="Név">
            <b-input :value="company.name" custom-class="is-static" readonly />
          </b-field>
          <b-field label="Adószám">
            <b-input :value="company.taxNumber" custom-class="is-static" readonly />
          </b-field>
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
        taxNumber: ''
      }
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
  }
}
</script>
