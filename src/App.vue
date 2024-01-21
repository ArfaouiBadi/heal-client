<template>
  <router-view></router-view>
</template>

<script lang="ts">
import Auth from "./components/Auth.vue";
import Signin from "./components/Signin.vue";
import Navbar from "./components/Navbar.vue";
import Dashboard from "./components/Dashboard/Dashboard.vue";
import SidebarNavigation from "./components/Dashboard/SidebarNavigation.vue";
import DashboardNavbar from "./components/Dashboard/DashboardNavbar.vue";
import SidebarNavItem from "./components/Dashboard/SidebarNavItem.vue";

export default {
  components: {
    Signin,
    Auth,
    Navbar,
    Dashboard,
    SidebarNavigation,
    DashboardNavbar,
    SidebarNavItem,
  },
};
</script>
<style lang=""></style>
