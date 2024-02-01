<template lang="html">
  <div class="navigationContainer">
    <div class="logoContainer" @click.prevent="handleClick">
      <h4>HEAL</h4>
    </div>
    <div class="navItemContainer">
      <div class="productRoutes">
        <router-link
          to="/"
          class="recoverPassword"
          exact
          active-class="active-link"
        >
          <SidebarNavItem text="Home" customClass="pi pi-home" />
        </router-link>
        <router-link
          to="/dashboard/product"
          class="recoverPassword"
          exact
          active-class="active-link"
        >
          <SidebarNavItem text="Products" customClass="pi pi-cart-plus" />
        </router-link>
        <router-link
          to="/dashboard/home"
          class="recoverPassword"
          exact
          active-class="active-link"
        >
          <SidebarNavItem text="Dashboard" customClass="pi pi-chart-bar" />
        </router-link>

        <!--
          <router-link
          to="/dashboard/category"
          class="recoverPassword"
          active-class="active-link"
        >
          <SidebarNavItem text="Category" customClass="pi pi-list" />
        </router-link>
        <router-link
          to="/dashboard/subcategory"
          class="recoverPassword"
          active-class="active-link"
        >
          <SidebarNavItem
            text="Sub category"
            customClass="pi pi-sort-amount-down-alt"
          />
        </router-link>
        -->
      </div>
      <div class="profileSettings">
        <router-link
          to="/dashboard/profile"
          class="recoverPassword"
          active-class="active-link"
        >
          <SidebarNavItem text="Profile" customClass="pi pi-user" />
        </router-link>

        <SidebarNavItem text="Settings" customClass="pi pi-cog" />
      </div>
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
  setup() {
    return {};
  },
};
</script>

<style lang="css" scoped>
.navigationContainer {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex-wrap: wrap;
}

.logoContainer {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f4f4f4;
  font-weight: 900;
  font-variant: small-caps;
  margin: 20% 0;
}

h4 {
  cursor: pointer;
  font-weight: 500;
}

.navItemContainer {
  flex: 10;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.active-link {
  background-color: #14a800;
  cursor: pointer;
}
</style>
