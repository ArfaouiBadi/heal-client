<template>
  <div class="text">
    <h4><i>Lets Create you a new Account !!</i></h4>
    <h1>Sign up</h1>
  </div>
  <div class="formContainer">
    <form>
      <div class="form-group">
        <label for="email" class="label">Email Address</label><br />
        <InputText
          type="text"
          id="email"
          placeholder="Enter Email Address"
          v-model="data.email"
          class="inputForm"
          :class="{ 'p-invalid': !data.emailValid }"
        />
      </div>
      <div class="form-group-double">
        <div class="password-group groups">
          <label for="password" class="label">Password</label><br />
          <InputText
            type="password"
            id="password"
            placeholder="Enter Password"
            v-model="data.password"
            class="inputForm"
            :class="{ 'p-invalid': !data.passwordValid }"
          />
        </div>
        <div class="password-group groups">
          <label for="confirmPassword" class="label">Confirm Password</label
          ><br />
          <InputText
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            v-model="data.confirmPassword"
            class="inputForm"
            :class="{ 'p-invalid': !data.confirmPasswordValid }"
          />
        </div>
      </div>
      <div class="form-group-double">
        <div class="phone-group groups">
          <label for="phone" class="label">Phone</label><br />
          <InputText
            type="text"
            id="phone"
            placeholder="00-000-000"
            v-model="data.phone"
            class="inputForm"
            :class="{ 'p-invalid': !data.phoneValid }"
          />
        </div>

        <div class="address-group groups">
          <label for="address" class="label">Address</label><br />
          <InputText
            type="text"
            id="address"
            placeholder="Enter Address"
            v-model="data.address"
            class="inputForm"
          />
        </div>
      </div>
      <span
        >Already Have an Account ?
        <router-link to="/Signin" class="recoverPassword"
          ><ButtonAuth msg="Signup" />Sign in
        </router-link> </span
      ><br />
      <button type="button" class="signupButton" @click="handleSignUp">
        Sign Up
      </button>
      <div class="messageContainer">
        <Message
          v-show="data.showInvalidMessage"
          class="popupMessage"
          severity="error"
        >
          Please fill in all required fields correctly.
        </Message>
        <Message
          v-show="data.showSuccessMessage"
          class="popupMessage"
          severity="success"
          >User Created</Message
        >
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Navbar from "./Navbar.vue";
import axios from "axios";
import { reactive } from "vue";
import InputText from "primevue/inputtext";
import Message from "primevue/message";
export default {
  data() {
    return {
      data: reactive({
        email: "",
        password: "",
        confirmPassword: "",
        address: "",
        phone: "",
        emailValid: true,
        passwordValid: true,
        confirmPasswordValid: true,
        phoneValid: true,
        showInvalidMessage: false,
        showSuccessMessage: false,
      }),
    };
  },
  components: {
    Navbar,
    InputText,
    Message,
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
    "data.confirmPassword": function (newConfirmPassword) {
      // Update invalid flag based on confirmPassword validation
      this.data.confirmPasswordValid =
        newConfirmPassword === this.data.password;
    },
    "data.phone": function (newPhone) {
      // Update invalid flag based on phone validation
      this.data.phoneValid = this.validatePhone(newPhone);
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
      // Implement your password validation logic here
      // Example: Password must be at least 8 characters long
      return password.length >= 8;
    },
    validatePhone(phone: string): boolean {
      const phoneRegex = /^(\d{2}\d{3}\d{3})$/;
      return phoneRegex.test(phone);
    },
    async handleSignUp() {
      try {
        // Validate email
        this.data.emailValid = this.validateEmail(this.data.email);

        // Validate password
        this.data.passwordValid = this.validatePassword(this.data.password);

        // Verify password and confirm password match
        this.data.confirmPasswordValid =
          this.data.password === this.data.confirmPassword;

        // Validate phone number
        this.data.phoneValid = this.validatePhone(this.data.phone);

        // Check if all validations passed
        if (
          this.data.emailValid &&
          this.data.passwordValid &&
          this.data.confirmPasswordValid &&
          this.data.phoneValid
        ) {
          try {
            const response = await axios.post(
              "http://localhost:3000/auth/signup",
              this.data
            );
            console.log(response);
            this.data.showSuccessMessage = true;
            setTimeout(() => {
              this.data.showSuccessMessage = false;
              this.$router.push("/signin");
            }, 3000);
          } catch (error) {
            console.log(error);
            // Show the message if sign-in fails
            this.data.showInvalidMessage = true;

            // Reset the flag to false after 3 seconds
            setTimeout(() => {
              this.data.showInvalidMessage = false;
            }, 3000);
          }
        } else {
          this.data.showInvalidMessage = true;
          setTimeout(() => {
            this.data.showInvalidMessage = false;
          }, 3000);
          console.log("Validation failed. Please check your inputs.");
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style lang="css">

.form-group {
  margin-bottom: 10px;
}
.form-group-double {
  display: flex;
  flex-direction: row;
  gap: 2.5%;
  margin-bottom: 20px;
}
.groups {
  flex: 1;
}

.form-group-double input {
  flex: 1;
}


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
  font-size: 0.8rem;
  user-select: none;
}

.form-group + .form-group {
  margin-top: 20px;
}

.inputForm:hover,
.inputForm:focus {
  background-position: right center;
  background-size: 200% auto;
  -webkit-animation: pulse 3s infinite;
  animation: pulse512 1.5s infinite;
  outline: none;
}
form {
  display: flex;
  flex-direction: column;
  width: 80%;
}
.continu {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  font-family: "Poppins";
  font-weight: 300;
  color: rgba(0, 0, 0, 0.455);
  font-size: 15px;
  margin-top: 23px;
  text-decoration: none;
  text-align: center;
}
.continu a {
  text-decoration: none;
  color: rgba(0, 0, 0, 0.455);
  font-size: 15px;
  margin-top: 23px;
  text-decoration: none;
  text-align: center;
}
.continueWithLogo {
  margin-top: 8px;
  text-align: center;
}
.continueWithLogo img {
  width: 14%;
  margin-top: 6px;
  padding-left: 16px;
}

.recoverPassword {
  font-family: "Poppins";
  font-weight: 300;
  color: rgba(0, 0, 0, 0.455);
  font-size: 15px;
  margin-top: 23px;
  text-decoration: none;
  text-align: center;
}
.recoverPassword:hover {
  color: #9fe870;
}
.signupButton {
  border: none;
  color: white;
  background-color: #14a800;
  border-radius: 20px;
  font-family: "Poppins";
  font-size: 23px;
  width: 70%;
  margin: auto;
  font-weight: 200;
  padding: 0.6em 1.5em;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
}
.signupButton:hover {
  background-position: right center;
  background-size: 200% auto;
  -webkit-animation: pulse 2s infinite;
  animation: pulse512 1.5s infinite;
}


.text {
  padding: 3rem 0px 0px 40px;
}
h1 {
  font-size: 50px;
  font-weight: 700;
  font-family: "Poppins";
}
h4 {
  font-family: "Poppins";
  font-weight: 300;
}
.messageContainer {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  height: 10%;
  margin-bottom: 20px;
}
@keyframes pulse512 {
  0% {
    box-shadow: 0 0 0 0 #14a8002b;
  }

  70% {
    box-shadow: 0 0 0 10px rgba(93, 218, 68, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(68, 218, 108, 0);
  }
}

@media only screen and (max-width: 768px) {
  .authContainer {
    display: none;
  }

  .mainContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20%;
  }

  label {
    font-family: "Poppins";
    font-weight: 300;
    color: black;
    font-size: 12px;
  }
  h1 {
    text-align: center;
  }
  .form-group-double {
    flex-direction: column;
  }
}
</style>
