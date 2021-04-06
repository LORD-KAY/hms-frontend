import { loadView } from "@/utils/helpers";

export const paths = [
  {
    path: "/",
    redirect: "/signin",
  },
  {
    path: "/signin",
    name: "accounts.signin",
    component: loadView("greeters/Login"),
    meta: {
      pageTitle: "Sign In",
      requiresAuth: false,
    },
  },
  {
    path: "/register",
    name: "accounts.signup",
    component: loadView("greeters/Register"),
    meta: {
      pageTitle: "Sign Up",
      requiresAuth: false,
    },
  },
  {
    path: "/home",
    name: "home",
    component: loadView("Master"),
    children: [
      {
        path: "/dashboard",
        name: "accounts.dashboard",
        component: loadView("pages/patients/Index"),
        meta: {
          pageTitle: "Medical Issues",
          requiresAuth: true,
        },
      },
      {
        path: "/report-issues",
        name: "accounts.report-issues",
        component: loadView("pages/patients/ReportIssue"),
        meta: {
          pageTitle: "Report Medical Issue",
          requiresAuth: true,
        },
      },
      {
        path: "/report-issues/:id/replies",
        name: "accounts.report-issues.replies",
        component: loadView("pages/patients/ViewReplies"),
        meta: {
          pageTitle: "Replies",
          requiresAuth: true,
        },
      },

      // admin routes
      {
        path: "/admin/dashboard",
        name: "accounts.admin.dashboard",
        component: loadView("pages/admin/Index"),
        meta: {
          pageTitle: "Patients",
          requiresAuth: true,
        },
      },
      {
        path: "/admin/patient/:id/issues",
        name: "accounts.admin.patient.issues",
        component: loadView("pages/admin/ViewIssues"),
        meta: {
          pageTitle: "Patients' Issues",
          requiresAuth: true,
        },
      },
    ],
  },
];
