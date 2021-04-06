/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const apiUrlPrefix =
  process.env.NODE_ENV === "production" ? "/v1" : "/api/v1";

/**
 * Function to check whether a request error is a network error or axios error
 * @param err {*}
 * @returns {boolean|boolean}
 */
const isNetworkError = (err: {
  isAxiosError: unknown;
  response: unknown;
}): boolean => {
  return !!err.isAxiosError && !err.response;
};

/**
 * Function for rendering the views from the view folder
 * @param view
 * @returns {function(): *}
 */
const loadView = (view: string) => {
  return () => import(`@/views/${view}.vue`);
};

/**
 * Function for rendering the widgets from the components folder
 * @param view
 * @returns {function(): *}
 */
const loadWidget = (view: string) => {
  return () => import(`@/components/${view}.vue`);
};

export { loadView, loadWidget, isNetworkError };
