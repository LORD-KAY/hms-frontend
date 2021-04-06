<template>
  <v-app-bar class="vx-shadow" dense light>
    <v-toolbar-title class="ft">
      <v-btn
        v-if="!showBackButton"
        icon
        fab
        small
        color="primary"
        @click.stop="openDrawer"
        class="mini-screen"
      >
        <img
          class="rounded-full d-flex flex-row mx-1"
          style="width: 30px; height: 30px"
          alt="Menu Icon"
        />
      </v-btn>
      <v-btn
        v-if="showBackButton"
        icon
        @click.stop="$router.push({ name: backUrl }).catch()"
        fab
        small
        color="primary"
        class="mr-4"
      >
        <i class="material-icons-outlined">arrow_back</i>
      </v-btn>
      <span class="ft toolbar--title font-weight-medium">{{ title }}</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <slot name="actions"></slot>
  </v-app-bar>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-inferrable-types */
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({
  name: "ToolBar",
})
export default class ToolBar extends Vue {
  @Prop({ required: true, default: "Home" })
  title!: string;

  @Prop({ required: false, default: false })
  showBackButton!: boolean;

  @Prop({ required: false, default: "" })
  backUrl!: string;

  state: boolean = false;

  openDrawer() {
    this.$store.dispatch("navigationDrawer", !this.state, { root: true });
  }
}
</script>

<style scoped></style>
