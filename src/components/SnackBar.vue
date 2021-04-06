<template>
  <v-snackbar
    v-model="snackbar"
    bottom
    right
    :color="color"
    :timeout="timeout"
    style="z-index: 99999"
    dense
  >
    <span class="ft font-weight-medium text-sm">{{ text }}</span>
    <v-btn
      color="red"
      class="ft font-weight-medium text-sm"
      @click="close"
      text
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts">
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component
export default class SnackBar extends Vue {
  @Prop({ required: true }) snackbar: boolean = false;
  @Prop({ required: true }) text!: string;
  @Prop({ required: true }) timeout!: number;

  color = "#000";

  @Emit("close")
  close() {
    return false;
  }
}
</script>

<style scoped></style>
