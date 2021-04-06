<template>
  <div
    class="d-flex flex-row flex-grow-1 flex-shrink-0 flex-fill"
    style="
      width: 100%;
      min-height: 920px;
      align-items: stretch;
      flex-basis: auto;
      position: relative;
      box-sizing: border-box;
    "
  >
    <header
      id="main-header"
      class="d-flex flex-column flex-grow-1 flex-shrink-1"
    >
      <nav role="navigation" class="navigation hide-links">
        <app--drawer :sideBarItems="links"></app--drawer>
      </nav>
    </header>
    <v-bottom-navigation
      grow
      color="rgb(0, 41, 143)"
      app
      class="bottom-sheet"
      style="z-index: 9999"
    >
      <template v-for="(link, index) in links.slice(1, 5)">
        <v-btn v-if="!link.label" :key="index" :to="{ name: link.link }">
          <i
            class="v-icon notranslate material-icons-outlined black--text theme--light"
            aria-hidden="true"
            >{{ link.icon }}</i
          >
        </v-btn>
      </template>
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
          <v-btn v-on="on">
            <i class="material-icons-outlined"> account_circle </i>
          </v-btn>
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
                    @click.stop="signOut"
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
    </v-bottom-navigation>
    <!-- <SideBarDrawer :drawer="drawerState" :links="links" /> -->
    <main
      class="d-flex flex-column flex-grow-1 flex-shrink-1"
      style="align-items: flex-start; position: relative"
    >
      <div
        class="main-container d-flex flex-column body-full-width flex-grow-1"
      >
        <router-view />
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { loadView } from "@/utils/helpers";
// import SideBarDrawer from "@/views/SideBarDrawer.vue";
import { Getter, namespace } from "vuex-class";
import { ISideBar, IUser } from "@/types/types";
import { links } from "@/data/sidebar";

const authModule = namespace("auth");
@Component({
  components: {
    "app--bar": loadView(`NavBar`),
    "app--drawer": loadView(`SideBar`),
  },
})
export default class Master extends Vue {
  @Getter("getNavigationDrawerState") drawerState!: boolean;
  @authModule.Getter("getUserType") userType!: string;
  @authModule.Getter("getUserDetails") user!: IUser;
  state = true;
  links!: Array<ISideBar | { label: string }>;
  menu = false;

  emitDrawer(value: boolean) {
    this.state = value;
  }

  closeDrawer(state: boolean) {
    this.$store.dispatch("navigationDrawer", state, { root: true });
  }
  signOut() {
    this.$store.dispatch("auth/logOut", null);
  }
  sidebarLinks(key: string): Array<ISideBar | { label: string }> {
    return links[key];
  }

  created(): void {
    this.links = this.sidebarLinks(this.userType);
    this.$store.dispatch("auth/me");
  }
}
</script>

<style scoped></style>
