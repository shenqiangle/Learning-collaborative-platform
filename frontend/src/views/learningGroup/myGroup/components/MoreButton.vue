<template>
  <el-dropdown trigger="click" :teleported="false">
    <div class="more-button">
      <el-button>查看队伍</el-button>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleTeamConfigure" v-if="authority == 'lead'">
          <el-icon><UserFilled /></el-icon>队伍配置
        </el-dropdown-item>
        <el-dropdown-item @click="handleCheckTeamInfo" >
          <el-icon><UserFilled /></el-icon>查看队伍人员信息
        </el-dropdown-item>
        <el-dropdown-item @click="handleCheckTeamResource" v-if="authority != 'request'">
          <el-icon><Download /></el-icon>查看队伍资源文件
        </el-dropdown-item>
        <el-dropdown-item @click="handleDeleteTeam" v-if="authority == 'lead'">
          <el-icon><Delete /></el-icon>解散队伍
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  
  <el-dialog v-model="teamInfoDialog" :title="teamInfo?.teamName" width="800">
    <el-table :data="tableData" :border="true" style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <div m="4">
          <div class="expand-info">
            <div>
              <p m="t-0 b-2">major: {{ props.row.major }}</p>
              <p m="t-0 b-2">gender: {{ props.row.gender }}</p>
              <p m="t-0 b-2">email: {{ props.row.email }}</p>
              <p m="t-0 b-2">phone: {{ props.row.phone }}</p>
              <p m="t-0 b-2">personalDescription: {{ props.row.personalDescription }}</p>
            </div>
            <img :src="props.row.avatar" alt="memberAvatar">
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="大学" prop="university" />
    <el-table-column label="昵称" prop="nickName" />
  </el-table>
  </el-dialog>

  <el-dialog
    v-model="teamConfigureDrawer">
  <span>队伍配置</span>
  <template #footer>
    <ElButton>保存</ElButton>
    <ElButton>取消</ElButton>
  </template>
  </el-dialog>

  <el-dialog
    v-model="teamDeleteDialog"
    width="500"
  >
    <span>确定解散队伍吗？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="teamDeleteDialog = false">Cancel</el-button>
        <el-button type="primary" @click="teamDeleteDialog = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>

  
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TeamShow, UserShow } from '@/types/team'
import { useUserStore } from '@/stores/modules/user';

const props = defineProps({
  teamInfo: {
    type: Object as () => TeamShow
  },
  authority: {
    type: String as () => 'added' | 'lead' | 'request',
    required: true,
  }
});

let teamInfoDialog = ref(false);
let teamConfigureDrawer = ref(false);
let teamDeleteDialog = ref(false);

function handleTeamConfigure(){
  teamConfigureDrawer.value = true;
    
}

const tableData = ref<UserShow[]>([]);
function handleCheckTeamInfo() {
  teamInfoDialog.value = true;
  if(!tableData.value.length){
    props.teamInfo?.members.forEach((i: UserShow)=>{
    tableData.value.push(i);
  })
  }
 
}

function handleDeleteTeam(){
  teamDeleteDialog.value = true;
}

function handleCheckTeamResource(){
  
}


</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
