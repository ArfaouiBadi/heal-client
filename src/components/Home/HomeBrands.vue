<template lang="html">
  <div class="Wrapper">
    <div class="Header">
      <h1>Featured Brands</h1>
      <h5>SEE ALL<i class="pi pi-arrow-right" /></h5>
    </div>
    <div class="brandsWrapper">
      <Brand />
      <Brand />
      <Brand />
      <Brand />
      <Brand />
    </div>
  </div>
</template>
<script lang="ts">
import Brand from "./Brand.vue";
export default {
  components: {
    Brand,
  },
};
</script>
<style lang="css" scoped>
.Wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #163300;
  padding: 50px;
}
.brandsWrapper {
  width: 100%;
  padding: 50px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  color: #163300;
}

.Header {
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
  padding: 50px;
  justify-content: space-between;
  height: 100%;
}

@media only screen and (max-width: 780px) {
  h1 {
    font-size: 30px;
  }
  h5 {
    font-size: 15px;
  }
}
</style>
