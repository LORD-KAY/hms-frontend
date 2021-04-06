<template>
  <v-app light style="background: white !important">
    <router-view />
  </v-app>
</template>
<script>
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  checkConnection() {
    if (navigator.onLine) {
      this.$store.dispatch("internet", false, { root: true });
    } else {
      this.$store.dispatch("internet", true, { root: true });
    }
  }

  created() {
    if (process.env.NODE_ENV === "production") {
      // TODO: have to make request whenever the page detects internet and reloads the page
      setInterval(() => {
        this.checkConnection();
      }, 4000);
    }
  }
}
</script>
