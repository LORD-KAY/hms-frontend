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
            <template v-if="responsesList.length > 0">
              <div
                v-for="response in responsesList"
                :key="response._id"
                class="d-flex flex-column flex-grow-1"
              >
                <v-chip label class="ft font-weight-medium">
                  {{ response.comment }}
                </v-chip>
              </div>
            </template>

            <div
              v-else
              class="d-flex flex-column flex-grow-1 text-center mt-5"
              style="align-items: center"
            >
              <img src="@/assets/images/strategy.svg" style="width: 120px" />
              <span class="ft font-weight-medium"
                >No response from doctor yet</span
              >
              <span class="ft font-weight-medium"
                >All responses from doctor will show up here.</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component } from "vue-property-decorator";
import WidgetMixins from "../../../mixins/WidgetMixins";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { email, required } from "vee-validate/dist/rules";
import { mixins } from "vue-class-component";
import { loadWidget } from "@/utils/helpers";
import { namespace } from "vuex-class";
import { IResponses } from "@/store/modules/patients";

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
})
export default class ViewReplies extends mixins(WidgetMixins) {
  @patientsModule.Getter("getResponsesList") responsesList!: IResponses;
  menu = false;
  content = "";
  title = "";
  dateStarted = "";

  created(): void {
    this.$store.dispatch("patients/listOfResponses", {
      id: this.$route.params?.id,
    });
  }
}
</script>
