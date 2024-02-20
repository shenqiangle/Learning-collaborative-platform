<template>
  <div>
    <Header />
    <el-collapse v-model="activeNames">
      <el-collapse-item class="el-collapse-item" name="1">
        <template #title>
          <div class="el-collapse-item-title">待办</div>
          <div class="el-collapse-item-number">{{ unCompletedList?.length }}</div>
        </template>
        <el-row justify="center" v-if="unCompletedList?.length">
            <el-col
              :span="24"
              :offset="0"
              class="team-main"
              v-for="taskInfo in unCompletedList"
              :key="taskInfo.id"
            >
              <TaskItem :taskInfo="taskInfo" @updateCheckbox="updateTaskList" />
            </el-col>
        </el-row>
        <div v-else>暂无数据</div>
      </el-collapse-item>
      <el-collapse-item class="el-collapse-item" name="2">
        <template #title>
          <div class="el-collapse-item-title">已完成</div>
          <div class="el-collapse-item-number">{{ completedList?.length }}</div>
        </template>
        <el-row justify="center" v-if="completedList?.length">
            <el-col
              :span="24"
              :offset="0"
              class="team-main"
              v-for="taskInfo in completedList"
              :key="taskInfo.id"
            >
              <TaskItem :taskInfo="taskInfo" @updateCheckbox="updateTaskList" />
            </el-col>
        </el-row>
        <div v-else>暂无数据</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts" name="myTask">
import { ref, watch } from 'vue'
import Header from './components/header.vue'
import TaskItem from './components/taskItem.vue'
import { useUserStore } from '@/stores/modules/user'
import type { Task } from '@/types/task'
import 'animate.css'
import { showMessage } from '@/composables/util'
import * as audioFile from '@/assets/audio/ping-82822.mp3';
const UserStore = useUserStore()
let completedList = ref<Task[]>([])
let unCompletedList = ref<Task[]>([])
let activeNames = ref(['1'])
const audio = new Audio(audioFile.default);
watch(
  () => UserStore.userInfo.taskList as Task[],
  (newTaskList: Task[]) => {
    if (newTaskList) {
      completedList.value = []
      unCompletedList.value = []
      newTaskList.forEach((i: Task) => {
        i.isCompleted ? completedList.value.unshift(i) : unCompletedList.value.unshift(i)
      })
    }
  },
  { immediate: true, deep: true } // 使得 watch 创建时立即执行回调函数
)

function updateTaskList(id: string, checked: boolean) {
  UserStore.userInfo.taskList?.forEach((element) => {
    if (element.id == id) {
      element.isCompleted = checked
      if(checked){
        audio.play();
        showMessage('提交成功','success')
      }
      else{
        showMessage('取消成功','warning')
      }
    }
    
  })
}
</script>

<style lang="scss" scoped>
@import './index.scss';

@keyframes slideFadeDown {
  to {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  from {
    transform: translate3d(0, -100%, 0);
    opacity: 0;
  }
  
}

.team-main {
  animation:  slideFadeDown 250ms forwards;
}

</style>
