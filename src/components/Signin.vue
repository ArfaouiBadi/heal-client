<template>
  <div class="mainContainer">
    <div class="text">
      <h4><i>Welcome Back !</i></h4>
      <h1>Sign in</h1>
    </div>
    <div class="formContainer">
      <form>
        <div class="form-group">
          <label for="email" class="label">Email Adress</label><br />
          <input
            v-model="email"
            placeholder="Enter Email Adress"
            class="inputForm"
          />
        </div>
        <div class="form-group">
          <label for="password" class="label">Password</label><br />
          <input
            v-model="password"
            placeholder="Enter Password"
            class="inputForm"
          />
        </div>
        <a href="" class="recoverPassword">Recover Password ?</a><br />
        <button class="signupButton">Sign Up</button>
        <div class="continu">
          <img src="../assets/Path 1.svg" alt="" />
          or continue with
          <img src="../assets/Path 1.svg" alt="" />
        </div>
        <div class="continueWithLogo">
          <a href=""><img src="../assets/Facebook.png" alt="" /></a>
          <a href=""><img src="../assets/google.png" alt="" /></a>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const email = ref("");
const password = ref("");
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
</style>
