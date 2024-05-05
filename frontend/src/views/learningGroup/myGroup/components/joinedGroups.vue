<template>
    <el-col :span="24" :offset="0" class="team-main" v-if="team">
      <!-- <img :src="(team.teamAvatar as string)" alt="teamLogo"> -->
      <img src="@/assets/images/duck.jpg">
      <div class="team-main-right">
        <h3>{{ team.teamName }}</h3>
        <h3>队长：{{ team.leader.nickName }}</h3>
        <h4>主题：{{ team.theme }}</h4>
        <div class="team-status">
          <span v-bind:class="{ 'status-ing': team.memberAddable }">
            {{ team.memberAddable ? '【可加入】' : '【不可加入】' }}
          </span>
        </div>
        <div class="act-info">{{ team.description }}</div>
      </div> 
      <MoreButton :teamInfo = "team" authority="added"/>
      <TeamProgress :teamTaskList="team.taskList"  />
    </el-col>    
</template>

<script setup lang="ts" name="JoinedGroups">
import MoreButton from './MoreButton.vue'
import TeamProgress from './TeamProgress.vue'
// const emits = defineEmits(['removeTeam'])
const props = defineProps(['team'])
// function removeIndexTeam(id: String){
//   emits('removeTeam',id);
// }



</script>

<style lang="scss" scoped>
  @import "../index.scss";
</style>