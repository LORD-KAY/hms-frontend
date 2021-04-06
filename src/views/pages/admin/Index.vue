<template>
  <div
    id="institution-pane d-flex flex-column flex-grow-1 flex-shrink-1 flex-wrap"
  >
    <div class="d-flex flex-row flex-grow-1 flex-wrap flex-shrink-1">
      <div class="d-flex flex-column mid-container">
        <div class="dash-side-container dash-side-container-topNavbar">
          <ToolBar :title="$route.meta.pageTitle"> </ToolBar>
        </div>
        <div class="d-flex flex-row flex-wrap" style="width: 100%">
          <div class="d-flex flex-column flex-grow-1 flex-shrink-1 flex-wrap">
            <h4 class="ft text-md font-weight-medium mx-3 mt-3">
              All Patients
            </h4>
            <v-data-table
              :headers="headers"
              :items="patients"
              :loading="pageLoading"
              :server-items-length="pagination.total"
              :items-per-page="pagination.itemsPerPage"
              :options.sync="options"
              :footer-props="{
                itemsPerPageOptions: [10, 20, 30],
              }"
              class="vx-shadow ft mt-2 data-list-list-view"
            >
              <template #item.name="{ item }">
                <v-chip label small v-if="item.userId">
                  {{ item.userId.firstName }}
                  {{ item.userId.lastName }}
                </v-chip>
              </template>
              <template #item.email="{ item }">
                <v-chip color="primary" label small v-if="item.userId">
                  {{ item.userId.email }}
                </v-chip>
              </template>
              <template #item.username="{ item }">
                <v-chip color="primary" label small v-if="item.userId">
                  {{ item.userId.username }}
                </v-chip>
              </template>

              <template #item.actions="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      @click.stop="
                        $router.push({
                          name: 'accounts.admin.patient.issues',
                          params: { id: item.userId._id },
                        })
                      "
                      fab
                      icon
                      small
                      v-on="on"
                    >
                      <i class="material-icons-outlined">visibility</i>
                    </v-btn>
                  </template>
                  <span class="ft font-weight-medium">View Issues</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import { loadWidget } from "@/utils/helpers";
import { mixins } from "vue-class-component";
import WidgetMixins from "@/mixins/WidgetMixins";
import { namespace } from "vuex-class";
import ToolBar from "@/components/ToolBar.vue";
import { IPaginate } from "@/types/types";

const patientsModule = namespace("patients");
@Component({
  components: {
    ToolBar,
    SnackBar: loadWidget("SnackBar"),
  },
})
export default class Applications extends mixins(WidgetMixins) {
  @patientsModule.Getter("getAllPatients") patients!: any;
  @patientsModule.Getter("getPagination") pagination!: IPaginate;
  placeholder = "http://via.placeholder.com/50x50";

  options: IPaginate = {
    itemsPerPage: 10,
    page: 1,
    groupBy: [],
    groupDesc: "",
    sortBy: [],
    total: 0,
    sortDesc: [],
  };

  headers: any = [
    { text: "Name", value: "name" },
    { text: "Email", value: "email" },
    { text: "Username", value: "username" },
    { text: "Actions", value: "actions", sortable: false },
  ];

  @Watch("options")
  onOptionsChange(payload: IPaginate): void {
    this.$store.dispatch("patients/list", {
      page: payload.page,
      limit: payload.itemsPerPage,
    });
  }

  created(): void {
    this.$store.dispatch("patients/list", { page: 1, limit: 12 });
  }
}
</script>
