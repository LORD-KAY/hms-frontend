<template>
  <div
    class="menubar d-flex flex-column flex-shrink-0 flex-grow-1"
    style="overflow-y: auto"
  >
    <div
      class="d-flex flex-column flex-shrink-0"
      style="align-items: start; flex-basis: auto; height: auto"
    >
      <div
        class="logo-top d-flex flex-column flex-grow-1 flex-fill flex-shrink-0"
        style="align-items: start"
      >
        <h3
          class="pl-4 pt-1 primary--text font-weight-bold font-italic ft text-xl logo-shadow"
        >
          HMS
        </h3>
      </div>
      <div class="link-container mt-2 d-flex flex-column flex-shrink-1">
        <template v-for="(menu, idx) in sideBarItems">
          <router-link
            v-if="!menu.label"
            class="link-tag"
            tag="a"
            :to="{ name: menu.link }"
            :key="idx"
          >
            <div class="inner-container">
              <i class="material-icons-outlined h-icon">{{ menu.icon }}</i>
              <span
                style="padding-top: 2px"
                class="ml-3 nav-links font-weight-medium text-sm"
                >{{ menu.text }}</span
              >
            </div>
          </router-link>
          <template v-else>
            <span
              :key="idx"
              class="ft pl-3 my-1 text-uppercase font-weight-medium text-sm grey--text text--darken-1 nav-links"
              >{{ menu.label }}</span
            >
          </template>
        </template>
      </div>
    </div>
    <div
      class="profile-container d-flex flex-column flex-shrink-0 pa-2 ml-n1"
      style="margin-top: auto !important; width: 100%"
    >
      <v-menu
        transition="slide-y-transition"
        :close-on-content-click="false"
        :nudge-width="300"
        nudge-top="240"
        max-width="300"
        v-model="menu"
        offset-y
      >
        <template v-slot:activator="{ on }">
          <a
            v-ripple
            v-on="on"
            href="#"
            class="link-tag d-flex flex-row flex-grow-1"
            style="align-items: center"
          >
            <img
              src="https://via.placeholder.com/50x50"
              class="rounded-full d-flex flex-column mx-1"
              style="width: 38px; height: 38px"
              alt="User Avatar"
            />
            <div class="flex-column my-1 mx-2 logo-top">
              <span class="ft" style="font-size: 15px">{{ user.name }}</span>
              <span class="ft font-weight-medium" style="font-size: 13px">{{
                user.email
              }}</span>
            </div>
          </a>
        </template>
        <v-card class="d-flex flex-column cursor-pointer">
          <div class="d-flex flex-row mx-2 my-2">
            <img
              src="https://via.placeholder.com/50x50"
              class="rounded-full"
              style="width: 50px; height: 50px"
            />
            <div class="d-flex flex-column my-1 mx-2">
              <span class="ft" style="font-size: 15px">{{ user.name }}</span>
              <span class="ft font-weight-medium" style="font-size: 13px">{{
                user.email
              }}</span>
              <i class="material-icons-outlined verified">verified</i>
            </div>
          </div>
          <v-divider />
          <div>
            <v-list dense style="padding: 0 !important">
              <v-list-item class="py-1" v-ripple>
                <v-list-item-icon class="mr-4">
                  <i class="material-icons-outlined">face</i>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="ft" style="font-size: 15px"
                    >My Profile
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
          <v-divider />
          <div>
            <v-list dense style="padding: 0 !important">
              <v-list-item class="py-1" v-ripple>
                <v-list-item-icon class="mr-4">
                  <i class="material-icons-outlined">lock</i>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title class="ft" style="font-size: 15px"
                    >Change Password
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
          <v-divider />
          <div>
            <v-list dense style="padding: 0 !important">
              <v-list-item class="py-1" v-ripple>
                <v-list-item-content>
                  <v-list-item-title
                    @click.stop="logOut"
                    class="ft"
                    style="font-size: 15px"
                    >Log out
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </div>
        </v-card>
      </v-menu>
    </div>
  </div>
</template>

<script lang="ts">
/*eslint-disabled*/
import { Component, Prop, Vue } from "vue-property-decorator";
import { namespace } from "vuex-class";
import { ISideBar, IUser } from "@/types/types";

const auth = namespace("auth");
@Component
export default class SideBar extends Vue {
  @Prop({ type: Boolean, default: true }) drawer!: boolean;
  @Prop({ type: Array, default: () => [], required: true })
  sideBarItems!: Array<ISideBar>;
  @auth.Getter("getUserDetails") user!: IUser;
  closer: boolean = this.drawer;
  menu = false;

  logOut(): void {
    this.$store.dispatch("auth/logOut");
  }
}
</script>
