<template lang="html">
  <div class="Wrapper">
    <div class="Header">
      <h1>Featured Brands</h1>
      <h5 class="hover-underline-animation texxt">
        SEE ALL<i class="pi pi-arrow-right" />
      </h5>
    </div>
    <div class="brandsWrapper">
      <Brand v-for="brand in brands" :brand="brand!" />
    </div>
  </div>
</template>
<script lang="ts">
import Brand from "./Brand.vue";
import axios from "axios";
export default {
  components: {
    Brand,
  },
  data() {
    return {
      brands: [],
    };
  },
  methods: {
    async fetchAllBrands() {
      try {
        const response = await axios.get(`http://localhost:3000/brand`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // Check if the response status is OK (status code 200)
        if (response.status === 200) {
          this.brands = response.data;
        } else {
          console.error(`Failed to fetch brands. Status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    },
  },
  mounted() {
    this.fetchAllBrands();
  },
};
</script>
<style lang="css" scoped>
.texxt {
  cursor: pointer;
}
.Wrapper {
  width: 99%;
  height: 100%;
  display: flex;
  flex-direction: column;
  color: #163300;
  padding: 50px;
  margin-top: -50px;
  border-radius: 30px;
  background-color: white;
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
  .Header {
    flex-direction: column;
    align-items: center;
    padding: 0;
  }
  .Wrapper {
    margin-top: 50px;
    max-width: 100%;
    padding: 0;
  }
}
</style>
