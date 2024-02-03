import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home/Home.vue";
import Signin from "./Signin.vue";
import Signup from "./Signup.vue";
import Dashboard from "./Dashboard/Dashboard.vue";
import DashboardProduct from "./Dashboard/DashboardProduct.vue";
import DashboardHome from "./Dashboard/DashboardHome.vue";
import Auth from "./Auth.vue";
import HomeCart from "./Home/HomeCart/HomeCart.vue";
import HomeLanding from "./Home/HomeLanding/HomeLanding.vue";
import DashboardProfile from "./Dashboard/DashboardProfile.vue";
import success from "./Home/HomeCart/success.vue";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      children: [
        {
          path: "",
          component: HomeLanding,
        },
        {
          path: "cart",
          component: HomeCart,
          meta: { requiresAuth: true },
        },
      ],
    },
    {
      path: "/auth",
      component: Auth,

      children: [
        {
          path: "signin",
          component: Signin,
          props: true,
        },
        {
          path: "signup",
          component: Signup,
          props: true,
        },
      ],
    },

    {
      path: "/dashboard",
      component: Dashboard,
      props: true,
      meta: { requiresAuth: true },
      children: [
        {
          path: "product",
          component: DashboardProduct,
          props: true,
        },
        {
          path: "home",
          component: DashboardHome,
          props: true,
        },
        {
          path: "profile",
          component: DashboardProfile,
          props: true,
        },
      ],
    },
    {
      path: "/product/success",
      component: ProductSuccess,
    },
    {
      path: "/plan/success",
      component: PlanSuccess,
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
    next("auth/signin");
  } else {
    next();
  }
});
export default router;
