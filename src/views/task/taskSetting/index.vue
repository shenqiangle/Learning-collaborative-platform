<template>
  <div>
      <Header :leadTeams="UserStore.userInfo.leadTeams" @search="handleSearch"/>

  </div>
</template>

<script setup lang="ts" name="taskSetting">
import Header from './components/Header.vue'
import { useUserStore } from '@/stores/modules/user';


const UserStore = useUserStore();
function handleSearch(searchValue:string){
  console.log(searchValue)
}
</script>

