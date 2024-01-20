<template>
  <router-view></router-view>
</template>

<script lang="ts">
import Auth from "./components/Auth.vue";
import Signin from "./components/Signin.vue";
import Navbar from "./components/Navbar.vue";

export default {
  components: {
    Signin,
    Auth,
    Navbar,
  },
};
</script>
<style lang=""></style>
