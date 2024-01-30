<template lang="html">
  <div class="brandWrapper">
    <div class="Circle">
      <img :src="brand!.image" />
    </div>
    <p>{{ brand!.name }}</p>
  </div>
</template>
<script lang="ts" scoped>
import { Brand } from "../../interface/types";

export default {
  props: {
    brand: Object as () => Brand,
  },
};
</script>
<style lang="css" scoped>
.brandWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #163300;
  margin: 10px;
}
.Circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
}
.Circle img {
  width: 90%;
}
p {
  font-size: 15px;
  font-weight: 500;
}
</style>
