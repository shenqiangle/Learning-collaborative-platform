<template>
  <el-dropdown trigger="click" :teleported="false">
    <div class="more-button">
      <el-icon><More /></el-icon>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleRequestTeam">
          <el-icon><UserFilled /></el-icon>申请进入小组
        </el-dropdown-item>
        <el-dropdown-item @click="handleCheckTeamInfo">
          <el-icon><UserFilled /></el-icon>查看小组人员信息
        </el-dropdown-item>
        <el-dropdown-item @click="handleShowing">
          <el-icon><Delete /></el-icon>不再展示
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  
  <el-dialog v-model="dialogTableVisible" :title="teamInfo?.teamName" width="800">
    <el-table :data="tableData" :border="true" style="width: 100%">
    <el-table-column type="expand">
      <template #default="props">
        <div m="4">
          <div class="expand-info">
            <div>
              <p m="t-0 b-2">&nbsp;&nbsp; &nbsp;  专业: {{ props.row.major }}</p>
              <p m="t-0 b-2">&nbsp;&nbsp; &nbsp;  性别: {{ props.row.gender }}</p>
              <p m="t-0 b-2">&nbsp;&nbsp; &nbsp;  邮箱: {{ props.row.email }}</p>
              <p m="t-0 b-2">&nbsp;&nbsp; &nbsp;  电话: {{ props.row.phone }}</p>
              <p m="t-0 b-2">&nbsp;&nbsp; &nbsp;  个人简介: {{ props.row.personalDescription }}</p>
            </div>
            <img src="@/assets/images/avatar.gif" alt="memberAvatar">
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="大学" prop="university" />
    <el-table-column label="昵称" prop="nickName" />
  </el-table>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TeamShow } from '@/types/team'
import type { UserShow } from '@/types/user'
import { requestTeam } from '@/api/modules/home'
import { useUserStore } from '@/stores/modules/user';
import { showMessage } from '@/composables/util'
import { ElMessage } from 'element-plus';

const UserStore = useUserStore();
const emit = defineEmits(['removeTeam']);
const props = defineProps({
  teamInfo: {
    type: Object as () => TeamShow
  }
});

const dialogTableVisible = ref(false);

function handleRequestTeam(){
  if (checkTeams(UserStore.userInfo.joiningTeams) || checkTeams(UserStore.userInfo.leadTeams)) {
    return;
  }
  else{
    const id = props.teamInfo?.id as string;
    requestTeam(id).then(()=>{
      showMessage("申请成功",'success');
    }).catch(()=>{
      ElMessage.error("申请失败，请检查网络或刷新后重试")
    })
  }
    
}

const tableData = ref<UserShow[]>([]);
function handleCheckTeamInfo() {
  dialogTableVisible.value = true;
  props.teamInfo?.members.forEach((i: UserShow)=>{
    if (!tableData.value.includes(i)){
      tableData.value.push(i);
    }
  })
}

function handleShowing(){
  emit('removeTeam',props.teamInfo?.id);
}
function checkTeams(teams:any) {
  if(teams){
    for(let i of teams){
      if(i.id == props.teamInfo?.id){
        showMessage('您已经进入小组','warning');
        return true;
      }
    }
  }
  return false;
}


</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
