<template>
  <div class="card">
    <label class="container">
      <input type="checkbox" @change="handleNewPlan($event)" />
      <span class="checkmark"></span>
      <el-input
        v-model="newPlanInfo.planName"
        :autosize="{ minRows: 1, maxRows: 4 }"
        type="textarea"
        placeholder="添加待办"
      />
      <el-date-picker
        v-model="newPlanInfo.planDay"
        type="date"
        placeholder="Pick a Date"
        format="YYYY/MM/DD"
        value-format="YYYY-MM-DD"
      />
    </label>
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
            v-for="PlanInfo in unCompletedList"
            :key="PlanInfo.id"
          >
            <PlanItem
              :PlanInfo="PlanInfo"
              @updateCheckbox="updatePlanList"
              @updatePlanImportant="updatePlanImportant"
            />
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
            v-for="PlanInfo in completedList"
            :key="PlanInfo.id"
          >
            <PlanItem
              :PlanInfo="PlanInfo"
              @updateCheckbox="updatePlanList"
              @updatePlanImportant="updatePlanImportant"
            />
          </el-col>
        </el-row>
        <div v-else>暂无数据</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts" name="Plan">
import type { Plan, setPlanInfo } from '@/types/plan'
import { nanoid } from 'nanoid'
import { ref, watch, reactive } from 'vue'
import PlanItem from './components/PlanItem.vue'
import { useUserStore } from '@/stores/modules/user'
import 'animate.css'
import { showMessage } from '@/composables/util'
import * as audioFile from '@/assets/audio/ping-82822.mp3'
import { setPlan } from '@/api/modules/user'
const newPlanInfo = reactive<setPlanInfo>({
  planDay: '',
  planName: ''
})

const UserStore = useUserStore()
let completedList = ref<Plan[]>([])
let unCompletedList = ref<Plan[]>([])
let activeNames = ref(['1'])
const audio = new Audio(audioFile.default)
watch(
  () => UserStore.userInfo.planList as Plan[],
  (newPlanList: Plan[]) => {
    if (newPlanList) {
      completedList.value = []
      unCompletedList.value = []
      newPlanList.forEach((i: Plan) => {
        i.isCompleted ? completedList.value.unshift(i) : unCompletedList.value.unshift(i)
      })
    }
  },
  { immediate: true, deep: true } // 使得 watch 创建时立即执行回调函数
)

function updatePlanList(id: string, checked: boolean) {
  UserStore.userInfo.planList?.forEach((element) => {
    if (element.id == id) {
      setPlan({
          ...element,
          isCompleted: checked,
          isImportant: element.isImportant, 
        }).catch((error)=>{
          showMessage(`${error}`,'warning');
        })
      element.isCompleted = checked
      if (checked) {
        audio.play()
        showMessage('提交成功', 'success')
      } else {
        showMessage('取消成功', 'warning')
      }
    }
  })
}
function updatePlanImportant(id: string) {
  UserStore.userInfo.planList?.forEach((element) => {
    if (element.id == id) {
      console.log(element);
      element.isImportant = !element.isImportant
      setPlan({
          ...element,
          isImportant: element.isImportant, 
          id: element.id,
        }).catch((error)=>{
          showMessage(`${error}`,'warning');
        })
    }
  })
}

function handleNewPlan(event: Event) {
  if (!newPlanInfo.planName) {
    showMessage('请先输入任务信息', 'warning')
  } else if (!newPlanInfo.planDay) {
    showMessage('请先选择日期', 'warning')
  } else {
    UserStore.userInfo.planList?.push({ ...newPlanInfo })
    setPlan({
      planDay: newPlanInfo.planDay,
      planName: newPlanInfo.planName
    } as setPlanInfo)
    newPlanInfo.planDay = ''
    newPlanInfo.planName = ''
  }
  if (event.target && 'checked' in event.target) {
    event.target.checked = false

    audio.play()
  }
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
  animation: slideFadeDown 250ms forwards;
}
</style>
