<template lang="">
  <div class="navBarAndFilter">
    <div class="header">My Product</div>
    <span class="p-input-icon-left search">
      <i v-show="!isInputFocused" class="pi pi-search searchIcon" />
      <InputText
        placeholder="Search"
        class="searchField"
        @focus="handleInputFocus"
        @blur="handleInputBlur"
      />
    </span>
    <div class="filterContainer">
      <div class="filterAddProduct">
        <div class="squareContainer">
          <i class="pi pi-filter" />
        </div>
        <div class="addProductSquare">
          <i class="pi pi-plus" />
          Add product
        </div>
      </div>
    </div>
    <div class="elements"></div>
  </div>
</template>
<script lang="ts">
import InputText from "primevue/inputtext";
export default {
  components: {
    InputText,
  },
  data() {
    return {
      isInputFocused: false,
    };
  },
  methods: {
    handleInputFocus() {
      this.isInputFocused = true;
    },
    handleInputBlur() {
      this.isInputFocused = false;
    },
  },
};
</script>
<style lang="css" scoped>
.navBarAndFilter {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.5% 3.5%;
  font-size: 25px;
  font-weight: 700;
}
.header {
  flex: 2;
}
.searchField {
  background-color: white;
  color: black;
  height: 50%;
  border: none;
  border-radius: 10px;
  transition: width 0.3s ease-in-out;
  padding-left: 10%;
}
.search {
  flex: 1;
}
.filterContainer {
  flex: 1;
}
.squareContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 40px;
  border-radius: 10px;
  background-color: white; /* Adjust the background color as needed */
  cursor: pointer;
}
.filterAddProduct {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.addProductSquare {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  height: 40px;
  border-radius: 10px;
  background-color: #4461f2; /* Adjust the background color as needed */
  cursor: pointer;
}
.addProductSquare {
  color: white;
  font-size: 15px;
  font-weight: 300;
  padding: 0 10px;
}
.addProductSquare i {
  padding-right: 7px;
}
</style>
