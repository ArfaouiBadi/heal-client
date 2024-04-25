<template>
  <div class="navBar">
    <Sidebar v-model:visible="isNavbarCollapsed" header="" class="">
      <div class="navItems">
        <router-link
          to="/"
          class="routerLink navItem hover-underline-animation"
        >
          Home
        </router-link>
        <router-link
          to="/auth/Signin"
          class="routerLink navItem hover-underline-animation"
        >
          Signin
        </router-link>
        <router-link
          to="/auth/Signup"
          class="routerLink navItem hover-underline-animation"
        >
          Signup
        </router-link>

        <div class="navItem hover-underline-animation">
          <a href="">About</a>
        </div>
        <div class="navItem hover-underline-animation">
          <a href="">Contact</a>
        </div>
      </div>
    </Sidebar>
    <Button
      icon="pi pi-bars"
      @click="isNavbarCollapsed = true"
      class="collapser"
    />

    <div class="navItemAuth">
      <router-link to="/auth/Signup" class="routerLink"
        ><ButtonAuth msg="Signup"
      /></router-link>
      <router-link to="/auth/Signin" class="routerLink"
        ><ButtonAuth msg="Signin"
      /></router-link>
    </div>
  </div>
</template>

<script lang="ts">
import ButtonAuth from "./ButtonAuth.vue";
import Sidebar from "primevue/sidebar";
import Button from "primevue/button";
export default {
  components: {
    ButtonAuth,
    Sidebar,
    Button,
  },
  data() {
    return {
      isNavbarCollapsed: false,
    };
  },
  methods: {
    toggleNavbar() {
      this.isNavbarCollapsed = !this.isNavbarCollapsed;
    },
  },
};
</script>

<style lang="css">
/* Add this new class to control visibility when collapsed */
.navItems.collapsed {
  display: none;
}
.routerLink {
  text-decoration: none;
}
/* Style for the toggle button */
.toggleButton {
  font-size: 20px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 10px;
}

.navItem a {
  text-decoration: none;
  color: black;
}

.navItemAuth {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center;
}

.navBar {
  display: flex;
  height: 80px;
  background-color: white;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 30px;
}

.navItems {
  display: flex;
  flex-direction: column;

  background-color: white;
  width: 100%;
}
.collapser {
  border: none;
  background-color: #14a800;
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
  margin-right: 10px;
}
.navItem {
  margin-right: 10%;
  color: black;
  font-size: 15px;
  font-family: "Poppins";
  font-weight: 500;
  padding-bottom: 5%;
}

/* Media query for small screens */
@media screen and (max-width: 600px) {
  .navItemAuth {
    display: none;
  }

  .navItems.collapsed {
    display: flex;
  }

  .navItem {
    padding: 10px;
  }
}
.hover-underline-animation {
  display: inline-block;
  position: relative;
  color: black;
}

.hover-underline-animation::after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: black;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}
</style>
