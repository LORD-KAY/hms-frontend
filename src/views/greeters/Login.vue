<template>
  <div class="d-flex flex-row flex-wrap" id="signIn" style="min-height: 100vh">
    <div
      class="d-flex flex-column flex-grow-1 full-width flex-wrap flex-shrink-0 align-content-center justify-center"
    >
      <div class="d-flex flex-row mt-n12 justify-center mb-2"></div>
      <v-card flat id="loginCard" class="rounded-sm ma-3 pl-4 pr-4 pb-6 mt-n6">
        <div class="signin ml-3 mb-5 mt-4 mr-3">
          <div class="ft text-md d-flex flex-row justify-center pt-3 pl-1">
            Sign in to your account
          </div>
        </div>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(authenticate)">
            <ValidationProvider
              name="email"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="d-flex flex-row flex-grow-1 flex-shrink-1">
                <v-text-field
                  class="ft mt-2"
                  type="text"
                  label="Username or Email Address"
                  v-model="username"
                  :error-messages="errors[0]"
                  :autofocus="true"
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="password"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="d-flex flex-row flex-grow-1 flex-shrink-1">
                <v-text-field
                  :append-icon="show ? 'visibility_off' : 'visibility'"
                  class="ft mt-2"
                  :type="show ? 'text' : 'password'"
                  ref="password"
                  @click:append="show = !show"
                  label="Password"
                  v-model="password"
                  :error-messages="errors[0]"
                />
              </div>
            </ValidationProvider>
            <div class="d-flex flex-row flex-grow-1 flex-wrap">
              <span class="ft font-weight-medium">
                Don't have an account yet ?</span
              >
              <v-btn
                tag="a"
                small
                @click="$router.push({ name: 'accounts.signup' })"
                color="primary"
                class="mt-n1 text-sm ft text-capitalize"
                text
                >Register
              </v-btn>
            </div>
            <v-card-actions class="justify-end mt-1 pl-0 pr-0 pb-2">
              <v-btn
                type="submit"
                :disabled="isLoading"
                :loading="isLoading"
                color="primary"
                block
                class="ft text-sm text-capitalize"
                >Login
              </v-btn>
            </v-card-actions>
          </form>
        </ValidationObserver>
      </v-card>
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
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component } from "vue-property-decorator";
import WidgetMixins from "../../mixins/WidgetMixins";
import { extend, ValidationObserver, ValidationProvider } from "vee-validate";
import { email, required } from "vee-validate/dist/rules";
import { mixins } from "vue-class-component";
import { loadWidget } from "@/utils/helpers";
import { LoginState } from "@/types/types";
import { namespace } from "vuex-class";

extend("email", {
  ...email,
  message: "Email is not valid",
});
extend("required", {
  ...required,
  message: "Field is required",
});

const authModule = namespace("auth");

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
    snackbar: loadWidget("SnackBar"),
  },
})
export default class Login extends mixins(WidgetMixins) {
  @authModule.Action("login") actionLogin: any;
  username: string = "";
  password: string = "";
  bg: string = "";
  show: boolean = false;

  authenticate(): void {
    let payload: LoginState = {
      username: this.username,
      password: this.password,
    };
    this.actionLogin(payload);
  }
}
</script>

<style scoped>
@media (min-width: 300px) and (max-width: 415px) {
  .full-width {
    width: 100% !important;
  }
}
</style>
