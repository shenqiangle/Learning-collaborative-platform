<template>
  <div class="dataVisualize-box">
    <div class="card top-box">
      <div class="top-title">数据可视化</div>
      <el-tabs v-model="tabActive" class="demo-tabs">
        <el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
      </el-tabs>
      <div class="top-content">
        <el-row :gutter="40">
          <el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
            <div class="item-left sle">
              <span class="left-title">任务总数</span>
              <div class="img-box">
                <img src="./images/book-sum.png" alt="" />
              </div>
              <span class="left-number"><CountTo :value="taskNumber"/></span>
            </div>
          </el-col>
          <el-col class="mb40" :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
            <div class="item-center">
              <div class="gitee-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/add_person.png" alt="" />
                </div>
                <span class="item-value"><CountTo :value="taskCompletedNumber"/></span>
                <span class="traffic-name sle">已完成数量</span>
              </div>
              <div class="gitHub-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/add_team.png" alt="" />
                </div>
                <span class="item-value"><CountTo :value="taskUnCompletedNumber"/></span>
                <span class="traffic-name sle">未完成数量</span>
              </div>
              <div class="today-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/today.png" alt="" />
                </div>
                <span class="item-value"><CountTo :value="taskTodayNumber"/></span>
                <span class="traffic-name sle">今日完成</span>
              </div>
              <div class="yesterday-traffic traffic-box">
                <div class="traffic-img">
                  <img src="./images/book_sum.png" alt="" />
                </div>
                <span class="item-value"><CountTo :value="taskYesterdayNumber"/></span>
                <span class="traffic-name sle">昨日完成</span>
              </div>
            </div>
          </el-col>
          <el-col class="mb40" :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
            <div class="item-right">
              <div class="echarts-title">已完成 / 未完成 任务占比</div>
              <div class="book-echarts">
                <Pie ref="pieRef" :taskCompletedNumber="taskCompletedNumber" :taskUnCompletedNumber="taskUnCompletedNumber"/>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- <div class="card bottom-box">
      <div class="bottom-title">数据来源</div>
      <div class="bottom-tabs">
        <el-tabs v-model="tabActive" class="demo-tabs">
          <el-tab-pane v-for="item in tab" :key="item.name" :label="item.label" :name="item.name"></el-tab-pane>
        </el-tabs>
      </div>
      <div class="curve-echarts">
        <Curve ref="curveRef" />
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts" name="dataVisualize">
import { ref, computed } from "vue";
import Pie from "./components/pie.vue";
import { useUserStore } from "@/stores/modules/user";
import { getDate } from '@/composables/util'
import CountTo from '@/components/CountTo/index.vue'


const date = getDate()
const UserStore = useUserStore();
const taskNumber = computed(() => {
  return UserStore.userInfo.taskList?.length || 0;
});

const taskCompletedNumber = computed(() => {
  return countTasks((task) => task.isCompleted);
});

const taskUnCompletedNumber = computed(() => {
  return taskNumber.value - taskCompletedNumber.value;
});

const taskTodayNumber = computed(() => {
  const today = `${date.year}-${date.month}-${date.day}`;
  return countTasks((task) => task.completeDay === today && task.isCompleted);
});

const taskYesterdayNumber = computed(() => {
  const yesterday = `${date.year}-${date.month}-${(date.day)-1}`;
  return countTasks((task) => task.completeDay === yesterday && task.isCompleted);
});

// 辅助函数，用于统计符合条件的任务数量
function countTasks(condition: (task: any) => boolean) {
  let totalNumber = 0;
  UserStore.userInfo.taskList?.forEach((task) => {
    if (condition(task)) {
      totalNumber++;
    }
  });
  return totalNumber;
}

const tabActive = ref(1);

const tab = [
  { label: "未来7日", name: 1 },
  { label: "近七日", name: 2 },
  { label: "近一月", name: 3 },
  { label: "近三月", name: 4 },
  { label: "近半年", name: 5 },
  { label: "近一年", name: 6 }
];
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
