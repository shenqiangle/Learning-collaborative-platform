<template>
  <div class="card content-box">
    <span class="text">
      HEXO文档：
      <a :href=HEXO_URL target="_blank">{{ HEXO_URL }}</a>
      🍒🍉🍊
    </span>
  </div>
</template>

<script setup lang="ts" name="hexo">
import { HEXO_URL } from '@/config';</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
