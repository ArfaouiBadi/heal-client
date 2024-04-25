<template lang="html">
  <div class="footerWrapper">
    <div class="newsLetter">
      <div class="newsLetterText">
        <h4>Join our newsletter</h4>
        <span>We'll send you a nice letter once per week, No spam.</span>
      </div>
      <div class="newsLetterInput">
        <span class="p-input-icon-left newsLetterInputWrapper">
          <i class="pi pi-send" />
          <InputText
            v-model="value1"
            placeholder="Enter Email Address"
            class="search"
          />
        </span>
        <button type="button" class="btnSubscribe">Subscribe</button>
      </div>
    </div>
    <Divider />
    <div class="footerLinks">
      <div class="grid-container">
        <div class="grid-item gridHeader">Product</div>
        <div class="grid-item gridHeader">Social</div>
        <div class="grid-item gridHeader">Legal</div>
        <div class="grid-item gridHeader">Resources</div>

        <div class="grid-item">Overview</div>
        <div class="grid-item">Facebook</div>
        <div class="grid-item">Terms</div>
        <div class="grid-item">About Us</div>

        <div class="grid-item">Features</div>
        <div class="grid-item">Twitter</div>
        <div class="grid-item">Privacy</div>
        <div class="grid-item">Newsletter</div>

        <div class="grid-item">Pricing</div>
        <div class="grid-item">LinkedIn</div>
        <div class="grid-item">Licences</div>
        <div class="grid-item">Help Center</div>
      </div>
    </div>
    <Divider />
    <div class="logoFooterWrapper">
      <div class="logoFooter">Healverse</div>
      <div class="copyRight">© 2024 Healverse. All rights reserved.</div>
    </div>
  </div>
</template>
<script lang="ts">
import InputText from "primevue/inputtext";
import Divider from "primevue/divider";
export default {
  components: {
    InputText,
    Divider,
  },
  data() {
    return {
      value1: "",
    };
  },
};
</script>
<style lang="css">
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(20%, 1fr));
  gap: 15px;
  margin: 50px 0;
}

.grid-item {
  padding: 8px;
  font-size: 14px;
}
.gridHeader {
  font-weight: 500;
}
.btnSubscribe {
  display: flex;
}
.footerWrapper {
  margin-top: 50px;
  background-color: #f4f4f4;
  height: fit-content;
  width: 100%;
  border-radius: 30px 30px 0 0;
  padding: 60px;
  position: relative;
}
.newsLetter {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 50px;
}
.newsLetter h4 {
  font-weight: 700;
  font-size: 23px;
}
.newsLetter span {
  font-weight: 300;
  font-size: 16px;
}
.btnSubscribe {
  background-color: #1c2729;
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}
.newsLetterInputWrapper {
  margin-right: 10px;
  width: auto;
}
.logoFooterWrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 50px;
  font-size: 16px;
  font-weight: 200;
}
.logoFooter {
  font-size: 30px;
  font-weight: 600;
  font-style: normal;
  font-family: "Lobster", sans-serif;
  font-style: normal;
  color: #163300;
  user-select: none;
  cursor: pointer;
}
@media screen and (max-width: 768px) {
  .newsLetter {
    flex-direction: column;
  }
  .search {
    width: 100%;
  }
  .btnSubscribe {
    width: 50%;
    font-size: 10px;
  }
  .logoFooterWrapper {
    flex-direction: column;
  }
}
</style>
