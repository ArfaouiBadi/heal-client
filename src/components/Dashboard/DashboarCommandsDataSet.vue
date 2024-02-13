<template>
  <div class="commandWrapper">
    <div class="commandList">
      Commands List
      <div>
        <Toast />
        <div class="card">
          <DataTable
            ref="dt"
            :value="commands"
            v-model:selection="selectedCommands"
            dataKey="id"
            :paginator="true"
            :rows="10"
            :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} commands"
          >
            <template #header>
              <div
                class="flex flex-wrap gap-2 align-items-center justify-content-between dataSetWrapper"
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

            <Column
              field="user.email"
              header="Email Buyer"
              sortable
              style="min-width: 2rem"
            ></Column>
            <Column
              field="product.productName"
              header="Product"
              sortable
              style="min-width: 2rem"
            ></Column>
            <Column
              field="product.user.email"
              header="Product owner"
              sortable
              style="min-width: 2rem"
            ></Column>
            <Column header="Image">
              <template #body="{ data }">
                <img
                  :src="data.product.image"
                  class="border-round"
                  style="width: 64px"
                />
              </template>
            </Column>
            <Column
              field="quantity"
              header="Quantity"
              sortable
              style="min-width: 1px"
            ></Column>
            <Column
              field="product.price"
              header="Price"
              sortable
              style="min-width: 1px"
            >
              <template #body="{ data }">
                {{ formatCurrency(data.product.price) }}
              </template>
            </Column>

            <Column
              field="price"
              header="Price"
              sortable
              style="min-width: 1px"
            >
              <template #body="{ data }">
                {{ formatCurrency(data.quantity * data.product.price) }}
              </template>
            </Column>
            <Column
              field="createdAt"
              header="Created At"
              sortable
              style="min-width: 1px"
            >
              <template #body="{ data }">
                {{ formatDate(data.createdAt) }}
              </template>
            </Column>
            <Column :exportable="false" style="min-width: 8rem">
              <template #body="slotProps">
                <Button
                  icon="pi pi-trash"
                  outlined
                  rounded
                  severity="danger"
                  @click="deleteProduct(slotProps.data)"
                />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
      <div class="userAllAmountWrapper">
        <div class="userAllAmountContainer">
          <p class="userAllAmountText">User All Amount</p>
          <InputText
            id="userAllAmountInput"
            v-model="userEmail"
            class="inputForm"
            placeholder="Enter User Email"
          />
          <div class="btnCommmandsDataSet">
            <button
              type="button"
              label="Calculate"
              class="calculateButton"
              @click="calculateUserAllAmount"
            >
              Calculate
            </button>
            <button
              type="button"
              label="Calculate"
              class="calculateButton"
              @click="deleteAllProductsById"
            >
              Delete Commands
            </button>
          </div>
          <p>Total User Amount: {{ userAllAmount.toFixed(3) }} TND</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { FilterMatchMode } from "primevue/api";
import axios from "axios";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import Button from "primevue/button";
import { useToast } from "primevue/usetoast";

export default {
  components: {
    DataTable,
    Column,
    InputText,
    Toast,
    Button,
  },
  data() {
    return {
      userEmail: "",
      userAllAmount: 0,
      selectedCommands: ref(null),
      commands: [],
      toast: useToast(),
      filters: ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      }),
      deleteProductDialog: false,
    };
  },
  mounted() {
    this.getCommands();
  },

  methods: {
    async getCommands() {
      try {
        const response = await axios.get(
          "http://localhost:3000/commandproduct/all"
        );
        this.commands = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    formatCurrency(value: {
      toLocaleString: (
        arg0: string,
        arg1: { style: string; currency: string }
      ) => any;
    }) {
      if (value) {
        return value.toLocaleString("tn-TN", {
          style: "currency",
          currency: "TND",
        });
      }
      return;
    },
    formatDate(value: string | number | Date) {
      value = new Date(value);
      if (value instanceof Date) {
        return value.toLocaleDateString("fr-Fr", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
      }
      return "Invalid Date";
    },
    calculateUserAllAmount() {
      if (this.userEmail) {
        const userCommands = this.commands.filter(
          (command: { [x: string]: any; user: { email: string } }) =>
            command.product.user.email === this.userEmail
        );
        this.userAllAmount = userCommands.reduce(
          (
            acc: number,
            command: { quantity: number; product: { price: number } }
          ) => acc + command.quantity * command.product.price,
          0
        );
      }
    },
    async deleteProduct(data: any) {
      try {
        await axios.delete(
          `http://localhost:3000/commandproduct/delete/${data.id}`
        );
        this.deleteProductDialog = false;
        this.getCommands();
        this.toast.add({
          severity: "success",
          summary: "Success",
          detail: "Command Deleted",
          life: 3000,
        });
      } catch (error) {
        this.toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error deleting command",
          life: 3000,
        });
        console.error("Error deleting product:", error);
      }
    },
    async deleteAllProductsById() {
      if (this.userEmail) {
        try {
          await axios.delete(
            `http://localhost:3000/commandproduct/deleteAll/${this.userEmail}`
          );
          this.deleteProductDialog = false;
          this.getCommands();
          this.toast.add({
            severity: "success",
            summary: "Success",
            detail: "Commands Deleted",
            life: 3000,
          });
        } catch (error) {
          this.toast.add({
            severity: "error",
            summary: "Error",
            detail: "Error deleting commands",
            life: 3000,
          });
          console.error("Error deleting commands:", error);
        }
      }
    },
  },
};
</script>
<style lang="css">
.commandWrapper {
  display: flex;
  flex-direction: column;
  padding: 3%;
  font-weight: 600;
  gap: 30px;
  font-size: large;
}
.commandList {
  background-color: white;

  border-radius: 15px;
  padding: 3%;
}
.card {
  border: none;
}

.field {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

.userAllAmountWrapper {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.calculateButton {
  border: none;
  color: white;
  background-color: #14a800c7;
  border-radius: 20px;
  font-family: "Poppins";
  font-size: 18px;
  width: max-content;
  margin-top: 30px;
  font-weight: 200;
  padding: 0.6em;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
}
.calculateButton:hover {
  background-color: #14a800;
}

.btnCommmandsDataSet {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.userAllAmountContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  gap: 10px;
}
</style>
