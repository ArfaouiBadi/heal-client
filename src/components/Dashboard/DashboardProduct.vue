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
    <div class="productList">
      Product List
      <DashboarProductDataSet />
    </div>

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
    <br />
    <div class="field">
      <div class="card flex justify-content-center">
        <label for="inventoryStatus" class="mb-3">Inventory Status</label>
        <Toast />
        <Tree
          v-model:selectionKeys="selectedKey"
          :value="categories"
          selectionMode="single"
          :metaKeySelection="false"
          @nodeSelect="onNodeSelect"
          @nodeUnselect="onNodeUnselect"
          @nodeExpand="onNodeExpand"
          @nodeCollapse="onNodeCollapse"
          class="w-full md:w-30rem"
        ></Tree>
      </div>
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
import Toast from "primevue/toast";
import Tree from "primevue/tree";
import Element from "./DashboardProductElement.vue";
import { useToast } from "primevue/usetoast";
import DashboarProductDataSet from "./DashboarProductDataSet.vue";
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
  },
  setup() {
    const isInputFocused = ref(false);
    const productDialog = ref(false);
    const product = ref({});
    const category = ref(null);
    const selectedKey = ref(null);
    const toast = useToast();
    const categories = ref([
      {
        key: "0",
        label: "Face",
        data: "Facial Care",
        icon: "pi pi-fw pi-smile",
        children: [
          {
            key: "0-0",
            label: "Moisturizing and Nourishing Care",
            data: "Hydrating and nourishing products for the face",
            icon: "pi pi-fw pi-tint",
            children: [
              {
                key: "0-0-0",
                label: "Moisturizers for all skin types",
                icon: "pi pi-fw pi-file",
                data: "All Skin Types",
              },
              {
                key: "0-0-1",
                label: "Moisturizers for normal to combination skin",
                icon: "pi pi-fw pi-file",
                data: "Normal to Combination Skin",
              },
              // Add other subcategories and products as needed
            ],
          },
          {
            key: "0-1",
            label: "Anti-Aging and Anti-Wrinkle Care",
            data: "Products to combat aging and wrinkles",
            icon: "pi pi-fw pi-hourglass-end",
            children: [
              {
                key: "0-1-0",
                label: "First signs of aging",
                icon: "pi pi-fw pi-file",
                data: "First Signs of Aging",
              },
              {
                key: "0-1-1",
                label: "Established wrinkles",
                icon: "pi pi-fw pi-file",
                data: "Established Wrinkles",
              },
              // Add other subcategories and products as needed
            ],
          },
          // Add other sections like 'Makeup', 'Eyes and Lips', etc., following the same structure
        ],
      },
      {
        key: "1",
        label: "Hair",
        data: "Hair Care",
        icon: "pi pi-fw pi-hair",
        children: [
          {
            key: "1-0",
            label: "Shampoo",
            data: "Hair cleansing products",
            icon: "pi pi-fw pi-shield",
            children: [
              {
                key: "1-0-0",
                label: "Gentle and frequent use shampoo",
                icon: "pi pi-fw pi-file",
                data: "Gentle and Frequent Use Shampoo",
              },
              {
                key: "1-0-1",
                label: "Anti-dandruff shampoo",
                icon: "pi pi-fw pi-file",
                data: "Anti-Dandruff Shampoo",
              },
              // Add other subcategories and products as needed
            ],
          },
          {
            key: "1-1",
            label: "After Shampoo and Hair Care",
            data: "Products for post-shampoo care",
            icon: "pi pi-fw pi-umbrella",
            children: [
              {
                key: "1-1-0",
                label: "Conditioner",
                icon: "pi pi-fw pi-file",
                data: "Hair Conditioner",
              },
              {
                key: "1-1-1",
                label: "Masks and balms",
                icon: "pi pi-fw pi-file",
                data: "Hair Masks and Balms",
              },
              // Add other subcategories and products as needed
            ],
          },
          // Continue with other sections like 'Soins anti-chute', 'Huiles et sérums', etc.
        ],
      },
      // Continue with other top-level categories like 'Body', 'Bébé et maman', 'Compléments alimentaires', 'Homme', 'Hygiène', etc.
    ]);
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
    const onNodeSelect = (node: any) => {
      console.log(node);
      console.log(selectedKey);
      toast.add({
        severity: "success",
        summary: "Node Selected",
        detail: node.label,
        life: 3000,
      });
    };

    const onNodeUnselect = (node: any) => {
      toast.add({
        severity: "warn",
        summary: "Node Unselected",
        detail: node.label,
        life: 3000,
      });
    };

    const onNodeExpand = (node: any) => {
      toast.add({
        severity: "info",
        summary: "Node Expanded",
        detail: node.label,
        life: 3000,
      });
    };

    const onNodeCollapse = (node: any) => {
      toast.add({
        severity: "error",
        summary: "Node Collapsed",
        detail: node.label,
        life: 3000,
      });
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
      categories,
      category,
      selectedKey,
      onNodeSelect,
      onNodeUnselect,
      onNodeExpand,
      onNodeCollapse,
      toast,
    };
  },
};
</script>
<style lang="css" scoped>
.productWrapper {
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
