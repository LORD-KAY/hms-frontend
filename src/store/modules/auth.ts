import { AuthState, LoginState, RootState } from "@/types/types";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";

import SecureLS from "secure-ls";
import router from "@/router";
import { isNetworkError } from "@/utils/helpers";
import ServicesConfig from "../../services/services.config";

const ls = new SecureLS({
  isCompression: false,
});
const namespaced = true;

const state: AuthState = {
  user: {
    token: "",
    userType: "",
  },
};

const mutations: MutationTree<AuthState> = {
  UPDATE_TOKEN(state, payload: { access_token: string; userType: string }) {
    state.user.token = payload?.access_token;
    state.user.userType = payload?.userType;
  },
  UPDATE_USER_DETAILS(state, payload) {
    state.user.details = payload;
  },
};
const actions: ActionTree<AuthState, RootState> = {
  async login({ commit, dispatch }, payload: LoginState) {
    try {
      dispatch("isLoading", true, { root: true });
      const response = await ServicesConfig.login(payload);
      if (response) {
        commit("UPDATE_TOKEN", {
          access_token: response.data?.data?.accessToken,
          userType: response.data?.data?.userType,
        });
        dispatch("isLoading", false, { root: true });
        console.log(response.data.data);
        if (response?.data?.data?.userType === "doctor") {
          await router.push({ name: "accounts.admin.dashboard" });
        } else {
          await router.push({ name: "accounts.dashboard" });
        }
      }
    } catch (e) {
      if (isNetworkError(e)) {
        dispatch("snackBarMessage", e?.message, {
          root: true,
        });
      } else {
        dispatch("snackBarMessage", e.response.data?.message, { root: true });
      }
      dispatch("snackBarVisibility", true, { root: true });
      dispatch("isLoading", false, { root: true });
    }
  },
  async register({ commit, dispatch }, payload) {
    try {
      dispatch("isLoading", true, { root: true });
      const response$ = await ServicesConfig.register(payload);
      if (response$) {
        dispatch("isLoading", false, { root: true });
        dispatch("snackBarVisibility", true, { root: true });
        dispatch("snackBarMessage", response$.data?.message, {
          root: true,
        });
        setTimeout(() => {
          router.replace({ name: "accounts.signin" });
        }, 2000);
      }
    } catch (e) {
      if (isNetworkError(e)) {
        dispatch("snackBarMessage", e?.message, {
          root: true,
        });
      } else {
        dispatch("snackBarMessage", e.response.data?.message, { root: true });
      }
      dispatch("snackBarVisibility", true, { root: true });
      dispatch("isLoading", false, { root: true });
    }
  },
  async me({ commit, dispatch }) {
    try {
      const response = await ServicesConfig.me();
      const { firstName, lastName, email, username, id } = response.data.data;
      commit("UPDATE_USER_DETAILS", {
        name: `${firstName} ${lastName}`,
        email,
        username,
        id,
      });
    } catch (e) {
      if (isNetworkError(e)) {
        dispatch("snackBarMessage", e?.message, {
          root: true,
        });
      } else {
        dispatch("snackBarMessage", e.response.data?.message, { root: true });
      }
      dispatch("snackBarVisibility", true, { root: true });
    }
  },
  async logOut({ commit, dispatch }, payload) {
    ls.removeAll();
    commit("UPDATE_TOKEN", payload);
    await router.replace({
      name: "accounts.signin",
    });
  },
};

const getters: GetterTree<AuthState, RootState> = {
  isAuthenticated: (state) => !!state.user.token,
  getToken: (state) => state.user.token,
  getUserDetails: (state) => state.user.details,
  getUserType: (state) => state.user.userType,
};

export const auth: Module<AuthState, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters,
};
