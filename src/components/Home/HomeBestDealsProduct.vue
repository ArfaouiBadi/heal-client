<template lang="html">
  <div class="Wrapper">
    <div class="Header">
      <h1>Todays best <br />deals for you!</h1>
      <h5 class="hover-underline-animation texxt" @click="toggleSortOrder">
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
      <div class="filters">
        <div>
          <label for="nameFilter">Filter by Name:</label>
          <br />
          <span class="p-input-icon-left">
            <i class="pi pi-search" />
            <InputText
              v-model="nameFilter"
              placeholder="Search for products "
              class="inputFilter"
              @input="applyFilters"
            />
          </span>
        </div>

        <div>
          <label for="priceFilter"
            >Order By:
            <b
              ><span v-if="checked">DESC</span><span v-else>ASC</span></b
            ></label
          ><br />
          <InputSwitch v-model="checked" />
        </div>
      </div>
      <div class="productContainer">
        <ProductCard
          v-for="product in filteredProducts"
          :product="(product as ProductDataSet)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" scoped>
import ProductCard from "./ProductCard.vue";
import Category from "./Category.vue";
import { ProductDataSet } from "../../interface/types";
import InputText from "primevue/inputtext";
import InputSwitch from "primevue/inputswitch";
export default {
  components: {
    ProductCard,
    Category,
    InputText,
    InputSwitch,
  },
  props: {
    products: Array,
    categories: Array,
  },
  data() {
    return {
      selectedCategory: { name: "All" },
      nameFilter: "",
      priceFilter: null,
      sortOrderAsc: true,
      checked: false,
    };
  },
  computed: {
    filteredProducts() {
      let filtered = this.products as ProductDataSet[] | undefined;

      if (this.selectedCategory.name !== "All") {
        filtered = filtered!.filter(
          (product) =>
            (product as ProductDataSet).category.name ===
            this.selectedCategory.name
        );
      }

      if (this.nameFilter) {
        const lowerCaseFilter = this.nameFilter.toLowerCase();
        filtered = filtered!.filter((product) =>
          (product as ProductDataSet).productName
            .toLowerCase()
            .includes(lowerCaseFilter)
        );
      }

      if (this.priceFilter !== null) {
        filtered = filtered!.filter(
          (product) => (product as ProductDataSet).price === this.priceFilter
        );
      }
      if (!this.checked) {
        filtered = filtered!.sort(
          (a: ProductDataSet, b: ProductDataSet) => a.price - b.price
        );
      } else {
        filtered = filtered!.sort(
          (a: ProductDataSet, b: ProductDataSet) => b.price - a.price
        );
      }

      return filtered;
    },
  },
  methods: {
    onCategorySelected(selectedCategory: any) {
      this.selectedCategory = selectedCategory;
      this.applyFilters();
    },
    toggleSortOrder() {
      this.sortOrderAsc = !this.sortOrderAsc;
      this.applyFilters();
    },
    applyFilters() {},
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
.productContainer {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  padding: 50px;
}
.mainContent {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding: 50px;
}
.filters {
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  gap: 20px;
  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.08),
    0px 1px 30px 1px rgba(0, 0, 0, 0.09), 0px 8px 20px 7px rgba(0, 0, 0, 0.02);
  height: fit-content;
  padding: 20px;
  border-radius: 20px;
}

@media only screen and (max-width: 780px) {
  h1 {
    font-size: 30px;
  }
  h5 {
    font-size: 15px;
  }
  .mainContent {
    flex-direction: column;
  }
}
.categoryWrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
.inputFilter {
  border-radius: 20px;
  border: none;
  background-color: #f4f4f4;
  width: 100%;
}
.inputFilter::placeholder {
  font-size: 12px;
}
</style>
