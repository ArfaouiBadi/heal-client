<template lang="html">
  <div class="chatbox">
    <div class="header">
      <span>How can i help you ?</span>
      <button @click="closeChatbox">&#10006;</button>
    </div>
    <div class="messages" v-if="displayedProductsNames.length > 0">
      <ul>
        <li v-for="product in displayedProductsNames" :key="product">
          {{ product }}
        </li>
      </ul>
    </div>
    <div>
      <form @submit.prevent="sendMessage">
        <div class="input">
          <span class="p-input-icon-right">
            <i class="pi pi-send" @click="sendMessage" />
            <InputText
              placeholder="Search for products"
              class="inputFilter"
              v-model="message"
            />
          </span>
        </div>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import InputText from "primevue/inputtext";
import axios from "axios";
export default {
  components: {
    InputText,
  },
  data() {
    return {
      message: "",
      subcategories: [] as any[],
      products: [] as any[],
      displayedProducts: [] as any[],
      displayedProductsNames: [] as any[],
    };
  },
  methods: {
    async sendMessage() {
      const trimmedMessage = this.message.trim();
      this.displayedProducts = [];
      if (trimmedMessage === "") {
        console.log("empty message");
        return;
      }

      this.products = [];
      let messageSent = false;
      try {
        const response = await axios.get(`http://localhost:3000/products`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.products = response.data;
      } catch (error) {
        console.error(`Error fetching products`, error);
      }
      for (const product of this.products) {
        if (
          this.message
            .toLocaleLowerCase()
            .includes(product.subcategory.name.toLocaleLowerCase()) ||
          this.message
            .toLocaleLowerCase()
            .includes(product.category.name.toLocaleLowerCase()) ||
          this.message
            .toLocaleLowerCase()
            .includes(product.productName.toLocaleLowerCase())
        ) {
          messageSent = true;
          this.displayedProducts.push(product);
        }
      }
      this.displayedProducts = [...new Set(this.displayedProducts)];
      this.displayedProductsNames = this.displayedProducts.map(
        (product: any) => product.productName
      );
      console.log();
      if (messageSent) {
        this.$emit("newMessage", this.message);
        this.message = "";
      } else {
        this.displayedProductsNames = ["No matching subcategory found"];
        console.log("No matching subcategory found");
      }
    },

    closeChatbox() {
      this.$emit("closeChatbox");
    },
    async fetchDataCategoriesSubcategories() {
      try {
        const response = await axios.get("http://localhost:3000/subcategory", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        this.subcategories = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchDataCategoriesSubcategories();
  },
};
</script>
<style scoped>
/* Add your styles here */
.chatbox {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 300px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 30px;
  overflow: hidden;
  z-index: 9999;
}

.header {
  color: #7adf3b;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header span {
  font-size: 20px;
  font-weight: bold;
}

.messages {
  height: 200px;
  overflow-y: auto;
  padding: 20px;
}

.input {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.input input {
  width: 100%;
  border-radius: 20px;
  padding: 10px 20px;
  border: 1px solid #ccc;
}

.input i:hover {
  cursor: pointer;
  color: #7adf3b;
}
li {
  list-style: none;
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 13px;
  border-radius: 20px;
  margin-bottom: 10px;
  color: #fff;
  font-weight: 500;
  background-color: #7adf3b;
}
button {
  background-color: #7adf3b;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
