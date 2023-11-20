import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/Error";
import Home from "../pages/Home";
import Layout from "../pages/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
    errorElement: (
      <Layout>
        <ErrorPage />
      </Layout>
    ),
  },
  {
    path: "/particles",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/aeroporto",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/cruzeiro",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/about",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
]);

export default router;
