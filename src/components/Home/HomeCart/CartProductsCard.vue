<template lang="html">
  <Toast />
  <div class="CartProductsCardWrapper">
    <div class="cartProductDetails">
      <div class="imageContainer">
        <img :src="product && product.image" />
      </div>
      <div class="productDetailsContainer">
        <div class="productName">
          <span>Product name :</span> {{ product && product.productName }}
        </div>
        <div class="productName">
          <span>Category :</span>
          {{ product && product.category && product.category.name }}
        </div>
        <div class="productPrice">
          <span>Subcategory :</span>
          {{ product && product.subcategory && product.subcategory.name }}
        </div>
        <div class="productPrice">
          <span>Price :</span> {{ product && product.price }} $
        </div>
      </div>
    </div>
    <div class="deleteAndQuantityContainer">
      <div class="deleteProduct" @click="handleRemoveProduct">
        <i class="pi pi-trash trash" />
      </div>
      <div class="quantityContainer">
        <div class="quantity">
          <div class="quantityButton minus" @click="handleMinusQty">
            <i class="pi pi-minus" />
          </div>
          <span>{{ product && product.qty }}</span>
          <div class="quantityButton plus" @click="handlePlusQty">
            <i class="pi pi-plus" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ProductDataSet } from "../../../interface/types";
import { useCartStore } from "../../../store/cart";

import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
export default {
  data() {
    return {
      cartStore: useCartStore(),
      toast: useToast(),
    };
  },
  components: {
    Toast,
  },
  props: {
    product: Object as () => ProductDataSet,
  },
  methods: {
    handleMinusQty() {
      if (this.product && this.product.qty && this.product.qty > 0) {
        this.product.qty = this.product.qty - 1;
        this.cartStore.handleQtyChange(this.product.id, this.product.qty);
      }
    },
    handlePlusQty() {
      if (this.product) {
        this.product.qty = this.product.qty! + 1;
        this.cartStore.handleQtyChange(this.product.id, this.product.qty);
      }
    },
    handleRemoveProduct() {
      if (this.product) {
        this.cartStore.removeFromCart(this.product.id);
      }
      this.toast.add({
        severity: "success",
        summary: "Removed from cart",
        detail: `${this.product!.productName} removed from cart`,
        life: 3000,
      });
    },
  },

  watch: {
    product: {
      handler() {
        this.cartStore.loadCart();
      },
      deep: true,
    },
  },

  mounted() {
    this.cartStore.loadCart();
  },
};
</script>
<style lang="css" scoped>
.quantity {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
.deleteProduct {
  cursor: pointer;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 10px;
}
.quantityButton {
  cursor: pointer;
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 10px;
}
.minus:hover {
  background-color: #019e87;
}
.plus:hover {
  background-color: #ec803d;
}
.trash {
  font-size: 20px;
  color: #ff3333;
}

i {
  font-size: 10px;
}
.minus {
  background-color: #00a991;
}
.plus {
  background-color: #ff914c;
  margin-left: 10px;
}
.deleteAndQuantityContainer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}
.CartProductsCardWrapper {
  background-color: #fff4ed;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 30px;
  height: fit-content;
  margin-bottom: 50px;
  padding: 30px;
  font-size: 17px;
}
img {
  width: 80px;
}
.cartProductDetails {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}
span {
  font-weight: 600;
  font-size: 17px;
  padding-left: 10px;
}

@media only screen and (max-width: 950px) {
  .CartProductsCardWrapper {
    flex-direction: column;
    gap: 20px;
  }
}
</style>
