<template lang="html">
  <div class="chatbox">
    <div class="header">
      <span>How can i help you ?</span>
      <button @click="closeChatbox">&#10006;</button>
    </div>
    <div class="messages">aaaaa</div>
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
    };
  },
  methods: {
    async sendMessage() {
      const trimmedMessage = this.message.trim();

      if (trimmedMessage === "") {
        console.log("empty message");
        return;
      }

      this.products = []; // Clear the products array for each new search
      const lowerCaseMessage = trimmedMessage.toLowerCase();
      const messageWords = lowerCaseMessage.split(" ");
      let messageSent = false;

      for (const word of messageWords) {
        for (const subcategory of this.subcategories) {
          const isMatch =
            subcategory.name.toLowerCase().includes(word) ||
            subcategory.category.name.toLowerCase().includes(word);

          if (isMatch) {
            try {
              console.log(subcategory.id);
              const response = await axios.get(
                `http://localhost:3000/products/subcategory/${subcategory.id}`
              );

              const products = response.data;

              this.products.push(...products);
              messageSent = true;
            } catch (error) {
              console.error(
                `Error fetching products for subcategory ${subcategory.id}:`,
                error
              );
            }
          }
        }
      }

      if (messageSent) {
        this.$emit("newMessage", this.message);
        this.message = "";
      } else {
        console.log("No matching subcategory found");
      }

      console.log(this.products);
    },

    closeChatbox() {
      this.$emit("closeChatbox");
    },
    async fetchDataCategoriesSubcategories() {
      try {
        const response = await axios.get("http://localhost:3000/subcategory");
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
  color: #9fe870;
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
  color: #9fe870;
}

button {
  background-color: #9fe870;
  color: #fff;
  border: none;
  padding: 8px 15px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
