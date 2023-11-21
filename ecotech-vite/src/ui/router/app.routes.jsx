import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/Error";
import Home from "../pages/Home";
import Particles from "../pages/Particles";
import Aeroporto from "../pages/Aeroporto";
import Cruzeiro from "../pages/Cruzeiro";
import Layout from "../pages/layout";
import About from "../pages/About";

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
        <Particles />
      </Layout>
    ),
  },
  {
    path: "/aeroporto",
    element: (
      <Layout>
        <Aeroporto />
      </Layout>
    ),
  },
  {
    path: "/cruzeiro",
    element: (
      <Layout>
        <Cruzeiro />
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
