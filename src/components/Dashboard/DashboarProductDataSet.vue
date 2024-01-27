<template>
  <div>
    <div class="card">
      <DataTable
        ref="dt"
        :value="products"
        v-model:selection="selectedProducts"
        dataKey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 25]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
      >
        <template #header>
          <div
            class="flex flex-wrap gap-2 align-items-center justify-content-between"
          >
            <span class="p-input-icon-left">
              <i class="pi pi-search" />
              <InputText
                v-model="filters['global'].value"
                placeholder="Search..."
              />
            </span>
          </div>
        </template>

        <Column field="" header="ID" sortable style="width: 1rem"></Column>
        <Column
          field="productName"
          header="Product Name"
          sortable
          style="min-width: 2rem"
        ></Column>

        <Column field="price" header="Price" sortable style="min-width: 1px">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.price) }}
          </template>
        </Column>
        <Column
          field="category.name"
          header="Category"
          sortable
          style="min-width: 1px"
        ></Column>
        <Column
          field="subcategory.name"
          header="Sub Category"
          sortable
          style="min-width: 1px"
        ></Column>

        <Column field="status" header="Status" sortable style="min-width: 1px">
          <template #body="slotProps">
            <Tag
              :value="slotProps.data.status"
              :severity="getStatusLabel(slotProps.data.status)"
            />
          </template>
        </Column>
        <Column :exportable="false" style="min-width: 8rem">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              outlined
              rounded
              class="mr-2"
              @click="editProduct(slotProps.data)"
            />
            <Button
              icon="pi pi-trash"
              outlined
              rounded
              severity="danger"
              @click="confirmDeleteProduct(slotProps.data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
    <Dialog
      v-model:visible="deleteProductDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="product">Are you sure you want to delete ?</span>
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          text
          @click="deleteProductDialog = false"
        />
        <Button label="Yes" icon="pi pi-check" text @click="deleteProduct" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="deleteProductsDialog"
      :style="{ width: '450px' }"
      header="Confirm"
      :modal="true"
    >
      <div class="confirmation-content">
        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
        <span v-if="product"
          >Are you sure you want to delete the selected products?</span
        >
      </div>
      <template #footer>
        <Button
          label="No"
          icon="pi pi-times"
          text
          @click="deleteProductsDialog = false"
        />
        <Button label="Yes" icon="pi pi-check" text @click="" />
      </template>
    </Dialog>

    <Dialog
      v-model:visible="productDialog"
      :style="{ width: '60%' }"
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
            currency="USD"
            locale="en-US"
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
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { FilterMatchMode } from "primevue/api";

import DataTable from "primevue/datatable";
import axios from "axios";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputNumber from "primevue/inputnumber";
import RadioButton from "primevue/radiobutton";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Tag from "primevue/tag";

export default {
  components: {
    DataTable,
    Column,
    InputText,
    Button,
    Dialog,
    InputNumber,
    RadioButton,
    Dropdown,
    Calendar,
    Tag,
  },
  data() {
    return {
      dt: ref(null),
      products: ref([]),
      productDialog: ref(false),
      deleteProductDialog: ref(false),
      deleteProductsDialog: ref(false),
      statuses: [],
      product: ref({
        id: null,
        productName: null,
        marque: null,
        expirationDate: null,
        inventoryStatus: null,
        category: null,
        subcategory: null,
        price: null,
        quantity: null,
        Image: "",
      }),
      categories: [],
      submitted: ref(false),
      selectedProducts: ref(null),
      filters: ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      }),
      user: localStorage.getItem("userId"),
    };
  },
  mounted() {
    this.fetchDataProducts();
  },
  props: {
    categoriesFilterd: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    async fetchDataProducts() {
      try {
        const response = await axios.get(
          `http://localhost:3000/products/${this.user}`
        );
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

    formatCurrency(value: {
      toLocaleString: (
        arg0: string,
        arg1: { style: string; currency: string }
      ) => any;
    }) {
      if (value) {
        return value.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
      }
      return;
    },

    editProduct(prod: any) {
      this.product = { ...prod };
      this.productDialog = true;
    },
    confirmDeleteProduct(prod: any) {
      this.product = prod;
      this.deleteProductDialog = true;
    },
    async deleteProduct() {
      try {
        await axios.delete(`http://localhost:3000/products/${this.product.id}`);
        this.deleteProductDialog = false;
        this.fetchDataProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    },
    hideDialog() {
      this.productDialog = false;
      this.submitted = false;
    },
    async saveProduct() {
      this.submitted = true;
      try {
        // Set additional properties for creating a new product
        this.product.Image = "product-placeholder.svg";

        // Use Axios to create a new product on the server
        await axios.put(`http://localhost:3000/products`, this.product);

        // Reset dialog and product object
        this.productDialog = false;
        this.product = {
          id: null,
          productName: null,
          marque: null,
          expirationDate: null,
          inventoryStatus: null,
          category: null,
          subcategory: null,
          price: null,
          quantity: null,
          Image: "",
        };
        this.fetchDataProducts(); // Refresh the product list
      } catch (error) {
        console.error("Error creating product:", error);
      }
    },

    getStatusLabel(status: string) {
      switch (status.toLocaleUpperCase()) {
        case "INSTOCK":
          return "success";

        case "LOWSTOCK":
          return "warning";

        case "OUTOFSTOCK":
          return "danger";

        default:
          return "warning";
      }
    },
  },
};
</script>
