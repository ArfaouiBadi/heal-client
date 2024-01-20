<template>
  <a class="authButton" :href="msg">{{ msg }}</a>
</template>
<script lang="ts">
export default {
  props: ["msg"],
};
</script>
<style lang="css" scoped>
.authButton {
  border: none;
  color: #4461f2;
  background-color: white;
  border: 1px solid #4461f2;
  border-radius: 20px;
  background-size: 100% auto;
  font-family: "Poppins";
  font-size: 15px;
  margin-left: 40px;
  font-weight: 200;
  height: 40px;
  width: 100px;
  padding: 0.6em 1.5em;
  cursor: pointer;
  text-decoration: none;

  text-align: center;
}
.authButton:active {
  color: white;
  background-color: #4461f2;
}
.authButton:hover {
  background-position: right center;

  background-size: 200% auto;
  -webkit-animation: pulse 2s infinite;
  animation: pulse512 1.5s infinite;
}
.authButton:focus {
  background-position: right center;

  background-size: 200% auto;
  -webkit-animation: pulse 2s infinite;
  animation: pulse512 1.5s infinite;
}

@keyframes pulse512 {
  0% {
    box-shadow: 0 0 0 0 #b6c2ff;
  }

  70% {
    box-shadow: 0 0 0 10px rgb(218 103 68 / 0%);
  }

  100% {
    box-shadow: 0 0 0 0 rgb(218 103 68 / 0%);
  }
}
</style>
