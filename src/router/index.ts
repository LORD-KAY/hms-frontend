import store from "@/store";
import Vue from "vue";
import VueRouter from "vue-router";
import { paths } from "./paths";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: "/",
  linkActiveClass: "active",
  routes: paths,
});

router.beforeEach((to, from, next) => {
  const isUserLoggedIn = store.getters["auth/isAuthenticated"];
  store.dispatch("snackBarVisibility", false, { root: true });
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isUserLoggedIn) {
      store.dispatch("auth/logOut").then();
      next({
        path: "/signin",
        query: {
          redirect: to.fullPath,
        },
      });
    } else next();
  } else next();
});

export default router;
