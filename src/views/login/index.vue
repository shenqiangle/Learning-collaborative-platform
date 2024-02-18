<template>
  <div></div>
  <div class="login-container flx-center">
    <div class="login-box">
      <div class="login-left">
        <img class="login-left-img" src="../../assets/images/login_left.png" alt="login" />
      </div>
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="../../assets/images/logo.svg" alt="" />
          <h2 class="logo-text">学习协同平台</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="login">
import LoginForm from "@/views/login/components/LoginForm.vue";
</script>

<style scoped lang="scss">

@import "./index.scss";

</style>
