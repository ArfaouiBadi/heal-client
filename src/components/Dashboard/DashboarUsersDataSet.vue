<template>
  <div class="commandWrapper">
    <div class="commandList">
      Users List
      <div>
        <Toast />
        <div class="card">
          <DataTable
            ref="dt"
            :value="users"
            v-model:selection="selectedUsers"
            dataKey="id"
            :paginator="true"
            :rows="10"
            :filters="filters"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            :rowsPerPageOptions="[5, 10, 25]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} Users"
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
              field="email"
              header="Email"
              sortable
              style="min-width: 2rem"
            ></Column>
            <Column
              field="phone"
              header="Phone"
              sortable
              style="min-width: 2rem"
            ></Column>
            <Column
              field="address"
              header="Address"
              sortable
              style="min-width: 2rem"
            ></Column>
            <Column
              field="role"
              header="Role"
              sortable
              style="min-width: 2rem"
            ></Column>
            <Column
              field="plan.name"
              header="Plan"
              sortable
              style="min-width: 1px"
            ></Column>
            <Column
              field="plan.updatedAt"
              header="Plan Updated At"
              sortable
              style="min-width: 1px"
            >
              <template #body="{ data }">
                {{ formatDate(data.updatedAt) }}
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
            <Column :exportable="false" style="min-width: 10rem">
              <template #body="slotProps">
                <Button
                  icon="pi pi-pencil"
                  outlined
                  rounded
                  class="mr-2 p-button-success"
                  @click="editUserRole(slotProps.data)"
                />
                
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
    <Dialog
      v-model:visible="userDialog"
      :style="{ width: '40%' }"
      header="User Role"
      :modal="true"
      class="p-fluid"
    >
      <div class="field" v-if="role !== 'SUPERADMIN'">
        <label for="inventoryStatus" class="mb-3">Plan</label>
        <Dropdown
          id="roles"
          v-model="user.plan"
          :options="statusPlan"
          optionLabel="label"
          placeholder="Select a Plan"
        >
        </Dropdown>
      </div>
      <div class="field" v-if="role === 'SUPERADMIN'">
        <label for="inventoryStatus" class="mb-3">Role</label>
        <Dropdown
          id="roles"
          v-model="user.role"
          :options="statusesRolesSuperAdmin"
          optionLabel="label"
          placeholder="Select a Role"
        >
        </Dropdown>
      </div>
      <br />
      <template #footer>
        <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Save" icon="pi pi-check" text @click="saveUser" />
      </template>
    </Dialog>
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
import Dialog from "primevue/dialog";
import Dropdown from "primevue/dropdown";
import { useToast } from "primevue/usetoast";

export default {
  components: {
    DataTable,
    Column,
    InputText,
    Toast,
    Button,
    Dialog,
    Dropdown,
  },
  data() {
    return {
      selectedUsers: ref([]),
      users: [],
      toast: useToast(),
      filters: ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      }),
      userDialog: false,
      user: {} as any,
      statusesRolesSuperAdmin: [
        { label: "ADMIN", value: "ADMIN" },
        { label: "SUPERADMIN", value: "SUPERADMIN" },
        { label: "USER", value: "USER" },
      ],
      statusPlan: [
        { label: "Free", value: "65bec7b8740ece4ad2d9efe8" },
        { label: "Basic", value: "65bec7c1740ece4ad2d9efe9" },
        { label: "Gold", value: "65bec7d3740ece4ad2d9efea" },
        { label: "Premium", value: "65bec843740ece4ad2d9efed" },
      ],
      role: "" as string | null,
    };
  },
  mounted() {
    this.getUsers();
    this.fetchUserById(localStorage.getItem("userId") as string);
  },

  methods: {
    async fetchUserById(userId: string) {
      const response = await axios.get(`http://localhost:3000/User/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      this.role = response.data.role;
      console.log(this.role);
    },

    async saveUser() {
      try {
        await axios.put(`http://localhost:3000/User/${this.user.id}`, {
          role: this.user.role,
          plan: this.user.plan.value || this.user.plan,
        });
        this.getUsers();
        this.toast.add({
          severity: "success",
          summary: "Success",
          detail: "User Updated",
          life: 3000,
        });
        this.hideDialog();
      } catch (error) {
        this.toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error updating user",
          life: 3000,
        });
        console.error("Error updating user:", error);
      }
    },
    hideDialog() {
      this.userDialog = false;
    },
    async getUsers() {
      try {
        const response = await axios.get("http://localhost:3000/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.users = response.data;
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

    editUserRole(user: any) {
      this.user = user;
      console.log(this.user);
      this.userDialog = true;
    },
    async deleteUser(data: any) {
      try {
        await axios.delete(`http://localhost:3000/User/delete/${data.id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.getUsers();
        this.toast.add({
          severity: "success",
          summary: "Success",
          detail: "User Deleted",
          life: 3000,
        });
      } catch (error) {
        this.toast.add({
          severity: "error",
          summary: "Error",
          detail: "Error deleting user",
          life: 3000,
        });
        console.error("Error deleting product:", error);
      }
    },
    getRoleLabel(status: string) {
      switch (status.toLocaleUpperCase()) {
        case "ADMIN":
          return "success";

        case "USER":
          return "warning";

        case "SUPERADMIN":
          return "danger";

        default:
          return "warning";
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
.p-button-success {
  border-radius: 50%;
  margin-right: 10px;
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
