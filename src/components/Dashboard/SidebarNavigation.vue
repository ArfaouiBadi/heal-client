<template lang="html">
  <div class="navigationContainer">
    <div class="logoContainer" @click.prevent="handleClick">
      <h4>Healverse</h4>
    </div>
    <div class="navItemContainer">
      <div class="productRoutes">
        <router-link to="/" class="recoverPassword" exact>
          <SidebarNavItem text="Home" customClass="pi pi-home" />
        </router-link>
        <router-link to="/dashboard/product" class="recoverPassword" exact>
          <SidebarNavItem
            text="Products"
            customClass="pi pi-cart-plus"
            :isActive="$route.path === '/'"
          />
        </router-link>
        <router-link to="/dashboard/home" class="recoverPassword" exact>
          <SidebarNavItem
            text="Dashboard"
            customClass="pi pi-chart-bar"
            :isActive="$route.path === '/dashboard/product'"
          />
        </router-link>
      </div>
      <div class="profileSettings">
        <router-link to="/dashboard/profile" class="recoverPassword">
          <SidebarNavItem
            text="Profile"
            customClass="pi pi-user"
            :isActive="$route.path == 'http://localhost:5173/dashboard/home'"
          />
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
.active {
  background-color: #14a800;
  cursor: pointer;
}
.router-link-actives {
  background-color: #14a800;
  cursor: pointer;
}
.logoContainer {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f4f4f4;
  font-weight: 900;
  margin: 20% 0;
  font-family: "Lobster", sans-serif;
  font-style: normal;
}
.logoContainer h4 {
  font-family: "Lobster", sans-serif;
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
