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
        <div class="addProductSquare" @click="openNew">
          <i class="pi pi-plus" />
          Add product
        </div>
      </div>
    </div>
  </div>
  <div class="elements">
    <Element
      text="Products Count"
      growth="18.9%"
      class="pi pi-cart-plus"
      data="5"
    />
    <Element text="Products Count" growth="18.9%" class="" data="5" />
    <Element text="Products Count" growth="18.9%" class="" data="5" />
    <Element text="Products Count" growth="18.9%" class="" data="5" />
  </div>
  <div class="productWrapper">
    <div class="productList">Product List</div>
    <div class="topSellingProducts"><p>Top Selling Products</p></div>
    <div class="topSellingProducts"><p>Empty For Now</p></div>
  </div>

  <Dialog
    v-model:visible="productDialog"
    :style="{ width: '40%' }"
    header="Product Details"
    :modal="true"
    class="p-fluid"
  >
    <div class="field">
      <label for="name">Name</label>
      <InputText
        id="name"
        v-model.trim="product.ProductName"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !product.name }"
      />
      <small class="p-error" v-if="submitted && !product.name"
        >Name is required.</small
      >
    </div>
    <div class="field">
      <label for="Marque">Marque</label>
      <InputText
        id="Marque"
        v-model="product.Marque"
        required="true"
        rows="3"
        cols="20"
      />
    </div>
    <div class="field">
      <label for="Marque">Expiration Date</label>
      <Calendar v-model="product.ExpirationDate" />
    </div>
    <div class="field">
      <label for="inventoryStatus" class="mb-3">Inventory Status</label>
      <Dropdown
        id="inventoryStatus"
        v-model="product.inventoryStatus"
        :options="statuses"
        optionLabel="label"
        placeholder="Select a Status"
      >
      </Dropdown>
    </div>

    <div class="field">
      <label class="mb-3">Category</label>
      <div class="formgrid grid">
        <div class="field-radiobutton col-6">
          <RadioButton
            id="category1"
            name="category"
            value="Visage"
            v-model="product.ProductCategory"
          />
          <label for="category1">Visage</label>
        </div>
        <div class="field-radiobutton col-6">
          <RadioButton
            id="category2"
            name="category"
            value="Cheveux"
            v-model="product.ProductCategory"
          />
          <label for="category2">Cheveux</label>
        </div>
        <div class="field-radiobutton col-6">
          <RadioButton
            id="category3"
            name="category"
            value="Corps"
            v-model="product.ProductCategory"
          />
          <label for="category3">Corps</label>
        </div>
        <div class="field-radiobutton col-6">
          <RadioButton
            id="category4"
            name="category"
            value="Maman"
            v-model="product.ProductCategory"
          />
          <label for="category4">Maman</label>
        </div>
        <div class="field-radiobutton col-6">
          <RadioButton
            id="category5"
            name="category"
            value="Santé"
            v-model="product.ProductCategory"
          />
          <label for="category5">Santé</label>
        </div>
        <div class="field-radiobutton col-6">
          <RadioButton
            id="category6"
            name="category"
            value="Hygiène"
            v-model="product.ProductCategory"
          />
          <label for="category6">Hygiène</label>
        </div>
        <div class="field-radiobutton col-6">
          <RadioButton
            id="category7"
            name="category"
            value="Homme"
            v-model="product.ProductCategory"
          />
          <label for="category7">Homme</label>
        </div>
      </div>
    </div>

    <div class="formgrid grid">
      <div class="field col">
        <label for="price">Price</label>
        <InputNumber
          id="price"
          v-model="product.price"
          mode="currency"
          currency="USD"
          locale="en-US"
        />
      </div>
      <div class="field col">
        <label for="quantity">Quantity</label>
        <InputNumber id="quantity" v-model="product.Quantity" integeronly />
      </div>
    </div>
    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
      <Button label="Save" icon="pi pi-check" text @click="saveProduct" />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import RadioButton from "primevue/radiobutton";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Calendar from "primevue/calendar";
import Element from "./DashboardProductElement.vue";
import axios from "axios";
export default {
  components: {
    InputText,
    Textarea,
    Dropdown,
    RadioButton,
    InputNumber,
    Button,
    Dialog,
    Calendar,
    Element,
  },
  setup() {
    const isInputFocused = ref(false);
    const productDialog = ref(false);
    const product = ref({});

    const statuses = [
      { label: "INSTOCK", value: "instock" },
      { label: "LOWSTOCK", value: "lowstock" },
      { label: "OUTOFSTOCK", value: "outofstock" },
    ];
    const submitted = ref(false);

    const handleInputFocus = () => {
      isInputFocused.value = true;
    };

    const handleInputBlur = () => {
      isInputFocused.value = false;
    };

    const openNew = () => {
      product.value = {};
      productDialog.value = true;
    };
    const hideDialog = () => {
      productDialog.value = false;
      submitted.value = false;
    };

    const saveProduct = async () => {
      submitted.value = true;
      try {
        // Set additional properties for creating a new product

        (product.value as { image: string }).image = "product-placeholder.svg";

        console.log(product.value);
        // Use Axios to create a new product on the server
        await axios.post(
          "http://localhost:3000/products/addProduct",
          product.value
        );

        // Reset dialog and product object
        productDialog.value = false;
        product.value = {};
      } catch (error) {
        console.error("Error creating product:", error);
      }
    };

    return {
      isInputFocused,
      productDialog,
      product,
      handleInputFocus,
      handleInputBlur,
      openNew,
      hideDialog,
      saveProduct,
      statuses,
    };
  },
};
</script>
<style lang="css" scoped>
.productWrapper {
  display: grid;
  grid-template-columns: 50% 45%;
  grid-template-rows: 50% 50%;
  grid-gap: 30px;
  padding: 3%;
  font-weight: 600;
  font-size: large;
}
.productList {
  grid-row: 1/3;
  background-color: white;
  border-radius: 15px;
  padding: 3%;
}
.topSellingProducts {
  grid-row: auto;
  background-color: white;
  border-radius: 15px;
  padding: 3%;
}
.elements {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3%;
}
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
@media screen and (max-width: 768px) {
  .elements {
    justify-content: center;
  }
}
</style>
