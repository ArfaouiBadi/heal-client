// stores/plan.js
import { defineStore } from "pinia";
import { Plan } from "../interface/types";
import { v4 as uuid4 } from "uuid";

export const usePlanStore = defineStore("plan", {
  state: () => ({
    plan: { planId: "", productName: "", price: 0, qty: 0 } as Plan,
  }),
  actions: {
    // Load plan from local storage
    loadPlan() {
      const loadedPlan = localStorage.getItem("plan");
      if (!loadedPlan) {
        // If no plan is found in local storage, initialize with default values
        this.plan = { planId: "", productName: "", price: 0, qty: 1 };
      } else {
        // Parse and set the loaded plan
        this.plan = JSON.parse(loadedPlan);
      }
    },
    // Add or update the plan in local storage
    addToPlan(planParam: any) {
      // Retrieve the existing plan from local storage
      const storedPlan = localStorage.getItem("plan");
      if (!storedPlan) {
        this.plan = {
          planId: uuid4(),
          productName: planParam.productName,
          price: planParam.price,
          qty: 1,
        };
      } else {
        const existingPlan = JSON.parse(storedPlan);
        existingPlan.productName = planParam.productName;
        existingPlan.price = planParam.price;
        existingPlan.qty = 1;
        existingPlan.planId = this.plan.planId;
        this.plan = existingPlan;
      }
      localStorage.setItem("plan", JSON.stringify(this.plan));
    },
  },
});
