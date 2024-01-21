import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home.vue";
import Signin from "./Signin.vue";
import Signup from "./Signup.vue";
import Dashboard from "./Dashboard/Dashboard.vue";
import DashboardProduct from "./Dashboard/DashboardProduct.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/signin",
      component: Signin,
    },
    {
      path: "/signup",
      component: Signup,
    },
    {
      path: "/dashboard",
      component: Dashboard,
      children: [
        {
          path: "product",
          component: DashboardProduct,
        },
      ],
    },
  ],
});
export default router;
