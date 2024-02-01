<template lang="html">
  <div class="authComponent">
    <Navbar />
    <div class="Wrapper">
      <div class="authContainer">
        <div class="imgContainer">
          <img src="../assets/signin2.png" alt="Auth Image" />
        </div>
      </div>
      <div class="mainContainer">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Navbar from "./Navbar.vue";
export default {
  components: {
    Navbar,
  },
};
</script>
<style lang="css">
.authComponent {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.imgContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.imgContainer img {
  padding-top: 40px;
  width: 70%;
}

.authContainer {
  height: 85%;
  width: 50%;
  display: flex;
  flex-direction: row;
}
.mainContainer {
  width: 50%;
}
.Wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
}
</style>
