<template>
  <div class="navBar">
    <button class="toggleButton" @click="toggleNavbar">&#9776;</button>
    <div class="navItems" :class="{ collapsed: isNavbarCollapsed }">
      <div class="navItem"><a href="">Home</a></div>
      <div class="navItem"><a href="">About</a></div>
      <div class="navItem"><a href="">Contact</a></div>
    </div>
    <div class="navItemAuth">
      <ButtonAuth msg="Signup" />
      <ButtonAuth msg="Signin" />
    </div>
  </div>
</template>

<script lang="ts">
import ButtonAuth from "./ButtonAuth.vue";

export default {
  components: {
    ButtonAuth,
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
  justify-content: flex-end;
  padding-right: 60px;
}

.navBar {
  display: flex;
  height: 15%;
  background-color: white;
  width: 100%;
  justify-content: space-between;
}

.navItems {
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  padding-left: 50px;
}

.navItem {
  padding-left: 10%;
  color: black;
  font-size: 15px;
  font-family: "Poppins";
  font-weight: 500;
}

/* Media query for small screens */
@media screen and (max-width: 600px) {
  .navItems {
    flex-direction: column;
    align-items: flex-start;
    position: absolute;
    top: 60px;
    left: 0;
    background-color: white;
    width: 100%;
    text-align: left;
    display: none;
  }

  .navItems.collapsed {
    display: flex;
  }

  .navItem {
    padding: 10px;
  }
}
</style>
