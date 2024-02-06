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
import ProductSuccessVue from "./Home/afterPayment/ProductSuccess.vue";
import PlanSuccessVue from "./Home/afterPayment/PlanSuccess.vue";
import ProductFailedVue from "./Home/afterPayment/ProductFailed.vue";
import PlanFailedVue from "./Home/afterPayment/PlanFailed.vue";
import afterPaymentVue from "./Home/afterPayment/AfterPayment.vue";
import Test from "../Test.vue";
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
      path: "/afterpayment",
      component: afterPaymentVue,
      children: [
        {
          path: "product/success",
          component: ProductSuccessVue,
        },
        {
          path: "plan/success",
          component: PlanSuccessVue,
        },
        {
          path: "product/failed",
          component: ProductFailedVue,
        },
        {
          path: "plan/failed",
          component: PlanFailedVue,
        },
      ],
    },
    {
      path: "/test",
      component: Test,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "",
    },
  ],
  linkActiveClass: "active",
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
