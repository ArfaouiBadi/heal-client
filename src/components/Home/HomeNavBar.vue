<template>
  <div class="navbarWrapper">
    <div class="navbarLeftItems">
      <div class="navbarLogo">HEAL</div>
      <div class="search"></div>
    </div>
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
export default {};
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
  padding: 18px;
  margin: 15px;
  border-radius: 20px;
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
  
  padding: 3px 10px;
  border-radius: 30px;
  border: 1px solid #f4f4f4;
  background-color: #f4f4f4;
  cursor: pointer;
}
.navbarRightItemsContainer:hover{
  border-radius: 30px;
  transition: all 0.3s ease-in-out;
  background-color: #f4f4f1;
  border: 1px solid #16330044;
  
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
  border-radius: 50%;
   /* Adjust the background color as needed */
  margin-right: 5px;
}
</style>
