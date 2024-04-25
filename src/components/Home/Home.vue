<template>
  <div class="homeWrapper">
    <HomeNavBar />
    <router-view></router-view>
    <HomePricingPlan />
    <Footer />
  </div>
</template>

<script lang="ts" scoped>
import HomeNavBar from "./HomeNavBar.vue";
import HomePricingPlan from "./HomePricingPlan.vue";
import Footer from "../Footer/Footer.vue";
export default {
  components: {
    HomeNavBar,
    HomePricingPlan,
    Footer,
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
