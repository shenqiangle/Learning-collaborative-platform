<template>
  <div class="card">
    <label class="container">
      <div class="taskInfo">
        <div :class="{ 'completed': PlanInfo.isCompleted }" ref="taskNameRef">
          任务名称:{{ PlanInfo.planName }}
        </div>
        <div>
          <el-icon><Calendar /></el-icon>
          <span class="taskDate">{{ PlanInfo.planDay }}</span>
        </div>
      </div>
      <input
        type="checkbox"
        :checked="PlanInfo.isCompleted"
        @change="onCheckboxChange($event)"
      />
      <span class="checkmark"></span>
    </label>
    <div class="container-right" @click="changeImportant($event)">
      <div>
        <span class="importanceButton color-theme"
          ><svg
            :class="{ important: PlanInfo.isImportant, 'not-important': !PlanInfo.isImportant }"
            fill="currentColor"
            aria-hidden="true"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path
              d="M9.1 2.9a1 1 0 011.8 0l1.93 3.91 4.31.63a1 1 0 01.56 1.7l-3.12 3.05.73 4.3a1 1 0 01-1.45 1.05L10 15.51l-3.86 2.03a1 1 0 01-1.45-1.05l.74-4.3L2.3 9.14a1 1 0 01.56-1.7l4.31-.63L9.1 2.9z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
        <div
          hidden=""
          id="tooltip14"
          style="
            position: absolute;
            width: 1px;
            height: 1px;
            margin: -1px;
            padding: 0px;
            border: 0px;
            overflow: hidden;
            white-space: nowrap;
          "
        >
          删除重要性。
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts" name="PlanItem">

import { ref } from 'vue'
const props = defineProps(['PlanInfo'])
const emit = defineEmits(['updateCheckbox', 'updatePlanImportant'])

const taskNameRef = ref()

function onCheckboxChange(event: Event) {
  if (event.target && 'checked' in event.target) {
    emit('updateCheckbox', props.PlanInfo.id, event.target.checked)
  }
}
function changeImportant(event: Event) {
  if (event.target) {
    emit('updatePlanImportant', props.PlanInfo.id)
  }
}
</script>

<style lang="scss" scoped>
@import '../index.scss';
</style>
