<template>
  <div class="text">
    <h4><i>Welcome Back!</i></h4>
    <h1>Sign in</h1>
  </div>
  <div class="formContainer">
    <form>
      <div class="form-group">
        <label for="email" class="label">Email Address</label><br />
        <InputText
          id="email"
          v-model="data.email"
          aria-describedby="username-help"
          class="inputForm"
          :class="{ 'p-invalid': !data.emailValid }"
          placeholder="Enter Email"
          autocomplete="username"
        />
      </div>

      <div class="form-group">
        <label for="password" class="label">Password</label><br />

        <InputText
          id="password"
          v-model="data.password"
          aria-describedby="username-help"
          class="inputForm"
          :class="{ 'p-invalid': !data.passwordValid }"
          placeholder="Enter Password"
          autocomplete="current-password"
          type="password"
        />
      </div>
      <div class="Links">
        <a href="#" class="recoverPassword">Recover Password?</a>
        <router-link to="/auth/signup" class="recoverPassword"
          >i Don't Have an Account ?</router-link
        >
      </div>
      <br />

      <button type="button" class="signupButton" @click="handleSignin">
        Sign In
      </button>
    </form>
    <div class="messageContainer">
      <Message v-show="data.showInvalidMessage" class="popupMessage">
        Invalid email or password. Please try again.
      </Message>
    </div>
  </div>
</template>

<script lang="ts">
import Navbar from "./Navbar.vue";
import { reactive } from "vue";
import axios from "axios";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
import { useUserStore } from "../store/user";

export default {
  components: {
    Navbar,
    InputText,
    Message,
  },
  setup() {
    return {};
  },
  watch: {
    "data.email": function (newEmail) {
      // Update invalid flag based on email validation
      this.data.emailValid = this.validateEmail(newEmail);
    },
    "data.password": function (newPassword) {
      // Update invalid flag based on password validation
      this.data.passwordValid = this.validatePassword(newPassword);
    },
  },
  methods: {
    handleFacebookClick() {
      console.log("Facebook clicked!");
      // Add your Facebook login logic here
    },
    handleGoogleClick() {
      console.log("Google clicked!");
      // Add your Google login logic here
    },
    validateEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },
    validatePassword(password: string): boolean {
      return password.length >= 8;
    },
    async handleSignin() {
      try {
        const response = await axios.post(
          "http://localhost:3000/auth/signin",
          this.data
        );
        localStorage.setItem("token", response.data.access_token);
        localStorage.setItem("userId", response.data.userId);
        this.userStore.setUser(response.data.user);
        this.$router.push("/");
      } catch (error) {
        console.log(error);
        // Show the message if sign-in fails
        this.data.showInvalidMessage = true;

        // Reset the flag to false after 3 seconds
        setTimeout(() => {
          this.data.showInvalidMessage = false;
        }, 3000);
      }
    },
  },

  data() {
    return {
      data: reactive({
        email: "",
        password: "",
        emailValid: true,
        passwordValid: true,
        showInvalidMessage: false,
      }),
      userStore: useUserStore(),
    };
  },
  mounted() {
    this.userStore.loadUser();
  },
};
</script>

<style lang="css">
.formContainer {
  width: 100%;
  display: flex;
  padding: 40px;
  align-items: center;
}
label {
  font-family: "Poppins";
  font-weight: 300;
  color: black;
  font-size: 23px;
}

.form-group + .form-group {
  margin-top: 20px;
}
.inputForm {
  width: 100%;
  padding: 12px;
  border-radius: 15px;
  margin-top: 10px;
  padding-left: 20px;
  color: #707070;
  background-color: #eaf0f7;
}
.text {
  padding: 20px 0px 0px 40px;
}
h1 {
  font-size: 50px;
  font-weight: 700;
  font-family: "Poppins";
  margin-top: 3px;
}
h4 {
  font-family: "Poppins";
  font-weight: 300;
}
input::placeholder {
  font-family: "Poppins";
  font-weight: 300;
  color: rgba(0, 0, 0, 0.455);
  font-size: 15px;
}
input {
  font-family: "Poppins";
  font-weight: 300;
  color: rgba(0, 0, 0, 0.455);
  font-size: 15px;
}
@media only screen and (max-width: 768px) {
  .authContainer {
    display: none; /* Hide the authContainer on small screens */
  }

  .formContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
