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
        <label for="Image">Image URL</label>
        <InputText
          id="Image"
          v-model="product.image"
          required="true"
          rows="3"
          cols="20"
          placeholder="imgBB Link"
        />
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
          v-model="product.categoryObj"
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
import InputSwitch from "primevue/inputswitch";
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
import { Category, CategoryObj, Subcategory } from "../../interface/types";

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
    InputSwitch,
  },
  data() {
    return {
      dt: ref(null),
      products: ref([]),
      productDialog: ref(false),
      deleteProductDialog: ref(false),
      deleteProductsDialog: ref(false),
      statuses: [
        { label: "INSTOCK", value: "instock" },
        { label: "LOWSTOCK", value: "lowstock" },
        { label: "OUTOFSTOCK", value: "outofstock" },
      ],
      product: ref({
        id: null,
        productName: null,
        marque: null,
        expirationDate: null,
        inventoryStatus: { label: null, value: null },
        category: null,
        subcategory: null,
        price: null,
        quantity: null,
        image: "",
        usageInstructions: null,
        prescription: false,
        categoryId: null,
        subcategoryId: null,
        status: null,
        categoryObj: { label: null, value: null },
      }),
      categoriesFilterd: [] as CategoryObj[],

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
    this.fetchDataCategories();
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
        const userId = localStorage.getItem("userId");
        this.product.status = this.product.inventoryStatus?.value;

        // Check if categoryObj is not null before accessing its properties
        if (this.product.categoryObj && this.product.categoryObj.value) {
          this.product.categoryId =
            this.product.categoryObj.value.split(" ")[0];
          this.product.subcategoryId =
            this.product.categoryObj.value.split(" ")[1];
        }

        await axios.put(`http://localhost:3000/products`, {
          ...this.product,
          userId: userId,
        });

        // Reset dialog and product object
        this.productDialog = false;
        this.product = {
          id: null,
          productName: null,
          marque: null,
          expirationDate: null,
          inventoryStatus: { label: null, value: null },
          category: null,
          subcategory: null,
          price: null,
          quantity: null,
          image: "",
          usageInstructions: null,
          prescription: false,
          categoryId: null,
          subcategoryId: null,
          status: null,
          categoryObj: { label: null, value: null },
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
<style lang="css">
.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}
</style>
