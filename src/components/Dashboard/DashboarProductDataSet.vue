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
          field="ProductName"
          header="Product Name"
          sortable
          style="min-width: 2rem"
        ></Column>
        <Column header="Image">
          <template #body="slotProps">
            <img
              :src="slotProps.data.image"
              :alt="slotProps.data.image"
              class="shadow-2 border-round"
              style="width: 64px"
            />
          </template>
        </Column>
        <Column field="Price" header="Price" sortable style="min-width: 1px">
          <template #body="slotProps">
            {{ formatCurrency(slotProps.data.Price) }}
          </template>
        </Column>
        <Column
          field="ProductCategory"
          header="Category"
          sortable
          style="min-width: 1px"
        ></Column>

        <Column field="Status" header="Status" sortable style="min-width: 1px">
          <template #body="slotProps">
            <Tag
              :value="slotProps.data.Status"
              :severity="getStatusLabel(slotProps.data.Status)"
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
          :class="{ 'p-invalid': submitted && !product.ProductName }"
        />
        <small class="p-error" v-if="submitted && !product.ProductName"
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
        ProductName: null,
        Marque: null,
        ExpirationDate: null,
        inventoryStatus: null,
        ProductCategory: null,
        price: null,
        Quantity: null,
        Image: "",
      }),
      submitted: ref(false),
      selectedProducts: ref(null),
      filters: ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      }),
    };
  },
  mounted() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      try {
        const data = await axios.get("http://localhost:3000/products");
        this.products = data.data;
      } catch (err) {
        console.log(err);
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
        this.fetchData();
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
          ProductName: null,
          Marque: null,
          ExpirationDate: null,
          inventoryStatus: null,
          ProductCategory: null,
          price: null,
          Quantity: null,
          Image: "",
        };
        this.fetchData(); // Refresh the product list
      } catch (error) {
        console.error("Error creating product:", error);
      }
    },

    getStatusLabel(status: any) {
      switch (status) {
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
