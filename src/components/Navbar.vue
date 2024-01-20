<template>
  <div class="navBar">
    <div class="navItems">
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
};
</script>
<style lang="css">
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
  padding-left: 60px;
  color: black;
  font-size: 15px;
  font-family: "Poppins";
  font-weight: 500;
}
</style>
