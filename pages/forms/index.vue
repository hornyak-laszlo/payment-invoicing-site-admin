<template>
  <div>
    <hero-bar>
      Űrlapok
      <nuxt-link slot="right" to="/forms/create" class="button">
        Űrlap hozzáadása
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="has-table"
        title="Űrlapok"
        icon="columns"
      >
        <form-data-table />
      </card-component>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import HeroBar from '@/components/common/HeroBar'
import CardComponent from '@/components/common/CardComponent'
import FormDataTable from '@/components/FormDataTable'
export default {
  name: 'Forms',
  components: {
    HeroBar,
    FormDataTable,
    CardComponent
  },
  data () {
    return {
    }
  },
  head () {
    return {
      title: 'Űrlapok'
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
  }
}
</script>
