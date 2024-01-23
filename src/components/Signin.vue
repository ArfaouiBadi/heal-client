<template>
  <div class="authComponent">
    <Navbar />
    <div class="Wrapper">
      <div class="authContainer">
        <div class="imgContainer">
          <img src="../assets/authImg.png" alt="Auth Image" />
        </div>
      </div>
      <div class="mainContainer">
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
                type="password"
              />
            </div>
            <div class="Links">
              <a href="#" class="recoverPassword">Recover Password?</a>
              <a href="signin" class="recoverPassword"
                >i Don't Have an Account ?</a
              >
            </div>
            <br />

            <button type="button" class="signupButton" @click="handleSignin">
              Sign In
            </button>
            <div class="continu">
              <img src="../assets/Path 1.svg" alt="Path 1" />
              or continue with
              <img src="../assets/Path 1.svg" alt="Path 1" />
            </div>
            <div class="continueWithLogo">
              <a href="#" @click.prevent="handleFacebookClick"
                ><img src="../assets/Facebook.png" alt="Facebook"
              /></a>
              <a href="#" @click.prevent="handleGoogleClick"
                ><img src="../assets/google.png" alt="Google"
              /></a>
            </div>
          </form>
          <div class="messageContainer">
            <Message v-show="data.showInvalidMessage" class="popupMessage">
              Invalid email or password. Please try again.
            </Message>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Navbar from "./Navbar.vue";
import { reactive } from "vue";
import axios from "axios";
import InputText from "primevue/inputtext";

export default {
  components: {
    Navbar,
    InputText,
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
        console.log(response);
        localStorage.setItem("token", response.data.access_token);
        this.$router.push("/dashboard");
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
    };
  },
};
</script>

<style lang="css">
.Links {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 3%;
}
.imgContainer {
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.imgContainer img {
  padding-top: 40px;
  width: 100%;
}

.authContainer {
  height: 85%;
  width: 50%;
  display: flex;
  flex-direction: row;
}
.Wrapper {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
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
  color: #4461f2;
}
.signupButton {
  border: none;
  color: white;
  background-color: #4461f2;
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

.mainContainer {
  width: 50%;
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
@keyframes pulse512 {
  0% {
    box-shadow: 0 0 0 0 #7e7e7e64;
  }

  70% {
    box-shadow: 0 0 0 10px rgb(218 103 68 / 0%);
  }

  100% {
    box-shadow: 0 0 0 0 rgb(218 103 68 / 0%);
  }
}

@media only screen and (max-width: 768px) {
  .authContainer {
    display: none; /* Hide the authContainer on small screens */
  }

  .mainContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 20%;
  }
  .formContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
