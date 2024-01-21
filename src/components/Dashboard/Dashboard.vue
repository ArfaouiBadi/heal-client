<template lang="">
  <div class="DashboardWrapper">
    <div class="sideBarNavigationContainer">
      <SidebarNavigation />
    </div>
    <div class="DashboardContent">
      <div class="DashboardContentWrapper">
        <div class="DashboardNavbarContainer">
          <DashboardNavbar />
        </div>

        <div class="DashboardMainContent">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import SidebarNavigation from "./SidebarNavigation.vue";
import DashboardNavbar from "./DashboardNavbar.vue";
export default {
  components: {
    SidebarNavigation,
    DashboardNavbar,
  },
};
</script>
<style lang="css">
.DashboardWrapper {
  display: flex;
  flex-direction: row;
  height: 100vh;
  font-family: "Nunito", sans-serif;
  font-optical-sizing: auto;
  font-weight: 500;
  font-style: normal;
}
.sideBarNavigationContainer {
  width: 20%;
  flex: 1;
  background-color: #1c2729;
}
.DashboardContent {
  display: flex;
  flex-direction: row;
  flex: 4;
}

.DashboardContentWrapper {
  display: flex;
  flex-direction: column;

  width: 100%;
}
.DashboardNavbarContainer {
  width: 100%;
  flex: 1;
}
.DashboardMainContent {
  flex: 12;
  background-color: #f5f5f5;
}
</style>
