<template lang="html">
  <HomeThumbnail
    text="Parapharmacy"
    image="https://i.ibb.co/2j4TZ1B/doctor1.png"
  />
  <HomePescription v-if="this.user.plan.name !== 'Free'" />
  <home-brands />
  <HomeBestDealsProduct :products="products" :categories="categories" />
</template>
<script lang="ts">
import HomeThumbnail from "../HomeThumbnail.vue";
import HomePescription from "../HomePescription.vue";
import HomeBrands from "../HomeBrands.vue";
import HomeBestDealsProduct from "../HomeBestDealsProduct.vue";
import axios from "axios";
export default {
  components: {
    HomeThumbnail,
    HomePescription,
    HomeBrands,
    HomeBestDealsProduct,
  },
  data() {
    return {
      products: [],
      categories: [],
      user: {
        plan: {
          name: "",
        },
      },
    };
  },
  mounted() {
    this.fetchDataProducts();
    this.fetchDataCategories();
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user.plan.name);
  },
  methods: {
    async fetchDataProducts() {
      const user = JSON.parse(localStorage.getItem("user"));

      try {
        const response = await axios.get(`http://localhost:3000/products`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            user: user.role,
          },
        });
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
    async fetchDataCategories() {
      try {
        const response = await axios.get(
          `http://localhost:3000/Category/Names`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        // Check if the response status is OK (status code 200)
        if (response.status === 200) {
          this.categories = response.data;
        } else {
          console.error(
            `Failed to fetch categories. Status: ${response.status}`
          );
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    },
  },
};
</script>
<style lang="css"></style>
