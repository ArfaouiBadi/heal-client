<template>
  <div class="homeWrapper">
    <HomeNavBar />
    <HomeThumbnail />
    <HomeCategories />
    <home-brands />
    <HomeBestDealsProduct :products="products" />
  </div>
</template>

<script lang="ts" scoped>
import HomeNavBar from "./HomeNavBar.vue";
import HomeThumbnail from "./HomeThumbnail.vue";
import HomeCategories from "./HomeCategories.vue";
import HomeBestDealsProduct from "./HomeBestDealsProduct.vue";
import HomeBrands from "./HomeBrands.vue"; // Corrected component name
import axios from "axios";
export default {
  components: {
    HomeNavBar,
    HomeThumbnail,
    HomeCategories,
    HomeBestDealsProduct,
    HomeBrands, // Corrected component name
  },
  data() {
    return {
      products: [],
    };
  },
  mounted() {
    this.fetchDataProducts();
  },
  methods: {
    async fetchDataProducts() {
      try {
        const response = await axios.get(`http://localhost:3000/products`);
        // Check if the response status is OK (status code 200)
        if (response.status === 200) {
          this.products = response.data;
        } else {
          console.error(`Failed to fetch products. Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  },
};
</script>

<style lang="css" scoped>
.homeWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: white;
  font-family: "poppins";
  font-weight: 300;
  font-style: normal;
  font-size: 1.3rem;
}
</style>
