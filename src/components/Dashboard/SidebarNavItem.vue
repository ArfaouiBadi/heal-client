<template>
  <div class="navItem">
    <i :class="props.customClass" />
    <div>{{ props.text }}</div>
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
  isActive: {
    type: Boolean,
    required: false,
    default: false,
  },
});
</script>

<style lang="css" scoped>
.active {
  background-color: #14a800;
  cursor: pointer;
}
.router-link-actives {
  background-color: #14a800;
  cursor: pointer;
}
.navItem {
  border-radius: 13px;
  width: 80%;
  margin: 20px auto;
  height: 50px;
  padding: 0 0 0 15px;
  color: white;
  display: flex;
  align-items: center;
  font-size: 16px;
  transition: background-color 0.3s ease-in-out;
}
.active-link {
  background-color: #14a800;
  cursor: pointer;
}

.navItem:hover {
  background-color: #14a800;
  cursor: pointer;
}

.navItem a {
  color: white;
  text-decoration: none; /* Remove default underline */
}

.navItem i {
  font-size: 23px;
  margin-right: 5%;
}
</style>
