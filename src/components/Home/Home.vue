<template>
  <div class="homeWrapper">
    <HomeNavBar />
    <router-view></router-view>
  </div>
</template>

<script lang="ts" scoped>
import HomeNavBar from "./HomeNavBar.vue";
export default {
  components: {
    HomeNavBar,
  },
};
</script>

<style lang="css" scoped>
.homeWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: white;
  font-family: "poppins";
  font-weight: 300;
  font-style: normal;
  font-size: 1.3rem;
}
</style>
