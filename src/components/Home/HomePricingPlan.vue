<template lang="html">
  <div class="background">
    <div class="container">
      <div class="panel pricing-table">
        <div class="pricing-plan">
          <img
            src="https://s22.postimg.cc/8mv5gn7w1/paper-plane.png"
            alt=""
            class="pricing-img"
          />
          <h2 class="pricing-header">Basic</h2>
          <ul class="pricing-features">
            <li class="pricing-features-item">
              Access to a curated selection of essential medications (up to 10
              products).
            </li>
          </ul>
          <span class="pricing-price">9.99 DT/month</span>
          <a
            href="#/"
            class="pricing-button"
            @click="handleBuyPlan('Basic', 9.99)"
            >Buy Plan</a
          >
        </div>

        <div class="pricing-plan">
          <img
            src="https://s28.postimg.cc/ju5bnc3x9/plane.png"
            alt=""
            class="pricing-img"
          />
          <h2 class="pricing-header">Premium</h2>
          <ul class="pricing-features">
            <li class="pricing-features-item">
              Full access to an extensive catalog of pharmaceutical products (up
              to 100 products).
            </li>
            <li class="pricing-features-item">
              Email support for any product-related inquiries.
            </li>
            <li class="pricing-features-item">
              Monthly health tips and updates.
            </li>
          </ul>
          <span class="pricing-price">49.99 DT/month</span>
          <a
            href="#/"
            class="pricing-button is-featured"
            @click="handleBuyPlan('Premium', 49.99)"
            >Buy plan</a
          >
        </div>

        <div class="pricing-plan">
          <img
            src="https://s21.postimg.cc/tpm0cge4n/space-ship.png"
            alt=""
            class="pricing-img"
          />
          <h2 class="pricing-header">Gold</h2>
          <ul class="pricing-features">
            <li class="pricing-features-item">
              Expanded access to a diverse range of wellness products (up to 50
              products).
            </li>
          </ul>
          <span class="pricing-price">29.99 DT/month</span>
          <a
            href="#/"
            class="pricing-button"
            @click="handleBuyPlan('Gold', 29.99)"
            >Buy plan</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import axios from "axios";
import { useCartStore } from "../../store/cart";
import { usePlanStore } from "../../store/plan";
export default {
  data() {
    return {
      cartStore: useCartStore(),
      planStore: usePlanStore(),
      cartPlan: {},
    };
  },
  mounted() {
    this.planStore.loadPlan();
    console.log(this.planStore);
    this.cartPlan = this.planStore.$state.plan;
    console.log(this.cartPlan);
  },
  methods: {
    handleBuyPlan(productName: string, price: number) {
      const user = JSON.parse(localStorage.getItem("user")!);
      if (!user) {
        this.$router.push("auth/signin");
        return;
      }
      this.planStore.addToPlan({ productName, price, qty: 1 });
      this.processPayment();
    },
    async processPayment() {
      try {
        const requestBodyPlan = {
          planStore: this.planStore,
        };
        const response = await axios.post(
          "http://localhost:3000/payment/check",
          [requestBodyPlan.planStore]
        );

        console.log(response.data.success);
        window.location.href = response.data.url;
        // Handle success or redirect user to success/cancel pages
      } catch (error) {
        console.error(error);
        // Handle error
      }
    },
  },
};
</script>
<style lang="css">
.background {
  padding: 0 25px 25px;
  position: relative;
  width: 100%;
}

.background::after {
  content: "";
  background: white;
  background: -moz-linear-gradient(top, #e1f1ff 0%, #4394f4 100%);
  background: -webkit-linear-gradient(top, #e1f1ff 0%, #4394f4 100%);
  background: linear-gradient(to bottom, #e1f1ff 0%, #c1e2ff 100%);
  height: 500px;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 1;
  border-radius: 30px 30px 10px 10px;
}

@media (min-width: 900px) {
  .background {
    padding: 0 0 25px;
  }
}

.container {
  margin: 0 auto;
  padding: 50px 0 0;
  max-width: 70%;
  width: 100%;
  margin-top: 50px;
}

.panel {
  background-color: #fff;
  border-radius: 10px;
  padding: 15px 25px;
  position: relative;
  width: 100%;
  z-index: 10;
}

.pricing-table {
  box-shadow: 0px 10px 13px -6px rgba(0, 0, 0, 0.08),
    0px 20px 31px 3px rgba(0, 0, 0, 0.09), 0px 8px 20px 7px rgba(0, 0, 0, 0.02);
  display: flex;
  flex-direction: column;
}

@media (min-width: 1450px) {
  .pricing-table {
    flex-direction: row;
  }
}

.pricing-table * {
  text-align: center;
  text-transform: uppercase;
}

.pricing-plan {
  border-bottom: 1px solid #e1f1ff;
  padding: 25px;
}

.pricing-plan:last-child {
  border-bottom: none;
}

@media (min-width: 900px) {
  .pricing-plan {
    border-bottom: none;
    border-right: 1px solid #e1f1ff;
    flex-basis: 100%;
    padding: 25px 50px;
  }

  .pricing-plan:last-child {
    border-right: none;
  }
}

.pricing-img {
  margin-bottom: 25px;
  max-width: 100%;
}

.pricing-header {
  color: #888;
  font-weight: 600;
  letter-spacing: 1px;
}

.pricing-features {
  color: #016ff9;
  font-weight: 600;
  letter-spacing: 1px;
  margin: 50px 0 25px;
}

.pricing-features-item {
  border-top: 1px solid #e1f1ff;
  font-size: 12px;
  line-height: 1.5;
  padding: 15px 0;
}

.pricing-features-item:last-child {
  border-bottom: 1px solid #e1f1ff;
}

.pricing-price {
  color: #016ff9;
  display: block;
  font-size: 32px;
  font-weight: 700;
}

.pricing-button {
  border: 1px solid #9dd1ff;
  border-radius: 10px;
  color: #348efe;
  display: inline-block;
  margin: 25px 0;
  padding: 15px 35px;
  text-decoration: none;
  transition: all 150ms ease-in-out;
}

.pricing-button:hover,
.pricing-button:focus {
  background-color: #e1f1ff;
}

.pricing-button.is-featured {
  background-color: #48aaff;
  color: #fff;
}

.pricing-button.is-featured:hover,
.pricing-button.is-featured:active {
  background-color: #269aff;
}
</style>
