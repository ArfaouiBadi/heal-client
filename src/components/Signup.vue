<template>
  <div class="authComponent">
    <Navbar />
    <div class="fexing">
      <div class="authContainer">
        <div class="imgContainer">
          <img src="../assets/register.png" alt="signup Image" />
        </div>
      </div>
      <div class="mainContainer">
        <div class="text">
          <h4><i>Lets Create you a new Account !!</i></h4>
          <h1>Sign up</h1>
        </div>
        <div class="formContainer">
          <form>
            <div class="form-group">
              <label for="email" class="label">Email Address</label><br />
              <input
                type="text"
                id="email"
                placeholder="Enter Email Address"
                class="inputForm"
              />
            </div>
            <div class="form-group-double">
              <div class="password-group">
                <label for="password" class="label">Password</label><br />
                <input
                  type="password"
                  id="password"
                  placeholder="Enter Password"
                  class="inputForm"
                />
              </div>
              <div class="password-group">
                <label for="password" class="label">Confirm Password</label
                ><br />
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  class="inputForm"
                />
              </div>
            </div>
            <div class="form-group-double">
              <div class="phone-group">
                <label for="phone" class="label">Phone</label><br />
                <input
                  type="text"
                  id="phone"
                  placeholder="00-000-000"
                  class="inputForm"
                />
              </div>
              <div class="address-group">
                <label for="address" class="label">Address</label><br />
                <input
                  type="text"
                  id="address"
                  placeholder="Enter Address"
                  class="inputForm"
                />
              </div>
            </div>
            <span
              >Alreadt Have an Account ?
              <a href="#" class="recoverPassword">Signin</a></span
            ><br />
            <button type="button" class="signupButton">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Navbar from "./Navbar.vue";

export default {
  components: {
    Navbar,
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
  },
};
</script>
<style lang="css">
.authComponent {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.form-group-double {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
}
.form-group-double input {
  width: 100%;
}

.imgContainer {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.imgContainer img {
  padding-top: 40px;
  width: 70%;
}

.authContainer {
  height: 85%;
  width: 50%;
  display: flex;
  flex-direction: row;
}
.fexing {
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
  border: 1px solid #707070;
  border-radius: 15px;
  margin-top: 10px;
  padding-left: 20px;
  color: #707070;
  background-color: #eaf0f7;
  border: none;
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
  }
}
</style>
