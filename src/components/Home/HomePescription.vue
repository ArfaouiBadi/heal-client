<template lang="html">
  <div class="descWrapper">
    <div class="descLeft">
      <div class="uploadPrescription">
        <div class="uploadPrescriptionText">
          <h1>
            Upload Prescription<br />
            To Place Order
          </h1>
          <h3>Upload only .jpg or .pdf files Size Limit is 15MB</h3>
        </div>
        <div class="uploadPrescriptionImage">
          <label class="btnPresc">
            <input
              type="file"
              ref="fileInputPrescription"
              @change="handleFileUpload"
            />
            Order Via Prescription
          </label>
          <span
            ><u><b>How to Order ?</b></u></span
          >
        </div>
      </div>
      <div class="uploadButtons"></div>
    </div>
    <div class="descRight">
      <div class="descHeaderWrapper">
        <div class="descHeader">
          <div class="descHeaderText">
            <h1>
              Dont have a <br />
              Prescription?
            </h1>
          </div>
          <div class="descDesc"></div>
          <div class="descDontButton">
            <label class="btnPresc descDontButtonbtn" @click="toggleChatbox">
              Start Consultation
            </label>
          </div>
        </div>
      </div>

      <div class="imageContainer">
        <img
          src="https://i.ibb.co/1XPXQHv/image-2024-02-01-231339461-removebg-preview.png"
        />
      </div>
    </div>
  </div>
  <Chatbox v-if="showChatbox" @closeChatbox="showChatbox = false" />
</template>
<script lang="ts">
import axios from "axios";
import Toast from "primevue/toast";
import Chatbox from "./HomeLanding/Chatbox.vue";
import { useToast } from "primevue/usetoast";
import { useCartStore } from "../../store/cart";
export default {
  components: {
    Toast,
    Chatbox,
  },
  data() {
    return {
      fileInputPrescription: null as HTMLInputElement | null,
      cartStore: useCartStore(),
      toast: useToast(),
      showChatbox: false,
    };
  },
  methods: {
    toggleChatbox() {
      this.showChatbox = !this.showChatbox;
    },
    async handleFileUpload(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      const file = inputElement.files?.[0];

      if (file) {
        const fileFormData = new FormData();
        fileFormData.append("file", file);
        const response = await axios.post(
          "http://localhost:3000/ocr/upload",
          fileFormData
        );
        console.log(response.data);
        const products = await axios.get("http://localhost:3000/products", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const dataFromImage = response.data.toLowerCase();
        this.cartStore.cartReset();
        products.data.map((product: any) => {
          if (dataFromImage.includes(product.productName.toLowerCase())) {
            console;
            this.cartStore.addToCart(product, 1);
          }
        });
      }
    },
  },
};
</script>
<style lang="css" scoped>
h1 {
  font-size: 28px;
  margin-bottom: 50px;
}
h3 {
  font-size: 15px;
  margin-bottom: 30px;
  align-items: center;
}
.descWrapper {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 99%;
  background-color: white;
  border-radius: 30px;
  padding: 50px;
  margin: 15px;
  margin-top: -50px;
  gap: 2%;
}
.descHeader {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5%;
  height: 100%;
}
.descHeaderWrapper {
  padding: 5%;
}
.descLeft {
  background-color: #ffeb68;
  border-radius: 40px;
  width: 48%;

  padding: 4%;
  height: 450px;
}
.descRight {
  background-color: #fec091;
  border-radius: 40px;
  width: 48%;
  height: 450px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5%;
  overflow: hidden;
}
.uploadPrescription {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5%;
}
.uploadPrescriptionText {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 100%;
  height: 70%;
  background-color: white;
  border-radius: 40px;
  border: black dotted 2px;
  padding: 5%;
  margin-bottom: 60px;
}
span {
  cursor: pointer;
  font-size: 15px;
  font-weight: 400;
}
.imageContainer {
  display: flex;
}
.imageContainer img {
  object-fit: contain;

  padding-right: 5%;
}
.btnPresc {
  background-color: #3a341c;
  color: #ffeb68;
  padding: 20px 30px;
  border-radius: 40px;
  font-weight: 500;
  cursor: pointer;
}
.descDontButtonbtn {
  color: #fec091;
}
.uploadPrescriptionImage {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5%;
  align-items: center;
}

@media only screen and (max-width: 930px) {
  .descWrapper {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .descLeft {
    width: 70%;
    margin-bottom: 50px;
  }
  .descRight {
    width: 70%;
  }
}
input[type="file"] {
  display: none;
}
@media only screen and (max-width: 450px) {
  .descWrapper {
    padding: 20px;
  }
  .descLeft {
    width: 100%;
    height: fit-content;
    overflow: hidden;
  }
  .descRight {
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
  }
  .descRight img {
    display: none;
  }

  .uploadPrescriptionText {
    display: none;
  }
  .uploadPrescriptionImage {
    flex-direction: column;
    gap: 20px;
  }
  .btnPresc {
    padding: 15px 25px;
    font-size: 12px;
  }
  .uploadPrescription {
    padding: 20px;
  }
  h1 {
    font-size: 20px;
  }
  h3 {
    font-size: 12px;
  }
}
</style>
