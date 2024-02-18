<template>
<el-dropdown trigger="click">
    <div class="avatar">
      <img src="@/assets/images/avatar.gif" alt="avatar" />
    </div>
    <template #dropdown>
      <el-dropdown-menu >
        <el-dropdown-item @click="openDialog('infoRef')">
          <el-icon><User /></el-icon>个人信息
        </el-dropdown-item>
        <el-dropdown-item @click="openDialog('passwordRef')">
          <el-icon><Edit /></el-icon>修改密码
        </el-dropdown-item>
        <el-dropdown-item divided @click="handleLogout">
          <el-icon><SwitchButton /></el-icon>退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- infoDialog -->
  <InfoDrawer ref="infoRef" title="个人信息" destroyOnClose confirmText="保存修改并提交" @submit="onSubmit">
    <div style="background-color: red;height: 1000px;">1</div>
    <div style="background-color: red;height: 1000px;">2</div>
    <div style="background-color: red;height: 1000px;">3</div>
  </InfoDrawer>
  <!-- passwordDialog -->
  <PasswordDialog ref="passwordRef"></PasswordDialog>
</template>

<script setup lang="ts" name="Avatar">
import { ref } from 'vue';
import InfoDrawer from "./InfoDrawer.vue";
import PasswordDialog from "./PasswordDialog.vue";
import { useLogout } from "@/composables/UseManager"

const { handleLogout } = useLogout();

// 打开修改密码和个人信息弹窗
const infoRef = ref<InstanceType<typeof InfoDrawer> | null>(null);
const passwordRef = ref<InstanceType<typeof PasswordDialog> | null>(null);
const openDialog = (ref: string) => {
  if (ref == "infoRef") infoRef.value?.openDrawer();
  if (ref == "passwordRef") passwordRef.value?.openDialog();
};


function onSubmit(){

  infoRef.value?.showLoading();

  infoRef.value?.closeDrawer();

  infoRef.value?.hideLoading();
  
}
</script>


<style scoped lang="scss">
.avatar {
  width: 40px;
  height: 40px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>