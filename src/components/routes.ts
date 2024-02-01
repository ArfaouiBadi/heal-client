import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home/Home.vue";
import Signin from "./Signin.vue";
import Signup from "./Signup.vue";
import Dashboard from "./Dashboard/Dashboard.vue";
import DashboardProduct from "./Dashboard/DashboardProduct.vue";
import DashboardHome from "./Dashboard/DashboardHome.vue";
import Auth from "./Auth.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/auth",
      component: Auth,
      children: [
        {
          path: "signin",
          component: Signin,
        },
        {
          path: "signup",
          component: Signup,
        },
      ],
    },

    {
      path: "/dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: "product",
          component: DashboardProduct,
        },
        {
          path: "home",
          component: DashboardHome,
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "",
    },
  ],
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  // If the route requires authentication and the user is not authenticated, redirect to the signin page
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/signin");
  } else {
    next();
  }
});
export default router;
