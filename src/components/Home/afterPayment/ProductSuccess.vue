<template lang="html">
  <div>
    <p v-if="loading"><div class="loader"></div></p>
    <div class="afterpaymentWrapper" v-else>
      <div class="afterpaymentContainer">
        <img src="../../../assets/succes.png" class="afterPaymentimg"/>
        <h4 class="afterPaymenttext">Purchase Successful !</h4>
        <span class="afterPaymentspan">
          Your order has been successfully placed. You will be redirected to the
          home page in <b>{{ countdown }}</b> seconds.
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
export default {
  data() {
    return {
      loading: true, // Initial loading state
      countdown: 5, // Initial countdown value
    };
  },
  methods: {},
  mounted() {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const userId = localStorage.getItem("userId");

    try {
      axios
        .post("http://localhost:3000/commandproduct", {
          products: cart.products,
          userId: userId,
        })
        .then((res) => {
          localStorage.removeItem("cart");
          this.loading = false;
          this.startCountdown();
          
           
        })
        .catch((error) => {
          console.log(error);
          this.loading = false; // Set loading state to false on error
        });
    } catch (error) {
      console.log(error);
      this.loading = false; // Set loading state to false on catch
    }
  },
  methods: {
    startCountdown() {
      const countdownInterval = setInterval(() => {
        if (this.countdown > 0) {
          this.countdown -= 1;
        } else {
          clearInterval(countdownInterval);
          // Redirect to the home page after countdown reaches 0
          window.location.href = "http://localhost:5173/";
        }
      }, 1000); // Update countdown every second
    },
  },
};
</script>

