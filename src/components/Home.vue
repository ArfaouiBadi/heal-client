<template>
  <p>{{ counter.count }}</p>
</template>

<script lang="ts" setup>
import { useStore } from "../stores/store.js";
const counter = useStore();
counter.$patch({ count: counter.count + 4 });
counter.increment();
</script>
../stores/tore.js
