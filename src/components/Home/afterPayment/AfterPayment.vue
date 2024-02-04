<template lang="html">
  <div>
    <router-view></router-view>
  </div>
</template>
<script setup lang="ts"></script>
<style lang="css">
.failedWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}
.afterpaymentContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  width: 40%;
}
.afterpaymentWrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
}
.failedContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  width: 40%;
}
.afterPaymenttext {
  margin-top: 20px;
  font-size: 20px;
  font-weight: 600;
  color: #21c179;
}
.afterPaymentspan {
  margin-top: 20px;
  font-size: 17px;
  color: #b1b1b1;
  font-weight: 300;
}
.afterPaymentimg {
  width: 200px;
}
.failed {
  color: #fc7474;
}

.loader {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: calc(-20px / 2) 0 0 calc(-20px / 2); /* Assuming $loader-size is 40px */
  width: calc(40px - 2);
  height: calc(40px - 2);
  background-color: rgb(255, 255, 255);
  border-radius: 50%;
  box-shadow: 0 0 0 6px rgb(20, 20, 20);
}

.loader::before,
.loader::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  display: block;
  margin: calc(-20px / 2) 0 0 calc(-20px / 2); /* Assuming $loader-size is 40px */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transform: translate3d(0, 0, 0);
}

.loader::before {
  background-color: rgb(24, 24, 24);
  animation: expand 1.6s ease-out infinite both;
}

.loader::after {
  background-color: rgb(255, 255, 255);
  animation: expand 1.6s ease-out 0.8s infinite both;
}

@keyframes expand {
  0% {
    z-index: 2;
    transform: scale(0);
  }
  50% {
    z-index: 1;
    transform: scale(1);
  }
  100% {
    z-index: 0;
  }
}
</style>
