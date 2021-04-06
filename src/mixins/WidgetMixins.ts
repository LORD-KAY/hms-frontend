/* eslint-disable @typescript-eslint/no-inferrable-types */

import { Component, Vue, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { IPaginate } from "@/types/types";

@Component({
  filters: {},
})
export default class WidgetMixins extends Vue {
  @Getter("showSnackBar") showSnackBar!: boolean;
  @Getter("getIsLoading") isLoading!: boolean;
  @Getter("getIsPageLoading") pageLoading!: boolean;
  @Getter("getSnackBarMessage") message!: string;
  @Getter("getPagination") paginate!: IPaginate;

  @Watch("showSnackBar")
  onSnackBarChanged(value: boolean): void {
    setTimeout(async () => {
      await this.$store.dispatch("snackBarVisibility", false, { root: true });
    }, this.$store.state.timeout);
  }

  get timeout() {
    return this.$store.state.timeout;
  }

  get currentPage(): number {
    return this.$store.getters["getCurrentPage"];
  }

  set currentPage(currentPage) {
    this.$store.dispatch("currentPage", { currentPage }, { root: true }).then();
  }

  async closeSnackBar(value: boolean): Promise<void> {
    await this.$store.dispatch("snackBarVisibility", value, { root: true });
  }

  async refresh(link: string) {
    await this.$store.dispatch("isLoading", true, { root: true });
    await this.$store.dispatch(link);
  }
}
