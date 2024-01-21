<template lang="">
  <div class="navigationContainer">
    <div class="logoContainer">Heal</div>
    <div class="navItemContainer">
      <SidebarNavItem text="Products" customClass="pi-cart-plus" href="badi" />
      <SidebarNavItem text="Category" customClass="pi-circle" href="badi" />
      <SidebarNavItem
        text="Sub category"
        customClass="pi pi-bell"
        href="badi"
      />
    </div>
  </div>
</template>
<script lang="ts">
import SidebarNavItem from "./SidebarNavItem.vue";
export default {
  components: {
    SidebarNavItem,
  },
};
</script>
<style lang="css">
.navigationContainer {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.logoContainer {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f4f4f4;
  font-weight: 900;
  font-variant: small-caps;
}
.navItemContainer {
  flex: 10;
}
</style>
