<template>
    <el-dialog v-model="dialogVisible" title="修改密码" width="500px" draggable>
        <el-form
            class="changePasswordForm"
            ref="ruleFormRef"
            :model="ruleForm"
            :rules="rules"
            label-width="120px"
        >
        <el-form-item label="旧密码" prop="oldPassword">
            <el-input v-model="ruleForm.oldPassword" type="password" show-password autocomplete="off"/>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="ruleForm.newPassword" type="password" autocomplete="off" show-password/>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmNewPassword">
            <el-input
                v-model="ruleForm.confirmNewPassword"
                type="password"
                autocomplete="off"
                show-password
            />
        </el-form-item>
        
        <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
  </el-form>
    </el-dialog>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { rePassword } from "@/composables/UseManager"
  const {
    ruleFormRef,
    ruleForm,
    rules,
    submitForm,
    resetForm
  } = rePassword();
  const dialogVisible = ref(false);

  const openDialog = () => {
    dialogVisible.value = true;
  };

  const closeDialog = () => {
    dialogVisible.value = false;
  };

  defineExpose({ openDialog,closeDialog });
  </script>

 <style lang="scss" scoped>
    .changePasswordForm {
        margin-top: 5%;
        
    }
 </style>
  