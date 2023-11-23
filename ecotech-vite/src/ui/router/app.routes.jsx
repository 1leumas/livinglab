import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/Error";
import Home from "../pages/Home";
import Layout from "../pages/layout";
import About from "../pages/About";
import DynamicPage from "../pages/ParticlesStationPages";

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
        <DynamicPage />
      </Layout>
    ),
  },
  {
    path: "/aeroporto",
    element: (
      <Layout>
        <DynamicPage />
      </Layout>
    ),
  },
  {
    path: "/cruzeiro",
    element: (
      <Layout>
        <DynamicPage />
      </Layout>
    ),
  },
  {
    path: "/about",
    element: (
      <Layout>
        <About />
      </Layout>
    ),
  },
]);

export default router;
