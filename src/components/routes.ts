import { createRouter, createWebHistory } from "vue-router";
import Home from "./Home.vue";
import Signin from "./Signin.vue";
import Signup from "./Signup.vue";

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
  ],
});
export default router;
