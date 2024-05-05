<template>
  <div class="card">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="140px">
      <el-form-item label="选择小组" prop="teamId">
        <el-select v-model="ruleForm.teamId" placeholder="请选择小组" class="select-team" clearable>
          <el-option v-for="item in items" :key="item.id" :label="item.teamName" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="资源描述" prop="fileDescription">
          <el-input v-model="ruleForm.fileDescription" type="textarea" />
        </el-form-item>
    </el-form>
    <el-upload
      action
      :before-upload="upload"
      :http-request="http"
      :on-success="handleUploadSuccess"
      name="file"
    >
      <el-button>点击上传文件</el-button>
    </el-upload>
  </div>
</template>

<script setup lang="ts" name="uploadResource">
import type { FormRules } from 'element-plus'
import { reactive } from 'vue'
import { useUserStore } from '@/stores/modules/user'
import type { TeamShow } from '@/types/team'
import { uploadResource } from '@/api/modules/team'
const UserStore = useUserStore()

let items: TeamShow[] = [] // 确保 items 变量已经被初始化为一个数组

// 将用户领导的团队添加到 items 数组中

UserStore.userInfo.leadTeams?.forEach((team) => {
  items.push({
    id: team.id,
    teamName: team.teamName
  }as TeamShow)
})

// 将用户加入的团队添加到 items 数组中
UserStore.userInfo.joiningTeams?.forEach((team) => {
  items.push(team)
})

const ruleForm = reactive({
  teamId: '',
  fileDescription:''
})


function http(){
  return;
}
function upload(file:File) {
  uploadResource({ file: file, teamId: ruleForm.teamId, fileDesc: ruleForm.fileDescription })
  return true; // 阻止自动上传
}
const rules = reactive<FormRules>({
  teamId: [{ required: true, message: 'Please select Team name', trigger: 'blur' }],
  fileDescription: [{ required: true, message: 'Please select Team name', trigger: 'blur' }],
})

const handleUploadSuccess = (response: any) => {
  // 处理上传成功后的逻辑
  console.log(response)
}
</script>
