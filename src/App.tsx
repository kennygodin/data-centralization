import "./App.css";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { SigninPage } from "./pages/sign-in/page";
import { ContributorLayout } from "./components/layouts/contributor";
import { ContributorDashboard } from "./pages/contributor/dashboard";
import { ContributorManageData } from "./pages/contributor/manage-data";
import { ContributorAccount } from "./pages/contributor/account";
import { ContributorNotification } from "./pages/contributor/notification";

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
      path: "/contributor",
      element: <ContributorLayout />,
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
