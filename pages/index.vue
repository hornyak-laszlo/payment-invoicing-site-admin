<template>
  <div>
    <hero-bar :has-right-visible="false">
      <b-icon
        pack="fas"
        icon="chart-line"
        size="is-small"
        style="margin: 1rem"
      />
      Dashboard
    </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-widget
          class="tile is-child"
          type="is-primary"
          icon="account-multiple"
          :number="contactCount"
          suffix=" db"
          label="Kontaktok"
        />
        <card-widget
          class="tile is-child"
          type="is-info"
          icon="cart-outline"
          :number="salesNumber"
          suffix=" Ft"
          label="Összes bevétel"
        />
        <card-widget
          class="tile is-child"
          type="is-success"
          icon="account-check"
          :number="customerCount"
          suffix=" db"
          label="Vásárlók száma"
        />
      </tiles>

      <card-component
        title="Havi vásárlások"
        icon="wallet"
        header-icon="reload"
        @header-icon-click="fillChartData"
      >
        <div
          v-if="defaultChart.chartData"
          class="chart-area"
        >
          <line-chart
            ref="bigChart"
            style="height: 100%;"
            chart-id="big-line-chart"
            :chart-data="defaultChart.chartData"
            :extra-options="defaultChart.extraOptions"
          />
        </div>
      </card-component>

      <card-component
        title="Legutóbbi vásárlások"
        class="has-table has-mobile-sort-spaced"
      >
        <data-table
          :fields="fields"
          :collection="collection"
        />
      </card-component>
    </section>
  </div>
</template>

<script>
// @ is an alias to /src
import * as chartConfig from '@/components/Charts/chart.config'
import HeroBar from '@/components/common/HeroBar'
import Tiles from '@/components/common/Tiles'
import CardWidget from '@/components/common/CardWidget'
import CardComponent from '@/components/common/CardComponent'
import LineChart from '@/components/Charts/LineChart'
import DataTable from '@/components/DataTable'
// import ClientsTableSample from '@/components/ClientsTableSample'
export default {
  name: 'Home',
  components: {
    // ClientsTableSample,
    LineChart,
    CardComponent,
    CardWidget,
    Tiles,
    HeroBar,
    DataTable
  },
  data () {
    return {
      defaultChart: {
        chartData: null,
        extraOptions: chartConfig.chartOptionsMain
      },
      dummyData: { oneTimePayments: [], subscriptionPayments: [] },
      salesNumber: null,
      customerCount: 0,
      contactCount: 0,
      collection: 'purchases',
      fields: [
        {
          field: 'lastName',
          title: 'Vezetéknév'
        },
        {
          field: 'firstName',
          title: 'Keresztnév'
        },
        {
          customFn: (data) => {
            const statuses = {
              payed: 'Fizetve',
              ordered: 'Megrendelve',
              shipped: 'Kiszállítva'
            }
            return statuses[data.status]
          },
          field: 'status',
          title: 'Vásárlás státusza'
        },
        {
          field: 'sumOfPurchase',
          title: 'Vásárlás értéke'
        }
      ]
      /* monthlySum: [] */
    }
  },
  head () {
    return {
      title: 'DeelPay fizetési űrlap'
    }
  },
  computed: {
    sumByMonth () {
      return this.dummyData.oneTimePayments.map(
        (payment, index) => payment + this.dummyData.subscriptionPayments[index]
      )
    }
  },

  async mounted () {
    this.dummyData = await this.$strapi.$http.$get('/purchases/dashboard')
    this.customerCount = await this.$strapi.count('customers')
    this.contactCount = await this.$strapi.count('contacts')
    this.fillChartData()
    this.salesNumber = this.dummyData.revenue
  },
  methods: {
    fillChartData () {
      this.defaultChart.chartData = {
        datasets: [
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.primary,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.primary,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.dummyData.oneTimePayments,
            label: 'Egyszeri vásárlások'
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.info,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.info,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.dummyData.subscriptionPayments,
            label: 'Előfizetéses vásárlások'
          },
          {
            fill: false,
            borderColor: chartConfig.chartColors.default.danger,
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            pointBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderColor: 'rgba(255,255,255,0)',
            pointHoverBackgroundColor: chartConfig.chartColors.default.danger,
            pointBorderWidth: 20,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 15,
            pointRadius: 4,
            data: this.sumByMonth,
            label: 'Havi vásárlások összesen'
          }
        ],
        labels: Array.from(Array(12), (_, i) => i + 1)
      }
    }
  }
}
</script>
