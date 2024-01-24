<template>
  <p>{{ counter.count }}</p>
</template>

<script lang="ts" setup>
import { useCounterStore } from "../stores/counter.js";
const counter = useCounterStore();
counter.$patch({ count: counter.count + 4 });
counter.increment();
</script>
