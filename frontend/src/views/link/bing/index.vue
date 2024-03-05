<template>
  <div class="card content-box">
    <iframe :src=BING_URL frameborder="0" class="full-iframe"></iframe>
  </div>
</template>

<script setup lang="ts" name="bing">
import { BING_URL } from '@/config';</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
