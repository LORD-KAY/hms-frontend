import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";

Vue.use(Vuetify);
export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#0211c3",
        secondary: "rgba(14,13,12,0.89)",
        accent: "#f35f28",
        error: colors.red.accent3,
        ripple: colors.grey.lighten1,
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
  icons: {
    iconfont: "md",
  },
});
