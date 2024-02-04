<template lang="html">
  <div>
    <div class="failedWrapper">
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
</template>

<script lang="ts">
export default {
  data() {
    return {
      countdown: 5, // Initial countdown value
    };
  },
  mounted() {
    this.startCountdown(); // Start the countdown when the component is mounted
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
