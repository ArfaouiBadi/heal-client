// stores/cart.js
import { defineStore } from "pinia";
import { User } from "../interface/types";
export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      id: "",
      email: "",
      address: "",
      phone: "",
      role: "",
      plan: { name: "" },
    } as User,
  }),
  actions: {
    loadUser() {
      const loadedUser = localStorage.getItem("user");
      if (!loadedUser) {
        this.user = {
          id: "",
          email: "",
          address: "",
          phone: "",
          role: "",
          plan: { name: "" },
        };
      } else {
        this.user = JSON.parse(loadedUser);
      }
    },
    setUser(user: User) {
      console.log(user);
      this.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    getIsAdmin() {
      return this.user.role === "ADMIN";
    },
    getPLan() {
      return this.user.plan;
    },
  },
});
