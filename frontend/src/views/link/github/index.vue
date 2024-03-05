<template>
  <div class="card content-box">
    <span class="text">
      GitHub 仓库：
      <a :href=GITHUB_URL target="_blank">{{ GITHUB_URL }}</a> 🍒🍉🍊
    </span>
  </div>
</template>

<script setup lang="ts" name="github">
import { GITHUB_URL } from '@/config';</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
