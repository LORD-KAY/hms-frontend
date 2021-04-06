import { ISideBar } from "@/types/types";

export const links: { [key: string]: Array<ISideBar | { label: string }> } = {
  patient: [
    {
      label: "General",
    },
    // {
    //   link: "dashboard",
    //   icon: "widgets",
    //   text: "Home"
    // },
    {
      link: "accounts.dashboard",
      icon: "category",
      text: "Medical Issues",
    },
  ],
  doctor: [
    {
      label: "General",
    },
    {
      link: "accounts.admin.dashboard",
      icon: "people",
      text: "Patients",
    },
  ],
};
