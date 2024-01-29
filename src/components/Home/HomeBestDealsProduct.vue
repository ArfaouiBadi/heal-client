<template lang="html">
  <div class="Wrapper">
    <div class="Header">
      <h1>Todays best <br />deals for you!</h1>
      <h5>SEE ALL PRODUCTS <i class="pi pi-arrow-right" /></h5>
    </div>
    <div class="mainContent">
      <ProductCard v-for="product in products" :product="product!" />
    </div>
  </div>
</template>
<script lang="ts" scoped>
import ProductCard from "./ProductCard.vue";
export default {
  components: {
    ProductCard,
  },
  props: {
    products: Array,
  },
  data() {
    return {
      product: {},
    };
  },
  mounted() {
    console.log(this.products);
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
  flex: 1 0 15%;
  padding: 50px;
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
.mainContent {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  justify-content: center;
  padding: 50px;
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
