<template lang="html">
  <div class="Wrapper">
    <div class="Header">
      <h1>Todays best <br />deals for you!</h1>

      <h5 class="hover-underline-animation texxt">
        SEE ALL PRODUCTS<i class="pi pi-arrow-right" />
      </h5>
    </div>
    <div class="browseByCategory">
      <div class="categoryWrapper">
        <Category
          v-for="category in categories"
          :category="category!"
          @categorySelected="onCategorySelected"
        />
        <Category
          :category="{ name: 'All' }"
          @categorySelected="onCategorySelected"
        />
      </div>
    </div>
    <div class="mainContent">
      <ProductCard v-for="product in filteredProducts" :product="product!" />
    </div>
  </div>
</template>
<script lang="ts" scoped>
import ProductCard from "./ProductCard.vue";
import Category from "./Category.vue";
export default {
  components: {
    ProductCard,
    Category,
  },
  props: {
    products: Array,
    categories: Array,
  },
  data() {
    return {
      selectedCategory: { name: "All" },
    };
  },
  computed: {
    filteredProducts() {
      // If no category is selected, return all products
      console.log(this.selectedCategory);
      if (!this.selectedCategory || this.selectedCategory.name == "All") {
        return this.products;
      }

      // Filter products based on the selected category
      return this.products!.filter(
        (product) => product!.category.name == this.selectedCategory.name
      );
    },
  },
  methods: {
    onCategorySelected(selectedCategory: any) {
      this.selectedCategory = selectedCategory;
    },
  },
};
</script>
<style lang="css" scoped>
h5 {
  cursor: pointer;
  color: #163300;
  margin-right: 3px;
}
.texxt {
  cursor: pointer;
}
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
.categoryWrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
