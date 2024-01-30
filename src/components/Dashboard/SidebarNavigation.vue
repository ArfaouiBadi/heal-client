<template lang="" scope>
  <div class="navigationContainer">
    <div class="logoContainer" @click.prevent="handleClick">
      <h4>HEAL</h4>
    </div>
    <div class="navItemContainer">
      <i class="pi-calendar" />
      <router-link to="dashboard/product" class="recoverPassword"
        ><SidebarNavItem text="Products" customClass="pi pi-cart-plus"
      /></router-link>
      <router-link to="/Signin" class="recoverPassword"
        ><SidebarNavItem text="Category" customClass="pi pi-list"
      /></router-link>

      <SidebarNavItem
        text="Sub category"
        customClass="pi pi-sort-amount-down-alt"
        href="signup"
      />
      <router-link to="/Dashboard" class="recoverPassword"
        ><SidebarNavItem text="Dashboard" customClass="pi pi-chart-bar"
      /></router-link>
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
