<template lang="html">
  <div class="authComponent">
    <Navbar />
    <div class="authContainer">
      <div class="imgContainer">
        <img src="../assets/authImg.png" alt="" />
      </div>
      <Signin />
    </div>
  </div>
</template>
<script lang="ts">
import Signin from "./Signin.vue";
import Navbar from "./Navbar.vue";
export default {
  components: {
    Signin,
    Navbar,
  },
};
</script>
<style lang="css">
.imgContainer {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.imgContainer img {
  width: 70%;
}
.authComponent {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.authContainer {
  height: 85%;
  display: flex;
  flex-direction: row;
}
</style>
