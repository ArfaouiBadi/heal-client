<template>
  <div class="navbarWrapper">
    <div class="navbarLeftItems">
      <div class="navbarLogo">Healverse</div>
    </div>
    <nav class="navbarSearch">
      <span class="p-input-icon-left searchWrapper">
        <i class="pi pi-search" />
        <InputText
          v-model="value1"
          placeholder="Medecine and healthcare products "
          class="search"
        />
      </span>
    </nav>
    <div class="navbarRightItems">
      <router-link
        to="/dashboard"
        class="navbarRightItemsContainer"
        v-if="userToken"
      >
        <div class="login" v-if="checkAutorizationToDashboard()">
          <div class="circleContainer">
            <i class="pi pi-chart-bar" />
          </div>
          <div class="content">Dashboard</div>
        </div>
      </router-link>
      <router-link to="/" class="navbarRightItemsContainer">
        <div class="cart">
          <div class="circleContainer">
            <i class="pi pi-home" />
          </div>
          <div class="content">Home</div>
        </div>
      </router-link>
      <router-link to="/cart" class="navbarRightItemsContainer">
        <div class="cart">
          <div class="circleContainer">
            <i
              class="pi pi-shopping-cart"
              v-badge="cartStore.$state.cart.products.length"
            />
          </div>
          <div class="content">Cart</div>
        </div>
      </router-link>

      <router-link
        to="/auth/signin"
        class="navbarRightItemsContainer"
        v-if="!userToken"
      >
        <div class="login">
          <div class="circleContainer">
            <i class="pi pi-user" />
          </div>
          <div class="content">Login</div>
        </div>
      </router-link>
      <router-link to="/" class="navbarRightItemsContainer" v-else>
        <div class="login">
          <div class="circleContainer">
            <i class="pi pi-user" />
          </div>
          <div class="content" @click="handleLogout">Logout</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import InputText from "primevue/inputtext";
import { useCartStore } from "../../store/cart";
import { useUserStore } from "../../store/user";

export default {
  components: {
    InputText,
  },
  data() {
    return {
      value1: "",
      userToken: localStorage.getItem("token"),
      cartStore: useCartStore(),
      userStore: useUserStore(),
      autorizedToDashboard: false,
    };
  },
  methods: {
    handleLogout() {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      this.userToken = null; // Update the user property to trigger the v-if condition
      this.$router.push("/");
    },
    checkAutorizationToDashboard() {
      if (
        this.userStore.user.role === "ADMIN" ||
        this.userStore.user.plan !== "FREE"
      ) {
        this.autorizedToDashboard = true;
      } else {
        this.autorizedToDashboard = false;
      }
      return this.autorizedToDashboard;
    },
  },
  watch: {
    user(newVal) {
      this.userToken = newVal;
    },
    
  },
  created() {
    this.userToken = localStorage.getItem("token");
  },
  mounted() {
    this.userStore.loadUser();
  },
};
</script>

<style lang="css" scoped>
/* ... (existing styles) */
</style>

<style lang="css" scoped>
.navbarWrapper {
  background-color: #f4f4f4;
  height: 100%;
  width: 99%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  padding: 18px 50px;
  margin: 15px;
  border-radius: 20px;
}
.navbarLeftItems {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 50%;
  width: 20%;
}

.searchWrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
  padding: 0 10px;
}
.searchWrapper i {
  padding-left: 10px;
}
.search {
  width: 150%;
  border-radius: 20px;
  border: none;
}
.search::placeholder {
  font-size: 10px;
}

.navbarRightItems {
  display: flex;
  flex-direction: row;
}
.login {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.cart {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 5%;
}
.navbarRightItemsContainer {
  border-radius: 30px;
  border: 1px #f4f4f4 solid;
  background-color: #f4f4f4;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  color: #163300;
  text-decoration: none;
}
.navbarRightItemsContainer:hover {
  border-radius: 30px;
  transition: all 0.3s ease-in-out;
  background-color: white;
  border: 1px white solid;
}
.content {
  padding-right: 5px;
  font-weight: 400;
}
.navbarLogo {
  font-size: 30px;
  font-weight: 600;
  font-style: normal;
  font-family: "Lobster", sans-serif;

  font-style: normal;
  color: #163300;
  user-select: none;
  cursor: pointer;
}
i {
  font-size: 18px;
}
.circleContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 40px;
  background-color: #f4f4f4;
  border-radius: 50%;

  margin-right: 5px;
  transition: all 0.4s ease-in-out;
}
.circleContainer:hover {
  background-color: white;
}
</style>
