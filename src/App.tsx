import "./App.css";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { SigninPage } from "./pages/sign-in/page";
import { BusinessAdvisoryLayout } from "./components/layouts/business-advisory";
import { BusinessAdvisoryDashboard } from "./pages/business-advisory/dashboard";
import { BusinessAdvisoryManageData } from "./pages/business-advisory/manage-data";
import { BusinessAdvisoryAccount } from "./pages/business-advisory/account";
import { BusinessAdvisoryNotification } from "./pages/business-advisory/notification";
import { BusinessAdvisoryAnalytics } from "./pages/business-advisory/analytics";
import { BusinessAdvisoryReports } from "./pages/business-advisory/reports";
import { BusinessAdvisoryRolesPermission } from "./pages/business-advisory/roles-permission";
import { AccountsLayout } from "./components/layouts/accounts";
import { AccountsDashboard } from "./pages/accounts/dashboard";
import { AccountsAccount } from "./pages/accounts/account";
import { AccountsAnalytics } from "./pages/accounts/analytics";
import { AccountsReports } from "./pages/accounts/reports";
import { AccountsRolesPermission } from "./pages/accounts/roles-permission";
import { AccountsNotification } from "./pages/accounts/notification";
import { AccountsManageData } from "./pages/accounts/manage-data";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <h1>Hello World</h1>
          <Link to="about">About Us</Link>
        </div>
      ),
    },
    {
      path: "/auth/sign-in",
      element: <SigninPage />,
    },
    {
      path: "/accounts",
      element: <AccountsLayout />,
      children: [
        { path: "dashboard", element: <AccountsDashboard /> },
        { path: "manage-data", element: <AccountsManageData /> },
        { path: "notification", element: <AccountsNotification /> },
        { path: "account", element: <AccountsAccount /> },
        { path: "analytics", element: <AccountsAnalytics /> },
        { path: "reports", element: <AccountsReports /> },
        {
          path: "roles-permission",
          element: <AccountsRolesPermission />,
        },
      ],
    },
    {
      path: "/business-advisory",
      element: <BusinessAdvisoryLayout />,
      children: [
        { path: "dashboard", element: <BusinessAdvisoryDashboard /> },
        { path: "manage-data", element: <BusinessAdvisoryManageData /> },
        { path: "notification", element: <BusinessAdvisoryNotification /> },
        { path: "account", element: <BusinessAdvisoryAccount /> },
        { path: "analytics", element: <BusinessAdvisoryAnalytics /> },
        { path: "reports", element: <BusinessAdvisoryReports /> },
        {
          path: "roles-permission",
          element: <BusinessAdvisoryRolesPermission />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
