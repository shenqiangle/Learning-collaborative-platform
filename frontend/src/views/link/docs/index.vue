<template>
  <div class="card content-box">
    <span class="text"> 项目文档： <a :href=PROJECT_DOC_URL target="_blank">{{ PROJECT_DOC_URL }}</a> 🍒🍉🍊 </span>
  </div>
</template>

<script setup lang="ts" name="docs">
import { PROJECT_DOC_URL } from '@/config';</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
