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
          <div
            class="d-flex flex-column flex-grow-1 flex-shrink-1 flex-wrap mx-3 mt-3"
          >
            <template v-if="allIssues.length > 0">
              <div
                v-for="issue in allIssues"
                :key="issue._id"
                class="d-flex flex-column flex-grow-1"
              >
                <div
                  class="d-flex flex-row flex-grow-1 px-2 py-4 ma-2"
                  style="background-color: #f1f1f1"
                >
                  <div class="d-flex flex-column flex-grow-1">
                    <v-card class="elevation-1">
                      <div class="mx-3 pt-2 ft font-weight-medium">
                        {{ issue.title }} - {{ issue.dateStarted | timestamp }}
                      </div>
                      <v-card-text>
                        <span class="ft font-weight-medium">{{
                          issue.content
                        }}</span>
                      </v-card-text>
                    </v-card>
                    <div class="d-flex flex-column flex-grow-1">
                      <div class="d-flex flex-row flex-grow-1 mt-3">
                        <v-text-field
                          outlined
                          dense
                          v-model="issue.comment"
                          label="Reply to issue"
                          class="ft font-weight-medium"
                        />
                        <v-btn
                          color="primary"
                          :disabled="isLoading"
                          small
                          @click.stop="sendReply(issue)"
                          class="ft mt-1 ml-2 font-weight-medium"
                        >
                          Send
                        </v-btn>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>

            <div
              v-else
              class="d-flex flex-column flex-grow-1 text-center mt-5"
              style="align-items: center"
            >
              <img src="@/assets/images/strategy.svg" style="width: 120px" />
              <span class="ft font-weight-medium"
                >No issues from patient yet</span
              >
              <span class="ft font-weight-medium"
                >All issues reported will show up here.</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <snackbar
      :snackbar="showSnackBar"
      :text="message"
      :timeout="timeout"
      @close="closeSnackBar"
    />
  </div>
</template>
<script lang="ts">
import { Component, Watch } from "vue-property-decorator";
import WidgetMixins from "../../../mixins/WidgetMixins";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { email, required } from "vee-validate/dist/rules";
import { mixins } from "vue-class-component";
import { loadWidget } from "@/utils/helpers";
import { Getter, namespace } from "vuex-class";
import { IIssues } from "@/store/modules/patients";
import moment from "moment";
const patientsModule = namespace("patients");
extend("email", {
  ...email,
  message: "Email is not valid",
});
extend("required", {
  ...required,
  message: "Field is required",
});

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
    snackbar: loadWidget("SnackBar"),
    ToolBar: loadWidget("ToolBar"),
  },
  filters: {
    timestamp(value: string) {
      return moment(value, "YYYY-MM-DD").format("YYYY-MM-DD");
    },
  },
})
export default class ViewReplies extends mixins(WidgetMixins) {
  @patientsModule.Getter("getIssuesList") issues!: IIssues;
  @Getter("getIsLoading") isLoading!: boolean;

  allIssues: IIssues[] = [];

  @Watch("issues")
  onIssueListChanged(payload: IIssues[]): void {
    this.allIssues = [...payload].map((issue) => {
      return {
        ...issue,
        comment: "",
      };
    });
  }

  sendReply(item: IIssues & { comment: string; _id: string }): void {
    let payload = {
      comment: item?.comment,
      _id: item?._id,
      patientId: this.$route.params?.id,
    };

    this.$store.dispatch("patients/replyToIssue", payload);
  }

  created(): void {
    this.$store.dispatch("patients/issuesByPatients", {
      id: this.$route.params?.id,
      page: 1,
      limit: 12,
    });
  }
}
</script>
