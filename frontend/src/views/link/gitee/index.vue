<template>
  <div class="card content-box">
    <span class="text">
      Gitee 仓库：
      <a :href=GITEE_URL target="_blank">{{ GITEE_URL }}</a> 🍒🍉🍊
    </span>
  </div>
</template>

<script setup lang="ts" name="gitee">
import { GITEE_URL } from '@/config';</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
