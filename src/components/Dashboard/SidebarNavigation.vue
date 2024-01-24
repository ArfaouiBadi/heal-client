<template lang="" scope>
  <div class="navigationContainer">
    <div class="logoContainer" @click.prevent="handleClick">
      <h4>HEAL</h4>
    </div>
    <div class="navItemContainer">
      <i class="pi-calendar" />
      <SidebarNavItem
        text="Products"
        customClass="pi pi-cart-plus"
        href="dashboard/product"
      />
      <SidebarNavItem text="Category" customClass="pi pi-list" href="signin" />
      <SidebarNavItem
        text="Sub category"
        customClass="pi pi-sort-amount-down-alt"
        href="signup"
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
  methods: {
    handleClick() {
      this.$router.push("/dashboard");
    },
  },
};
</script>
<style lang="css" scoped>
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
h4 {
  cursor: pointer;
  font-weight: 500;
}

.navItemContainer {
  flex: 10;
}
</style>
