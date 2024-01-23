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
            <h4 class="m-0">Manage Products</h4>
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
        <Button
          label="Yes"
          icon="pi pi-check"
          text
          @click="deleteSelectedProducts"
        />
      </template>
    </Dialog>
  </div>
</template>
<style lang="css" scoped></style>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { FilterMatchMode } from "primevue/api";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";

import Tag from "primevue/tag";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";

import axios from "axios";
onMounted(async () => {
  try {
    const data = await axios.get("http://localhost:3000/products");
    products.value = data.data;
    console.log(products.value);
  } catch (err) {
    console.log(err);
  }
});

const dt = ref();
const products = ref();
const productDialog = ref(false);
const deleteProductDialog = ref(false);
const deleteProductsDialog = ref(false);
const product = ref({});
const selectedProducts = ref();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

const formatCurrency = (value: {
  toLocaleString: (
    arg0: string,
    arg1: { style: string; currency: string }
  ) => any;
}) => {
  if (value)
    return value.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  return;
};

const editProduct = (prod: {}) => {
  product.value = { ...prod };
  productDialog.value = true;
};
const confirmDeleteProduct = (prod: {}) => {
  product.value = prod;
  deleteProductDialog.value = true;
};
const deleteProduct = () => {
  deleteProductDialog.value = false;
  product.value = {};
};

const deleteSelectedProducts = () => {
  products.value = products.value.filter(
    (val: any) => !selectedProducts.value.includes(val)
  );
  deleteProductsDialog.value = false;
  selectedProducts.value = null;
};

const getStatusLabel = (status: any) => {
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
};
</script>
