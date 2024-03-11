<template>
  <div class="home card">
    <el-row justify="center">
      <el-col :span="24" :offset="0">
        <div class="team-header">
          <img class="team-header-img" src="@/assets/images/logo.svg" alt="logo"  />
          <span class="team-header-text" >队伍列表</span>
        </div>
      </el-col>
    </el-row>  
    <el-row justify="center" v-if="IndexTeamList.length" >
      <TeamInfo v-for="team in IndexTeamList" :key="team.id" :team="team" @removeTeam="removeIndexTeam"/>
    </el-row>
  </div>
    
</template>
  
  <script setup lang="ts" name="home">

  import { getIndexTeamInfo } from '@/api/modules/home'
  import type { TeamShow } from '@/types/team'
  import { ref, type Ref } from 'vue'
  import TeamInfo from './components/TeamInfo.vue'
  let IndexTeamList: Ref<TeamShow[]> = ref([])

  getIndexTeamInfo().then(res => {
      IndexTeamList.value = res as TeamShow[]
  })

  function removeIndexTeam(id: String): void {
   const index = IndexTeamList.value.findIndex(item => item.id === id);
   if (index !== -1) {
      IndexTeamList.value.splice(index, 1);
   }
}

  
  </script>

<style lang="scss" scoped>

  @import "./index.scss";
</style>