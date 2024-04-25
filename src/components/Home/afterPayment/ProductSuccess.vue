<template lang="html">
  <div>
    <p v-if="loading"><div class="loader"></div></p>
    <div v-else>
      <div class="afterpaymentWrapper" v-if="succes===true">
        <div class="afterpaymentContainer">
          <img src="../../../assets/succes.png" class="afterPaymentimg"/>
          <h4 class="afterPaymenttext">Purchase Successful !</h4>
          <span class="afterPaymentspan">
            Your order has been successfully placed. You will be redirected to the
            home page in <b>{{ countdown }}</b> seconds.
          </span>
        </div>
      </div>
      <div class="failedWrapper" v-else>
        <div class="failedContainer">
          <img src="../../../assets/failed.png" class="afterPaymentimg" />
          <h4 class="afterPaymenttext failed">Purchase Failed !</h4>
          <span class="afterPaymentspan">
            Your order could not be processed successfully. Please try again or
            contact customer support.
          </span>
          <p class="afterPaymentspan">
            Redirecting to the home page in <b>{{ countdown }}</b> seconds.
          </p>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script lang="ts">
import axios from "axios";
export default {
  data() {
    return {
      loading: true,
      countdown: 5,
      succes : false,
    };
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
  mounted() {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    const userId = localStorage.getItem("userId");
    console.log(cart.products)
    try {
      axios
        .post("http://localhost:3000/commandproduct", {
          products: cart.products,
          userId: userId,
        },
        
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((_res) => {
          localStorage.removeItem("cart");
          this.loading = false;
          this.succes = true;
          this.startCountdown();
        })
        .catch((error) => {
          console.log(error.message);
          this.loading = false;
          this.startCountdown(); // Set loading state to false on error
        });
    } catch (error) {
      console.log(error);
      this.loading = false; // Set loading state to false on catch
    }
  },
  
};
</script>

