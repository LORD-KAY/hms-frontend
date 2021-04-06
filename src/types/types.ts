export interface RootState {
  isLoading: boolean;
  isPageLoading: boolean;
  snackBar?: SnackBar;
  timeout?: number;
  dialogs: DialogState;

  [key: string]: unknown;
}

export interface SnackBar {
  message: string;
  show: boolean;
}

export interface DialogState {
  [key: string]: boolean;
}

export interface PayloadState {
  idx: string;
  state: boolean;
}

export interface LoginState {
  username: string;
  password: string;
}

export interface IRegisterState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
}
export interface ISideBar {
  link: string;
  icon: string;
  text: string;
}
/**
 * @param o {Object} - Object to find the index
 * @param key {String} - key to use in finding the value from the object
 */
export function pluck<T, K extends keyof T>(o: T, key: K): T[K] {
  return o[key];
}

export interface AuthState {
  user: AuthUserDetails;
  [key: string]: any;
}

export interface AuthUserDetails {
  details?: IUser;
  token: string;
  userType?: string;
}

export interface IUser extends ITimestamp {
  id?: string;
  mobile: string;
  email: string;
  username?: string;
  password?: string;
  name: string;
}

export interface ITimestamp {
  createdAt?: string;
  updatedAt?: string;
}

export interface IPaginate {
  groupBy?: Array<string>;
  groupDesc?: any;
  itemsPerPage: number;
  page: number;
  sortBy?: Array<string>;
  sortDesc?: Array<boolean>;
  total: number;
}
