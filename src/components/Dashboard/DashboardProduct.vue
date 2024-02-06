<template lang="">
  <div class="navBarAndFilter">
    <Toast />
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

  <div class="productWrapper">
    <div class="productList">
      Product List
      <DashboarProductDataSet />
    </div>

    <div class="topSellingProducts">
      <p>Top Selling Products</p>
      <DashboardTopSellingProducts />
    </div>
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
        v-model.trim="product.productName"
        required="true"
        autofocus
        :class="{ 'p-invalid': submitted && !product.productName }"
      />
      <small class="p-error" v-if="submitted && !product.productName"
        >Name is required.</small
      >
    </div>
    <div class="field">
      <label for="Image">Image URL</label>
      <label class="uploadFileBtn">
        <input type="file" ref="fileInputRef" />
        <i class="pi pi-upload" /> Upload a file
      </label>
    </div>

    <div class="field">
      <label for="Usage">Usage instructions</label>
      <InputText
        id="Usage"
        v-model="product.usageInstructions"
        required="false"
        rows="3"
        cols="20"
        placeholder="Apply a small amount to the affected area twice a day."
      />
    </div>
    <div class="field">
      <label for="Marque">Marque</label>
      <InputText
        id="Marque"
        v-model="product.marque"
        required="true"
        rows="3"
        cols="20"
      />
    </div>
    <div class="field">
      <label for="Marque">Expiration Date</label>
      <Calendar v-model="product.expirationDate" />
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
    <br />
    <div class="field">
      <label for="description">Prescription</label>
      <InputSwitch v-model="product.prescription" />
    </div>
    <br />
    <div class="field">
      <label class="mb-3">Category</label>
      <Dropdown
        v-model="product.category"
        :options="categoriesFilterd"
        optionLabel="label"
        optionGroupLabel="label"
        optionGroupChildren="items"
        placeholder="Select a Category"
        class="w-full md:w-14rem font-bold"
      >
        <template #optiongroup="slotProps">
          <div class="flex align-items-center dropdownfont">
            <div>{{ slotProps.option.label }}</div>
          </div>
        </template>
      </Dropdown>
    </div>

    <div class="formgrid grid">
      <div class="field col">
        <label for="price">Price</label>
        <InputNumber
          id="price"
          v-model="product.price"
          mode="currency"
          currency="TND"
          locale="tn-TN"
        />
      </div>
      <div class="field col">
        <label for="quantity">Quantity</label>
        <InputNumber id="quantity" v-model="product.quantity" integeronly />
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

import "firebase/storage";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Dropdown from "primevue/dropdown";
import RadioButton from "primevue/radiobutton";
import InputNumber from "primevue/inputnumber";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import Calendar from "primevue/calendar";
import Toast from "primevue/toast";
import Tree from "primevue/tree";
import Element from "./DashboardProductElement.vue";
import InputSwitch from "primevue/inputswitch";
import { useToast } from "primevue/usetoast";

import DashboarProductDataSet from "./DashboarProductDataSet.vue";
import { Category, Subcategory, CategoryObj } from "../../interface/types.ts";
import DashboardTopSellingProducts from "./DashboardTopSellingProducts.vue";
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
    DashboarProductDataSet,
    Toast,
    Tree,
    InputSwitch,
    DashboardTopSellingProducts,
  },

  beforeMount() {
    this.fetchDataCategories();
  },

  methods: {
    async fetchDataCategories() {
      try {
        const data = await axios.get("http://localhost:3000/category");
        this.categories = data.data;

        this.categories.forEach((category: Category) => {
          let categoryObj: CategoryObj = {
            label: category.name,
            code: category.id,
            items: category.subcategories.map((subcategory: Subcategory) => ({
              label: subcategory.name,
              value: category.id + " " + subcategory.id,
            })),
          };
          this.categoriesFilterd.push(categoryObj);
        });
      } catch (err) {
        console.log(err);
      }
    },
  },

  setup() {
    const isInputFocused = ref(false);
    const productDialog = ref(false);
    const product = ref({
      productName: "",
      usageInstructions: "",
      marque: "",
      expirationDate: null,
      inventoryStatus: {
        label: "",
        value: "",
      },
      prescription: false,
      category: {
        label: "",
        value: "",
      },
      price: 0,
      quantity: 0,
    });
    const category = ref(null);
    const selectedKey = ref(null);
    const toast = useToast();
    const fileInputRef = ref(null);
    const selectedCity = ref();
    const categories = ref([]);
    const categoriesFilterd = ref([] as CategoryObj[]);

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
      product.value = {
        productName: "",
        usageInstructions: "",
        marque: "",
        expirationDate: null,
        inventoryStatus: {
          label: "",
          value: "",
        },
        prescription: false,
        category: {
          label: "",
          value: "",
        },
        price: 0,
        quantity: 0,
      };
      productDialog.value = true;
    };
    const hideDialog = () => {
      productDialog.value = false;
      submitted.value = false;
    };

    const saveProduct = async () => {
      submitted.value = true;
      try {
        const userId = localStorage.getItem("userId");

        const fileInput = fileInputRef.value as HTMLInputElement | null;
        const file = fileInput?.files?.[0];
        console.log(file);
        console.log("Selected file:", file);
        if (!file) {
          toast.add({
            severity: "error",
            summary: "Error",
            detail: "No file selected",
            life: 3000,
          });
          return;
        }

        await axios.post(
          "http://localhost:3000/products/addProduct",
          { file, ...product.value, userId },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        toast.add({
          severity: "success",
          summary: "Success",
          detail: "Product Added Successfully",
          life: 3000,
        });

        // Reset dialog and product object
        productDialog.value = false;
        product.value = {
          productName: "",
          usageInstructions: "",
          marque: "",
          expirationDate: null,
          inventoryStatus: {
            label: "",
            value: "",
          },
          prescription: false,
          category: {
            label: "",
            value: "",
          },
          price: 0,
          quantity: 0,
        };
      } catch (error) {
        console.error("Error creating product:", error);
        toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error creating product. Contact admin for help.",
          life: 3000,
        });
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
      submitted,
      category,
      selectedKey,
      toast,
      selectedCity,
      categories,
      categoriesFilterd,
      fileInputRef,
    };
  },
};
</script>
<style lang="css" scoped>
.uploadFileBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  gap: 10px;
  border-radius: 10px;
  background-color: #14a800; /* Adjust the background color as needed */
  cursor: pointer;
  color: white;
  font-size: 15px;
  font-weight: 300;

  transition: all 0.4s ease-in-out;
}
.uploadFileBtn:hover {
  background-color: #1aca03;
}
.productWrapper {
  display: flex;
  flex-direction: column;
  padding: 3%;
  font-weight: 600;
  gap: 30px;
  font-size: large;
}
.productList {
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
  font-family: "poppins";
  flex-wrap: wrap;
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
.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
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
  background-color: #14a800; /* Adjust the background color as needed */
  cursor: pointer;
  color: white;
  font-size: 15px;
  font-weight: 300;
  padding: 0 10px;
  transition: all 0.3s ease-in-out;
}

.addProductSquare:hover {
  background-color: #1aca03;
}
.addProductSquare i {
  padding-right: 7px;
}
input[type="file"] {
  display: none;
}
@media screen and (max-width: 768px) {
  .elements {
    justify-content: center;
  }
}
</style>
../../stores/tore.js
