<template>
  <div class="d-flex flex-row flex-wrap" id="signIn" style="min-height: 100vh">
    <div
      class="d-flex flex-column flex-grow-1 full-width flex-wrap flex-shrink-0 align-content-center justify-center"
    >
      <div class="d-flex flex-row mt-n12 justify-center mb-2"></div>
      <v-card flat id="loginCard" class="rounded-sm ma-3 pl-4 pr-4 pb-6 mt-n6">
        <div class="signin ml-3 mb-5 mt-4 mr-3">
          <div class="ft text-md d-flex flex-row justify-center pt-3 pl-1">
            Create a new account
          </div>
        </div>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(register)">
            <ValidationProvider
              name="firstNaem"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="d-flex flex-row flex-grow-1 flex-shrink-1">
                <v-text-field
                  class="ft mt-2"
                  type="text"
                  label="First Name"
                  v-model="firstName"
                  :error-messages="errors[0]"
                  :autofocus="true"
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="lastName"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="d-flex flex-row flex-grow-1 flex-shrink-1">
                <v-text-field
                  class="ft mt-2"
                  type="text"
                  label="Last Name"
                  v-model="lastName"
                  :error-messages="errors[0]"
                  :autofocus="true"
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="email"
              rules="required|email"
              v-slot="{ errors }"
            >
              <div class="d-flex flex-row flex-grow-1 flex-shrink-1">
                <v-text-field
                  class="ft mt-2"
                  type="text"
                  label="Email Address"
                  v-model="email"
                  :error-messages="errors[0]"
                  :autofocus="true"
                />
              </div>
            </ValidationProvider>
            <ValidationProvider
              name="username"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="d-flex flex-row flex-grow-1 flex-shrink-1">
                <v-text-field
                  class="ft mt-2"
                  type="text"
                  label="Username"
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
            <ValidationProvider
              name="password"
              rules="required"
              v-slot="{ errors }"
            >
              <div class="d-flex flex-row flex-grow-1 flex-shrink-1">
                <v-text-field
                  class="ft mt-2"
                  :type="show ? 'text' : 'password'"
                  ref="password"
                  label="Confirm Password"
                  v-model="confirmPassword"
                  :error-messages="errors[0]"
                />
              </div>
            </ValidationProvider>
            <div class="d-flex flex-row flex-grow-1 flex-wrap">
              <span class="ft font-weight-medium">
                Already have an account ?</span
              >
              <v-btn
                tag="a"
                small
                @click="$router.push({ name: 'accounts.signin' })"
                color="primary"
                class="mt-n1 text-sm ft text-capitalize"
                text
                >Sign In
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
                >Register
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
  @authModule.Action("register") actionRegister: any;
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  username: string = "";
  password: string = "";
  confirmPassword: string = "";
  bg: string = "";
  show: boolean = false;

  register(): void {
    if (this.password.trim() !== this.confirmPassword.trim()) {
      this.$store.dispatch("snackBarMessage", "Password doesn't match", {
        root: true,
      });
      this.$store.dispatch("snackBarVisibility", true, { root: true });
      return;
    }
    let payload = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      username: this.username,
      password: this.password,
    };
    this.actionRegister(payload);
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
