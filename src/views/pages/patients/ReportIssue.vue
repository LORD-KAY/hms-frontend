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
            <ValidationObserver v-slot="{ handleSubmit }">
              <form @submit.prevent="handleSubmit(createIssue)">
                <ValidationProvider
                  name="email"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <div class="d-flex flex-row flex-grow-1 flex-shrink-1">
                    <v-text-field
                      class="ft mt-2"
                      type="text"
                      outlined
                      label="Title"
                      v-model="title"
                      :error-messages="errors[0]"
                      :autofocus="true"
                    />
                  </div>
                </ValidationProvider>
                <ValidationProvider
                  name="content"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <div class="d-flex flex-row flex-grow-1 flex-shrink-1">
                    <v-textarea
                      class="ft font-weight-medium"
                      label="Description Of The Issue"
                      v-model="content"
                      outlined
                      :error-messages="errors[0]"
                    />
                  </div>
                </ValidationProvider>
                <ValidationProvider>
                  <div class="d-flex flex-row flex-grow-1 flex-shrink-1">
                    <v-menu
                      v-model="menu"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      :nudge-left="10"
                      :nudge-top="25"
                      offset-y
                      min-width="auto"
                      class="ft font-weight-medium"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          label="Date of the issue"
                          outlined
                          v-model="dateStarted"
                          class="ft font-weight-medium"
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        class="ft font-weight-medium"
                        v-model="dateStarted"
                        @input="menu = false"
                      ></v-date-picker>
                    </v-menu>
                  </div>
                </ValidationProvider>

                <v-card-actions class="justify-end mt-1 pl-0 pr-0 pb-2">
                  <v-btn
                    type="submit"
                    :disabled="isLoading"
                    :loading="isLoading"
                    color="primary"
                    block
                    class="ft text-sm text-capitalize"
                    >Report Issue
                  </v-btn>
                </v-card-actions>
              </form>
            </ValidationObserver>
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
import { Component } from "vue-property-decorator";
import WidgetMixins from "../../../mixins/WidgetMixins";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { email, required } from "vee-validate/dist/rules";
import { mixins } from "vue-class-component";
import { loadWidget } from "@/utils/helpers";
import { namespace } from "vuex-class";

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
export default class ReportIssue extends mixins(WidgetMixins) {
  menu = false;
  content = "";
  title = "";
  dateStarted = "";

  createIssue(): void {
    this.$store.dispatch("patients/reportIssue", {
      content: this.content,
      title: this.title,
      dateStarted: this.dateStarted,
    });
  }
}
</script>
