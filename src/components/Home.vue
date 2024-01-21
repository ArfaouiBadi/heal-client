<template>
  <Password v-model="value" toggleMask />
</template>

<script lang="ts" setup>
import { ref } from "vue";
import Password from "primevue/password";
const value = ref(null);
</script>
