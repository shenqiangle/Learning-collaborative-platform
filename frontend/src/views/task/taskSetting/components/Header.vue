<template>
  <div class="card">
    <span>队伍名称：</span>
    <el-select v-model="searchTeam" placeholder="请选择队伍"  class="header-select" clearable>
      <el-option
        v-for="item in leadTeams"
        :key="item.id"
        :value="item.teamName"
      />
    </el-select>
    <el-button class="header-button search-button" @click="search()">搜索</el-button>
    <el-button class="header-button" @click="resetSelect">重置</el-button>
  </div>
</template>

<script setup lang="ts" name="Header">
import { ref } from 'vue';
const emits = defineEmits(['search'])
let searchTeam = ref()

function resetSelect() {
    searchTeam.value = ''
}
const search = ()=>{emits('search',searchTeam.value)}

const props = defineProps(['leadTeams'])

</script>

<style scoped lang="scss">
    @import "../index.scss";

    .card{
        span {
            padding:0 20px;
            font-size:16px;
        }
        .header-select {
            width: 240px;
        }
        .header-button {
            margin-left: 20px;
        }
        .header-button:hover {
            background-color: #b0dfda
        }
        .search-button {
            background-color: #49827c;
            --el-button-text-color: #ffffff
        }
        :deep(.el-button:focus, .el-button:hover){
            --el-button-hover-text-color: #ffffff;
            --el-button-hover-link-text-color: #80cbc4;
            --el-button-hover-bg-color: #4db6ac;
            --el-button-hover-border-color: #4db6ac;
        }
        :deep(.el-button--primary){
            --el-button-text-color: #ffffff
        }
        
    }
    
</style>
