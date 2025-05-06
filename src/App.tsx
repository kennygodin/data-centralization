import "./App.css";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { SigninPage } from "./pages/sign-in/page";
import { BusinessAdvisoryLayout } from "./components/layouts/business-advisory";
import { ContributorDashboard } from "./pages/business-advisory/dashboard";
import { ContributorManageData } from "./pages/business-advisory/manage-data";
import { ContributorAccount } from "./pages/business-advisory/account";
import { ContributorNotification } from "./pages/business-advisory/notification";

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
      path: "/business-advisory",
      element: <BusinessAdvisoryLayout />,
      children: [
        { path: "dashboard", element: <ContributorDashboard /> },
        { path: "manage-data", element: <ContributorManageData /> },
        { path: "notification", element: <ContributorNotification /> },
        { path: "account", element: <ContributorAccount /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
