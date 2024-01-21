<template>
  <div class="navItem">
    <i :class="props.customClass" />

    <a :href="props.href">{{ props.text }}</a>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  customClass: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
});
</script>

<style lang="css">
.navItem {
  border-radius: 13px;
  width: 80%;
  margin: 10px auto;
  height: 50px;
  padding: 0 0 0 15px;
  color: white;
  display: flex;
  align-items: center;
  font-size: 16px;
  transition: background-color 0.4s ease-in-out;
}
.navItem:hover {
  background-color: #4461f2;
  cursor: pointer;
  
}
.navItem a {
  color: white;
}
.navItem i {
  font-size: 23px;
  margin-right: 5%;
}
</style>
