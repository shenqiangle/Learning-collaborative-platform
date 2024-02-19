<template>
    <span class="team-progress-text">队伍任务进度</span>
    <el-progress
    :text-inside="true"
    :percentage="percentage" 
    :status="status" 
    />
    
    </template>

<script setup lang="ts" name="TeamProgress">
import { defineProps, watchEffect, ref, computed } from 'vue';
import type { Task } from '@/types/task';

// 定义props
let props = defineProps(['teamTaskList']);

// 初始化计算值
let completedNumber = ref(0);
let percentage = ref(0);
let status = computed(() => percentage.value === 100 ? "success" : "");

// 当 props 的 teamTaskList 发生变化时，重新计算 completedNumber
watchEffect(() => {
  completedNumber.value = 0;
  // 确保 teamTaskList 已定义
  if(props.teamTaskList){
    const tasks = Object.values(props.teamTaskList) as Task[];
    tasks.forEach((i: Task) => {
      if(i.isCompleted) {
        completedNumber.value++;
      }
    });
    if(tasks.length){
      percentage.value = Math.floor((completedNumber.value / tasks.length) * 100);
    }
  }
  else{
    percentage.value = 0;
  }
});

</script>
<style lang="scss" scoped>
    @import "../index.scss";
</style>