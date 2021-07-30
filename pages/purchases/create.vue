<template>
  <div>
    <hero-bar>
      Vásárlás szerkesztése
      <nuxt-link
        slot="right"
        to="/purchases"
        class="button"
      >
        Vissza a vásárlásokhoz
      </nuxt-link>
    </hero-bar>
    <section class="section is-main-section">
      <card-component
        class="tile is-child"
        :title="`Vásárlás - ID: ${$route.params.id}`"
        icon="shopping-basket"
      >
        <form @submit.prevent="submit">
          <b-field
            label="Keresztnév"
            message="A kontakt keresztneve"
            horizontal
          >
            <b-input
              v-model="customer.firstName"
              required
            />
          </b-field>
          <b-field
            label="Család név"
            message="A kontakt vezetékneve"
            horizontal
          >
            <b-input
              v-model="customer.lastName"
              required
            />
          </b-field>
          <b-field
            label="Cégnév"
            message="A kontakt cégneve"
            horizontal
          >
            <b-input
              v-model="customer.companyName"
              required
            />
          </b-field>

          <b-field
            label="Telefonszám"
            message="A kontakt telefonszáma"
            horizontal
          >
            <b-input
              v-model="customer.phoneNumber"
              required
            />
          </b-field>
          <b-field
            label="Email cím"
            message="A kontakt email címe"
            horizontal
          >
            <b-input
              v-model="customer.email"
              required
            />
          </b-field>
          <b-field
            label="Vásárlások összege"
            message="A vásárló eddigi összes vásárlásának összege"
            horizontal
          >
            <b-input
              v-model="customer.sumOfPurchase"
              required
            />
          </b-field>

          <b-field
            label="Számlázási cím"
            message="A vásárló számlázási címe"
            horizontal
          >
            <b-select
              v-model="customer.invoiceAddresses.id"
              required
            >
              <option
                v-for="invoiceAddress in allInvoiceAddresses"
                :key="invoiceAddress.id"
                :value="invoiceAddress.id"
              >
                {{ invoiceAddress.streetNo }}, {{ invoiceAddress.companyName }}
              </option>
            </b-select>
          </b-field>
          <b-field
            label="Szállítási cím"
            message="A vásárló szállítási címe"
            horizontal
          >
            <b-select
              v-model="customer.deliveryAddresses.id"
              required
              @blur="cons1"
            >
              <option
                v-for="deliveryAddress in allDeliveryAddresses"
                :key="deliveryAddress.id"
                :value="deliveryAddress.id"
              >
                {{ deliveryAddress.streetNo }}
              </option>
            </b-select>
          </b-field>

          <hr>
          <b-field horizontal>
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
export default {

}
</script>

<style>
</style>
