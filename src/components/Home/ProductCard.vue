<template lang="html">
  <div class="cardWrapper">
    <Toast :baseZIndex="2000" :style="{ width: '300px' }" />
    <div class="imgContainer"><img :src="product!.image" /></div>
    <div class="infoWrapper">
      <div class="categoryContainer">
        <div class="category">{{ product!.category.name }}</div>
        <div class="subcategory">{{ product!.subcategory.name }}</div>
      </div>
      <div class="nameContainer">
        <div class="name">{{ product!.productName }}</div>
        <div class="rating">
          <i class="pi pi-star-fill ratingstar" />
          <span v-if="product!.reviews>0">({{ product!.reviews }})</span>
        </div>
      </div>
      <div class="priceContainer">
        <div class="addToCart" @click="handleAddToCart">
          <i class="pi pi-plus" />
          <span>Add to cart</span>
        </div>
        {{ product!.price }} TND
      </div>
    </div>
  </div>
</template>
<script lang="ts" scoped>
import { useCartStore } from "../../store/cart";
import { ProductDataSet } from "../../interface/types";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";

export default {
  components: {
    Toast,
  },
  data() {
    return {
      cartStore: useCartStore(),
      toast: useToast(),
    };
  },
  props: {
    product: Object as () => ProductDataSet,
  },
  methods: {
    handleAddToCart() {
      this.cartStore.addToCart(this.product!, 1);
      this.toast.add({
        severity: "success",
        summary: "Added to cart",
        detail: `${this.product!.productName} added to cart`,
        life: 3000,
      });
    },
  },
  mounted() {
    this.cartStore.loadCart();
  },
};
</script>
<style lang="css" scoped>
.cardWrapper {
  background-color: #f4f4f4;
  border-radius: 30px;
  width: 270px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  color: #163300;
  overflow: hidden;
}
.imgContainer {
  height: 50%;
}
.infoWrapper {
  background-color: white;
  height: 50%;
  margin-top: 50px;
  border: #f4f4f4 solid 3px;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.cardWrapper img {
  width: 50%;
}
.subcategory {
  font-size: 13px;
  font-weight: 300;
}
.priceContainer {
  font-size: 13px;
  font-weight: 700;
  padding: 0 10% 10% 10%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.nameContainer {
  font-size: 13px;

  font-weight: 700;
  padding: 0 10%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.categoryContainer {
  font-size: 13px;
  display: flex;
  font-weight: 700;
  justify-content: space-between;
  padding: 0 10%;
  margin-top: 20px;
  flex-wrap: wrap;
}
.addToCart {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1.5px solid #163300;
  padding: 5px 10px;
  border-radius: 20px;
  transition: 0.2s all ease-in-out;
  user-select: none;
}
i {
  padding-right: 5px;
}
.addToCart:hover {
  cursor: pointer;
  background-color: #163300;
  color: white;
  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.08),
    0px 1px 30px 5px rgba(0, 0, 0, 0.09), 0px 8px 20px 7px rgba(0, 0, 0, 0.02);
}
.ratingstar {
  color: #f4d03f;
}
.nameContainer span {
  font-weight: 300;
}

@media only screen and (max-width: 850px) {
  span {
    font-size: 10px;
  }
}
</style>
