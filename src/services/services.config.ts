import { IIssues } from "@/store/modules/patients";
import { IRegisterState, LoginState } from "@/types/types";
import { Request } from "./api";

export default class ServicesConfig {
  static login(payload: LoginState): any {
    return Request().post(`/auth/login`, payload);
  }

  static register(payload: IRegisterState): any {
    return Request().post(`/auth/register`, payload);
  }
  static me(): any {
    return Request().get(`/user/profile/me`);
  }

  static listOfIssues(page = 1, limit = 12): Promise<any> {
    return Request().get(
      `/patients/all/reported/issues?page=${page}&limit=${limit}`
    );
  }

  static reportIssue(payload: IIssues): Promise<any> {
    return Request().post(`/patients/report/issue`, payload);
  }

  static responsesForAnIssue(id: string, page = 1, limit = 12): Promise<any> {
    return Request().get(
      `/patients/issue/${id}/response?page=${page}&limit=${limit}`
    );
  }

  static listOfPatients(page = 1, limit = 12): Promise<any> {
    return Request().get(`/admin/patients?page=${page}&limit=${limit}`);
  }

  static issuesByPatients(id: string, page = 1, limit = 12): Promise<any> {
    return Request().get(
      `/admin/patients/${id}/issues?page=${page}&limit=${limit}`
    );
  }

  static responseToAnIssue(
    id: string,
    payload: { comment: string }
  ): Promise<any> {
    return Request().post(`/patients/issue/${id}/response`, payload);
  }

  static responsesByIssueId(id: string): Promise<any> {
    return Request().get(`/patients/issue/${id}/response`);
  }
}
