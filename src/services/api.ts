import Axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import router from "@/router";
import SecureLS from "secure-ls";
import { apiUrlPrefix } from "../utils/helpers";

const ls = new SecureLS({
  isCompression: false,
});
const Request = () => {
  /**
   * Creating an instance of the axios for custom settings
   * @type {AxiosInstance}
   */
  const baseHeader: AxiosInstance = Axios.create({
    baseURL: `${process.env.VUE_APP_BASE_URL}${apiUrlPrefix}`,
    timeout: 80000,
  });
  /**
   * Creating interceptors for setting custom headers en route to the backend apis
   */
  baseHeader.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      config.headers.common["Accept"] = "application/json";
      config.headers.common["Content-Type"] = "application/json";
      const session = JSON.parse(ls.get("cloud.access"))?.auth?.user?.token;
      if (session !== null || session !== undefined) {
        config.headers.common["authorization"] = `Bearer ${session}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  baseHeader.interceptors.response.use(
    (response: AxiosResponse) => {
      return Promise.resolve(response);
    },
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          localStorage.clear();
          router.replace("/signin").then();
        }
      }
      return Promise.reject(error);
    }
  );
  return baseHeader;
};

export { Request };
