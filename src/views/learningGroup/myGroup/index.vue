<!-- eslint-disable -->
<template>
  <div class="home card">
    <el-row justify="center">
      <el-col :span="24" :offset="0">
        <div class="team-header">
          <img class="team-header-img" src="@/assets/images/logo.svg" alt="logo" />
          <span class="team-header-text">队伍列表</span>
        </div>
      </el-col>
    </el-row>

    <div class="demo-collapse">
      <el-collapse v-model="activeNames">
        <el-collapse-item name="1">
          <template #title>
            <div class="el-collapse-item-title">我创建的队伍</div>
          </template>
          <el-row justify="center" v-if="leadTeamList.length">
            <LeadGroups v-for="team in leadTeamList" :key="team.id" :team="team" />
          </el-row>
          <div v-else>暂无数据</div>
        </el-collapse-item>
        <el-collapse-item name="2">
          <template #title>
            <div class="el-collapse-item-title">我加入的队伍</div>
          </template>
          <el-row justify="center" v-if="joinedTeamList.length">
            <JoinedGroups v-for="team in joinedTeamList" :key="team.id" :team="team" />
          </el-row>
          <div v-else>暂无数据</div>
        </el-collapse-item>
        <el-collapse-item name="3">
          <template #title>
            <div class="el-collapse-item-title">申请中的队伍</div>
          </template>
          <el-row justify="center" v-if="requestTeamList.length">
            <RequestGroups v-for="team in requestTeamList" :key="team.id" :team="team" />
          </el-row>
          <div v-else>暂无数据</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script setup lang="ts" name="myGroup">
import { ref, type Ref } from 'vue'
import LeadGroups from './components/leadGroups.vue'
import JoinedGroups from './components/joinedGroups.vue'
import RequestGroups from './components/requestGroups.vue'
import type { TeamShow, TeamInfo } from '@/types/team'
import { useUserStore } from '@/stores/modules/user'

const UserStore = useUserStore()

let leadTeamList: Ref<TeamInfo[]> = ref([])
let joinedTeamList: Ref<TeamShow[]> = ref([])
let requestTeamList: Ref<TeamShow[]> = ref([])

if (UserStore.userInfo.leadTeams) {
  leadTeamList.value = UserStore.userInfo.leadTeams
}
if (UserStore.userInfo.addedTeams) {
  joinedTeamList.value = UserStore.userInfo.addedTeams
}
if (UserStore.userInfo.requestTeams) {
  requestTeamList.value = UserStore.userInfo.requestTeams
}



const activeNames = ref(['1'])
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
