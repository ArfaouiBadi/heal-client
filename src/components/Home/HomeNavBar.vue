<template>
  <div class="navbarWrapper">
    <div class="navbarLeftItems">
      <div class="navbarLogo">HEAL</div>
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
      <div class="cart navbarRightItemsContainer">
        <div class="circleContainer">
          <i class="pi pi-shopping-cart" />
        </div>
        <div class="content">Cart</div>
      </div>

      <div class="login navbarRightItemsContainer">
        <div class="circleContainer">
          <i class="pi pi-user" />
        </div>
        <div class="content">Login</div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import InputText from "primevue/inputtext";

export default {
  components: {
    InputText,
  },
  data() {
    return {
      value1: "",
    };
  },
};
</script>
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
  font-family: "poppins";
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
  width: 40px;
  height: 40px;
  background-color: #f4f4f4;
  border-radius: 50%;
  /* Adjust the background color as needed */
  margin-right: 5px;
  transition: all 0.4s ease-in-out;
}
.circleContainer:hover {
  background-color: white;
}
</style>
