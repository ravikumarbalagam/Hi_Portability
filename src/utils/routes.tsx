import { createBrowserRouter } from "react-router";
import { MainLayout } from "../components/MainLayout";
import { Dashboard } from "../components/Dashboard";
import { Users } from "../components/Users";
import { Masters } from "../components/Masters";
import { SinglePolicyRequest } from "../components/SinglePolicyRequest";
import { BulkUpload } from "../components/BulkUpload";
import { PortabilityInformation } from "../components/PortabilityInformation";
import { PendingPolicies } from "../components/PendingPolicies";
import { Reports } from "../components/Reports";
import { MyProfile } from "../components/MyProfile";
import { Alerts } from "../components/Alerts";
import { Login } from "../components/Login";
import { StyleGuide } from "../components/StyleGuide";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "users", Component: Users },
      { path: "masters", Component: Masters },
      { path: "single-policy-request", Component: SinglePolicyRequest },
      { path: "bulk-upload", Component: BulkUpload },
      { path: "portability-info", Component: PortabilityInformation },
      { path: "pending-policies", Component: PendingPolicies },
      { path: "reports", Component: Reports },
      { path: "profile", Component: MyProfile },
      { path: "alerts", Component: Alerts },
      { path: "style-guide", Component: StyleGuide },
    ],
  },
]);