/* eslint-disable semi */
/* eslint-disable comma-dangle */
<template>
  <div>
    <hero-bar> Profil </hero-bar>
    <section class="section is-main-section">
      <tiles>
        <card-component title="Profil" icon="id-card" class="tile is-child">
          <b-field label="Felhasználónév">
            <b-input :value="username" custom-class="is-static" readonly />
          </b-field>
          <b-field label="Email cím">
            <b-input :value="email" custom-class="is-static" readonly />
          </b-field>
          <b-field label="Jogosultság">
            <b-input :value="role" custom-class="is-static" readonly />
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
            <b-field label="Új jelszó">
              <b-input type="password" />
            </b-field>
            <b-field label="Jelszó megerősítése">
              <b-input type="password" />
            </b-field>
            <b-button type="is-success is-light"> Beállítás </b-button>
          </form>
        </card-component>
      </tiles>
    </section>
  </div>
</template>

<script>
import CardComponent from "@/components/common/CardComponent";
import HeroBar from "@/components/common/HeroBar";
import Tiles from "@/components/common/Tiles";

export default {
  name: "Profile",
  components: {
    Tiles,
    HeroBar,
    CardComponent,
  },
  data() {
    return {};
  },
  head() {
    return {
      title: "Profil",
    };
  },
  computed: {
    username() {
      return this.$strapi.user ? this.$strapi.user.username : "";
    },
    email() {
      return this.$strapi.user ? this.$strapi.user.email : "";
    },
    role() {
      return this.$strapi.user ? this.$strapi.user.role.name : "";
    },
  },
};
</script>
