<template>
  <div
    id="institution-pane d-flex flex-column flex-grow-1 flex-shrink-1 flex-wrap"
  >
    <div class="d-flex flex-row flex-grow-1 flex-wrap flex-shrink-1">
      <div class="d-flex flex-column mid-container">
        <div class="dash-side-container dash-side-container-topNavbar">
          <ToolBar :title="$route.meta.pageTitle">
            <template #actions v-if="userType !== 'doctor'">
              <v-btn
                color="accent"
                @click.stop="$router.push({ name: 'accounts.report-issues' })"
              >
                <i class="material-icons-outlined">add</i>
                <span class="ft font-weight-medium text-sm text-capitalize"
                  >Report Issue</span
                >
              </v-btn>
            </template>
          </ToolBar>
        </div>
        <div class="d-flex flex-row flex-wrap" style="width: 100%">
          <div class="d-flex flex-column flex-grow-1 flex-shrink-1 flex-wrap">
            <h4 class="ft text-md font-weight-medium mx-3 mt-3">
              All Reported Issues
            </h4>

            <v-data-table
              :headers="headers"
              :items="listOfIssues"
              :loading="pageLoading"
              :server-items-length="pagination.total"
              :items-per-page="pagination.itemsPerPage"
              :options.sync="options"
              :footer-props="{
                itemsPerPageOptions: [10, 20, 30],
              }"
              class="vx-shadow ft mt-2 data-list-list-view"
            >
              <template #item.created_at="{ item }">
                <v-chip label small>
                  {{ item.dateStarted | timestamp }}
                </v-chip>
              </template>
              <template #item.actions="{ item }">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      @click.stop="
                        $router.push({
                          name: 'accounts.report-issues.replies',
                          params: { id: item._id },
                        })
                      "
                      fab
                      icon
                      small
                      v-on="on"
                    >
                      <i class="material-icons-outlined">message</i>
                    </v-btn>
                  </template>
                  <span class="ft font-weight-medium">View Replies</span>
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
import { Getter, namespace } from "vuex-class";
import ToolBar from "@/components/ToolBar.vue";
import { IIssues } from "@/store/modules/patients";
import { IPaginate } from "@/types/types";
import moment from "moment";
const authModule = namespace("auth");
const patientsModule = namespace("patients");
@Component({
  components: {
    ToolBar,
    SnackBar: loadWidget("SnackBar"),
  },
  filters: {
    timestamp(value: string) {
      return moment(value, "YYYY-MM-DD").format("YYYY-MM-DD");
    },
  },
})
export default class Applications extends mixins(WidgetMixins) {
  placeholder = "http://via.placeholder.com/50x50";
  @Getter("getIsPageLoading") pageLoading!: boolean;
  @patientsModule.Getter("getIssuesList") listOfIssues!: IIssues[];
  @patientsModule.Getter("getPagination") pagination!: IPaginate;
  @authModule.Getter("getUserType") userType!: string;

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
    {
      text: "Date",
      align: "start",
      sortable: false,
      value: "created_at",
    },
    { text: "Title", value: "title" },
    { text: "Content", value: "content" },
    { text: "Actions", value: "actions", sortable: false },
  ];

  @Watch("options")
  onOptionsChange(payload: IPaginate): void {
    this.$store.dispatch("patients/listOfIssues", {
      page: payload.page,
      limit: payload.itemsPerPage,
    });
  }

  created(): void {
    this.$store.dispatch("patients/listOfIssues");
  }
}
</script>
