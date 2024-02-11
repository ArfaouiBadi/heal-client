// stores/cart.js
import { defineStore } from "pinia";
import { Cart, Plan, ProductDataSet } from "../interface/types";
import { v4 as uuid4 } from "uuid";

interface State {
  cart: Cart;
}

export const useCartStore = defineStore("cart", {
  state: () => ({
    cart: { cartId: "", products: [] } as Cart,
  }),
  actions: {
    loadCart() {
      const loadedCart = localStorage.getItem("cart");
      if (!loadedCart) {
        this.cart = { cartId: "", products: [] };
      } else {
        this.cart = JSON.parse(loadedCart);
      }
    },
    addToCart(product: ProductDataSet, qty: number) {
      const id = product.id;
      const cartStore = localStorage.getItem("cart");

      if (!cartStore) {
        this.cart = {
          cartId: uuid4(),
          products: [{ ...product, qty: 0 }],
        };
      } else {
        const cart = JSON.parse(cartStore);
        const existingProductIndex = cart.products.findIndex(
          (p: ProductDataSet) => p.id === id
        );

        if (existingProductIndex !== -1) {
          // Product already exists in the cart
          if (
            cart.products[existingProductIndex].quantity >=
            cart.products[existingProductIndex].qty + 1
          ) {
            cart.products[existingProductIndex].qty += 1;
          }
        } else {
          // Product doesn't exist in the cart, add it
          cart.products.push({ ...product, qty });
        }

        this.cart = cart;
      }

      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    removeFromCart(productId: string) {
      const cartStore = localStorage.getItem("cart");
      if (!cartStore) {
        return;
      }

      const cart = JSON.parse(cartStore);
      const existingProductIndex = cart.products.findIndex(
        (p: ProductDataSet) => p.id === productId
      );

      if (existingProductIndex !== -1) {
        cart.products.splice(existingProductIndex, 1);
      }

      this.cart = cart;
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    handleQtyChange(productId: string, qty: number) {
      const cartStore = localStorage.getItem("cart");
      if (!cartStore) {
        return;
      }

      const cart = JSON.parse(cartStore);
      const existingProductIndex = cart.products.findIndex(
        (p: ProductDataSet) => p.id === productId
      );

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].qty = qty;
      }
      if (qty === 0) {
        cart.products.splice(existingProductIndex, 1);
      }

      this.cart = cart;
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    cartReset() {
      localStorage.removeItem("cart");
      this.cart = { cartId: "", products: [] };
    },
  },
});
