<template>
  <div class="chartWrapper">
    <h4>My Profile</h4>
    <div class="chartContainer">
      <form>
        <div class="form-group">
          <label for="email" class="label">Email Address</label><br />
          <InputText
            type="text"
            id="email"
            :placeholder="user.email"
            v-model="user.email"
            class="inputForm inputFormDashboard"
          />
        </div>
        <div class="form-group">
          <label for="email" class="label">Address</label><br />
          <InputText
            type="text"
            id="email"
            :placeholder="user.address"
            v-model="user.address"
            class="inputForm inputFormDashboard"
          />
        </div>
        <div class="form-group">
          <label for="email" class="label">Phone</label><br />
          <InputText
            type="text"
            id="email"
            :placeholder="user.phone"
            v-model="user.phone"
            class="inputForm inputFormDashboard"
          />
        </div>
        <div class="form-group">
          <label for="email" class="label">Password</label><br />
          <InputText
            type="text"
            id="email"
            :placeholder="user.password"
            v-model="user.password"
            class="inputForm inputFormDashboard"
          />
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import axios from "axios";
import InputText from "primevue/inputtext";

export default {
  components: {
    InputText,
  },
  data() {
    return {
      user: {
        email: "",
        phone: "",
        address: "",
        password: "",
      },
    };
  },

  methods: {
    async fetchData() {
      try {
        const userId = localStorage.getItem("userId");
        const response = await axios.get(
          `http://localhost:3000/user/${userId}`
        );

        return response.status === 200 ? response.data : [];
      } catch (error) {
        console.error("Error fetching products:", error);
        return [];
      }
    },
  },
  mounted() {
    this.fetchData().then((data) => {
      this.user.email = data.email;
      this.user.phone = data.phone;
      this.user.address = data.address;
      this.user.password = "********";
    });
  },
};
</script>

<style lang="css" scoped>
.chartContainer {
  background-color: white;
  width: 99%;
  height: 100%;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3%;
}
.chartWrapper {
  display: flex;
  justify-content: center;

  flex-direction: column;
  height: 100%;
  padding: 30px;
}
h4 {
  margin-bottom: 4%;
  font-size: 25px;
  font-weight: 700;
}
.inputFormDashboard {
  
}
</style>
