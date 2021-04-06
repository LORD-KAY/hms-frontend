/* eslint-disable @typescript-eslint/no-non-null-assertion */
import Vue from "vue";
import Vuex, { ActionTree, GetterTree, MutationTree, StoreOptions } from "vuex";
import { PayloadState, RootState } from "../types/types";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";
import { auth } from "./modules/auth";
import { patients } from "./modules/patients";

Vue.use(Vuex);
const ls = new SecureLS({
  isCompression: false,
});

const mutations: MutationTree<RootState> = {
  UPDATE_SNACKBAR_MSG(state, payload: string) {
    state.snackBar!.message = payload;
  },
  UPDATE_SNACKBAR_VISIBILITY(state, payload: boolean) {
    state.snackBar!.show = payload;
  },
  UPDATE_ISLOADING(state, payload: boolean) {
    state.isLoading = payload;
  },
  UPDATE_ISPAGELOADING(state, payload: boolean) {
    state.isPageLoading = payload;
  },
  UPDATE_DIALOG(state, payload: PayloadState) {
    state.dialogs[payload.idx] = payload.state;
  },
  UPDATE_PAGINATION(state, payload) {
    state.paginate = payload;
  },
  UPDATE_NOT_FOUND(state, payload: boolean) {
    state.notFound = payload;
  },
  UPDATE_NAVIGATION_DRAWER(state, payload: boolean) {
    state.navigationDrawer = payload;
  },
};

const actions: ActionTree<RootState, RootState> = {
  snackBarMessage({ commit }, payload: boolean) {
    commit("UPDATE_SNACKBAR_MSG", payload);
  },
  snackBarVisibility({ commit }, payload: boolean) {
    commit("UPDATE_SNACKBAR_VISIBILITY", payload);
  },
  isLoading({ commit }, payload) {
    commit("UPDATE_ISLOADING", payload);
  },
  isPageLoading({ commit }, payload) {
    commit("UPDATE_ISPAGELOADING", payload);
  },
  paginate({ commit }, payload) {
    commit("UPDATE_PAGE", payload);
  },
  currentPage({ commit }, payload) {
    commit("UPDATE_CURRENT_PAGE", payload);
  },
  notFound({ commit }, payload) {
    commit("UPDATE_NOT_FOUND", payload);
  },
  navigationDrawer({ commit }, payload: boolean) {
    commit("UPDATE_NAVIGATION_DRAWER", payload);
  },
};

const getters: GetterTree<RootState, RootState> = {
  getIsLoading: (state): boolean => state.isLoading,
  getIsPageLoading: (state): boolean => state.isPageLoading,
  getSnackBarMessage: (state): string => state.snackBar!.message,
  showSnackBar: (state): boolean => state.snackBar!.show,
  getPagination: (state) => state.paginate,
};
/**
 * Vuex store initial state
 */
const store: StoreOptions<RootState> = {
  strict: process.env.NODE_ENV !== "production",
  plugins: [
    createPersistedState({
      key: "cloud.access",
      paths: ["auth.user"],
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
  state: {
    isLoading: false,
    isPageLoading: false,
    snackBar: {
      message: "",
      show: false,
    },
    timeout: 2000,
    dialogs: {
      add: false,
      edit: false,
      delete: false,
    },
    paginate: {
      currentPage: 1,
      page: 0,
      limit: 15,
    },
    resetForm: false,
    notFound: false,
    navigationDrawer: false,
  },
  actions,
  mutations,
  getters,
  modules: {
    auth,
    patients,
  },
};
export default new Vuex.Store<RootState>(store);
