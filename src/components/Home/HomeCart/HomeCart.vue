<template lang="html">
  <HomeThumbnail text="Cart" image="https://i.ibb.co/fMCg0S6/cart.png" />
  <home-brands />
  <div class="ShoppingCartWrapper">
    <div class="cartproducts">
      <div class="header">
        <h5>Shopping Cart</h5>
      </div>
      <div class="cartProductsCardWrapper">
        <CartProductsCard
          v-for="product in cartProducts"
          :product="(product as ProductDataSet)"
        />
      </div>
    </div>
    <div class="orderSummaryWrapper">
      <h4>Order Summary</h4>
      <table>
        <tr>
          <td>Total item</td>
          <td>
            {{ cartStore.$state.cart.products.length }}
          </td>
        </tr>
        <tr>
          <td>Cart total</td>
          <td>{{ totalCartPrice.toFixed(2) }} TND</td>
        </tr>
        <tr>
          <td>Product Discount</td>
          <td>0 TND</td>
        </tr>
        <tr>
          <td>Shipping</td>
          <td>7.00 TND</td>
        </tr>
        <tr>
          <td>Coupon Discount</td>
          <td>0 TND</td>
        </tr>
        <tr>
          <td>Total</td>
          <td>{{ (totalCartPrice + 7).toFixed(2) }} TND</td>
        </tr>
      </table>
      <div class="ContinueOrder">
        <button type="button" class="btnOrder" @click="processPayment">
          Continue Order
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import HomeThumbnail from "../HomeThumbnail.vue";
import HomeBrands from "../HomeBrands.vue";
import CartProductsCard from "./CartProductsCard.vue";
import { useCartStore } from "../../../store/cart";
import { ProductDataSet } from "../../../interface/types";
import axios from "axios";
export default {
  components: {
    HomeThumbnail,
    HomeBrands,
    CartProductsCard,
  },
  data() {
    return {
      cartStore: useCartStore(),
      cartProducts: [{}],
    };
  },
  mounted() {
    this.cartStore.loadCart();
    this.cartProducts = this.cartStore.$state.cart.products;
  },
  methods: {
    async processPayment() {
      try {
        const requestBody = {
          cartProducts: this.cartProducts.map((item: any) => ({
            productName: item.productName,
            qty: item.qty,
            price: item.price,
          })),
        };
        const response = await axios.post(
          "http://localhost:3000/payment/check/product",
          requestBody.cartProducts
        );
        window.location.href = response.data.url;
        // Handle success or redirect user to success/cancel pages
      } catch (error) {
        console.error(error);
        // Handle error
      }
    },
  },
  computed: {
    totalCartPrice() {
      return this.cartProducts.reduce(
        (acc: number, product) =>
          acc + (product as ProductDataSet).price * (product as any).qty,
        0
      );
    },
  },
};
</script>
<style lang="css" scoped>
.btnOrder {
  background-color: #00a991;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  margin-top: 15px;
}
h5 {
  color: #163300;
  font-size: 25px;
  font-weight: 700;
}
.ShoppingCartWrapper {
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  padding: 0 50px;
  gap: 30px;
}
.header {
  padding: 20px 0;
}
.cartproducts {
  flex: 10;
  display: flex;
  flex-direction: column;
  border-radius: 20px;
}
.orderSummaryWrapper {
  flex: 3;
  background-color: #f2fbf9;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  height: fit-content;
  margin-bottom: 50px;
}
td {
  padding: 10px;
}
h4 {
  color: #163300;
  font-size: 25px;
  font-weight: 700;
  padding: 25px 0;
}
table {
  width: 100%;
  border-collapse: collapse;
}
@media only screen and (max-width: 950px) {
  .ShoppingCartWrapper {
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
  }
  .orderSummaryWrapper {
    width: 50%;
  }
}
</style>
