import { RootState } from "@/types/types";
import { ActionTree, GetterTree, Module, MutationTree } from "vuex";

import SecureLS from "secure-ls";
import router from "@/router";
import { isNetworkError } from "@/utils/helpers";
import ServicesConfig from "../../services/services.config";
import { IPaginate } from "../../types/types";
import { of } from "rxjs";
import { map } from "rxjs/operators";

export interface IIssues {
  title: string;
  content: string;
  slug: string;
}
export interface IResponses {
  comment: string;
  fromPatient: boolean;
  isArchived: boolean;
}

export interface IPatient {
  issues: IIssues[];
  paginate: Pick<IPaginate, "itemsPerPage" | "page" | "total">;
  responses: IResponses[];
  [key: string]: unknown;
}
const ls = new SecureLS({
  isCompression: false,
});
const namespaced = true;

const state: IPatient = {
  issues: [],
  paginate: {
    itemsPerPage: 12,
    page: 1,
    total: 0,
  },
  responses: [],
  patients: [],
  issuesByPatients: [],
};

const mutations: MutationTree<IPatient> = {
  UPDATE_ISSUES(state, payload) {
    state.issues = payload;
  },
  UPDATE_PAGINATION(state, payload) {
    state.paginate = payload;
  },
  UPDATE_RESPONSES(state, payload) {
    state.responses = payload;
  },
  UPDATE_PATIENTS(state, payload) {
    state.patients = payload;
  },
};
const actions: ActionTree<IPatient, RootState> = {
  async list({ commit, dispatch }) {
    try {
      dispatch("isPageLoading", true, { root: true });
      const response = await ServicesConfig.listOfPatients();
      if (response) {
        const { docs } = response?.data?.data;
        const { totalPages, page, limit } = response.data?.data;
        commit(
          "UPDATE_PATIENTS",
          docs.filter((doc: any) => doc.userId && doc)
        );
        commit("UPDATE_PAGINATION", {
          itemsPerPage: limit,
          total: totalPages,
          page,
        });
        dispatch("isPageLoading", false, { root: true });
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
    }
  },
  async issuesByPatients({ commit, dispatch }, payload) {
    try {
      dispatch("isPageLoading", true, { root: true });
      const { id, page, limit } = payload;
      const response = await ServicesConfig.issuesByPatients(id, page, limit);
      if (response) {
        const { docs } = response?.data?.data;
        const { totalPages, page, limit } = response.data?.data;
        const docsWithResponses = await Promise.all(
          docs.map(async (doc: any) => {
            const responses = await ServicesConfig.responsesByIssueId(doc._id);
            return {
              ...doc,
              responses: responses?.data?.data,
            };
          })
        );

        commit("UPDATE_ISSUES", docsWithResponses);
        commit("UPDATE_PAGINATION", {
          itemsPerPage: limit,
          total: totalPages,
          page,
        });
        dispatch("isPageLoading", false, { root: true });
      }
    } catch (e) {
      dispatch("isPageLoading", false, { root: true });
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
  async replyToIssue({ commit, dispatch }, payload) {
    try {
      dispatch("isLoading", true, { root: true });
      const response = await ServicesConfig.responseToAnIssue(payload?._id, {
        comment: payload.comment,
      });
      if (response) {
        dispatch("isLoading", false, { root: true });
        dispatch("issuesByPatients", {
          id: payload?.patientId,
          page: 1,
          limit: 12,
        });
        dispatch("snackBarMessage", response?.data?.message, {
          root: true,
        });
        dispatch("snackBarVisibility", true, { root: true });
      }
    } catch (e) {
      dispatch("isLoading", false, { root: true });
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

  // PATIENTS MODULE
  async listOfIssues({ commit, dispatch }) {
    try {
      dispatch("isPageLoading", true, { root: true });
      const response = await ServicesConfig.listOfIssues();
      if (response) {
        const { docs } = response?.data?.data;
        const { totalPages, page, limit } = response.data?.data;
        commit("UPDATE_ISSUES", docs);
        commit("UPDATE_PAGINATION", {
          itemsPerPage: limit,
          total: totalPages,
          page,
        });
        dispatch("isPageLoading", false, { root: true });
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
    }
  },
  async reportIssue({ dispatch }, payload) {
    try {
      dispatch("isLoading", true, { root: true });
      const response = await ServicesConfig.reportIssue(payload);
      if (response) {
        dispatch("isLoading", false, { root: true });
        await router.push({ name: "accounts.dashboard" });
      }
    } catch (e) {
      dispatch("isLoading", false, { root: true });
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
  async listOfResponses({ commit, dispatch }, payload) {
    try {
      dispatch("isPageLoading", true, { root: true });
      const response = await ServicesConfig.responsesForAnIssue(payload?.id);
      if (response) {
        commit("UPDATE_RESPONSES", response?.data?.data);

        dispatch("isPageLoading", false, { root: true });
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
    }
  },
};
const getters: GetterTree<IPatient, RootState> = {
  getIssuesList: (state) => state.issues,
  getPagination: (state) => state.paginate,
  getResponsesList: (state) => state.responses,
  getAllPatients: (state) => state.patients,
};

export const patients: Module<IPatient, RootState> = {
  namespaced,
  state,
  mutations,
  actions,
  getters,
};
