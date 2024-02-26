<template>
  <el-dropdown trigger="click">
    <div class="avatar">
      <img src="@/assets/images/avatar.gif" alt="avatar" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
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
  <InfoDrawer
    ref="infoRef"
    title="个人信息"
    destroyOnClose
    confirmText="保存修改并提交"
    @submit="onSubmit(ruleFormRef)"
  >
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="140px">
      <el-form-item label="nickName" prop="nickName">
        <el-input v-model="ruleForm.nickName" />
      </el-form-item>
      <el-form-item label="major" prop="major">
        <el-input v-model="ruleForm.major" />
      </el-form-item>
      <el-form-item label="gender" prop="gender">
        <el-input v-model="ruleForm.gender" />
      </el-form-item>
      <el-form-item label="university" prop="university">
        <el-input v-model="ruleForm.university" />
      </el-form-item>
      <el-form-item label="email" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>
      <el-form-item label="phone" prop="phone">
        <el-input v-model="ruleForm.phone" type="textarea" />
      </el-form-item>
      <el-form-item label="Description" prop="personalDescription">
        <el-input v-model="ruleForm.personalDescription" type="textarea" />
      </el-form-item>
    </el-form>
  </InfoDrawer>
  <!-- passwordDialog -->
  <PasswordDialog ref="passwordRef"></PasswordDialog>
</template>

<script setup lang="ts" name="Avatar">
import InfoDrawer from './InfoDrawer.vue'
import PasswordDialog from './PasswordDialog.vue'
import { useLogout } from '@/composables/UseManager'
import { reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import type { UserShow } from '@/types/user'
import { useUserStore } from '@/stores/modules/user'

const ruleFormRef = ref<FormInstance>()
const { handleLogout } = useLogout()

// 打开修改密码和个人信息弹窗
const infoRef = ref<InstanceType<typeof InfoDrawer> | null>(null)
const passwordRef = ref<InstanceType<typeof PasswordDialog> | null>(null)
const openDialog = (ref: string) => {
  if (ref == 'infoRef') infoRef.value?.openDrawer()
  if (ref == 'passwordRef') passwordRef.value?.openDialog()
}
const UserStore = useUserStore()
const ruleForm = reactive<UserShow>({
  avatar: UserStore.userInfo.avatar,
  email: UserStore.userInfo.email,
  gender: UserStore.userInfo.gender,
  major: UserStore.userInfo.major,
  nickName: UserStore.userInfo.nickName,
  personalDescription: UserStore.userInfo.personalDescription,
  phone: UserStore.userInfo.phone,
  university: UserStore.userInfo.university,
  userName: UserStore.userInfo.userName
})

const rules = reactive<FormRules>({
  nickName: [{ required: true, message: 'Please input nickName', trigger: 'blur' }]
})

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      infoRef.value?.showLoading()

      infoRef.value?.closeDrawer()

      infoRef.value?.hideLoading()

      ElMessage.success('提交的数据为 : ' + JSON.stringify(ruleForm))
    } else {
      console.log('error submit!', fields)
    }
    resetForm(formEl);
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

watch(UserStore.userInfo, (newUserInfo: UserShow) => {
  Object.assign(ruleForm, {
    avatar: newUserInfo.avatar,
    email: newUserInfo.email,
    gender: newUserInfo.gender,
    major: newUserInfo.major,
    nickName: newUserInfo.nickName,
    personalDescription: newUserInfo.personalDescription,
    phone: newUserInfo.phone,
    university: newUserInfo.university,
    userName: newUserInfo.userName
  })
})
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
