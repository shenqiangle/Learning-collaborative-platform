<template>
  <div class="card">
    <label class="container" >
      <div class="taskInfo">
        <div :class="{'completed':taskInfo.isCompleted}" ref="taskNameRef">任务名称:{{ taskInfo.taskName }}</div>
        <div>所属队伍:{{ taskInfo.teamName }}</div>
      </div>
      <input type="checkbox" :checked="taskInfo.isCompleted" @change="onCheckboxChange($event)"/>
      <span class="checkmark"></span>
    </label>
  </div>
</template>

<script setup lang="ts" name="TaskItem">
import { ref } from 'vue'
const props = defineProps(['taskInfo'])
const emit = defineEmits(['updateCheckbox'])

const taskNameRef = ref()

/* function onCheckboxChange(event: Event) {
  if((event.target as HTMLInputElement)?.checked){
    emit('updateCheckbox',props.taskInfo.id,(event.target as HTMLInputElement)?.checked)
  }   
} */
function onCheckboxChange(event: Event) {
  if(event.target && 'checked' in event.target){
    emit('updateCheckbox',props.taskInfo.id,event.target.checked)
  }
    
}



</script>

<style lang="scss" scoped>
@import '../index.scss';
</style>
