<template>
  <div>
    <!-- <Header :leadTeams="UserStore.userInfo.leadTeams" @search="handleSearch" /> -->
    <div class="card content-box">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="140px">
        <el-form-item label="Team Name" prop="teamName">
          <el-select
            v-model="ruleForm.teamName"
            placeholder="请选择队伍"
            class="header-select"
            clearable
          >
            <el-option
              v-for="item in UserStore.userInfo.leadTeams"
              :key="item.id"
              :value="item.teamName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Team Members" prop="teamMembers">
          <el-select
            v-model="ruleForm.teamMembers"
            multiple
            collapse-tags
            collapse-tags-tooltip
            placeholder="请选择成员"
          >
            <el-option
              v-for="item in leadTeams.members"
              :key="item.userName"
              :label="item.nickName"
              :value="item.nickName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Task name" prop="taskName">
          <el-input v-model="ruleForm.taskName" />
        </el-form-item>
        <el-form-item label="Task description" prop="desc">
          <el-input v-model="ruleForm.desc" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"> Create </el-button>
          <el-button @click="resetForm(ruleFormRef)"> Reset </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts" name="taskSetting">
// import Header from './components/Header.vue'
import { useUserStore } from '@/stores/modules/user'
import { reactive, ref, watch } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { TeamShow } from '@/types/team'
import { ElMessage } from 'element-plus'

const UserStore = useUserStore()
let leadTeams = reactive<TeamShow>({
    description: null,
    id: '',
    leader: UserStore.userInfo,
    memberAddable: false,
    members: [],
    taskList: null,
    teamAvatar: null,
    teamName: '',
    teamResource: null,
    theme: ''
})

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  taskName: '',
  teamName: '',
  desc: '',
  teamMembers:{}
})

  watch(ruleForm,()=>{
    if(ruleForm.teamName){
      UserStore.userInfo.leadTeams?.forEach(element => {
        if(element.teamName == ruleForm.teamName){
          leadTeams.members = element.members
          return 
        }
      });
    }
  },{deep:true})
const rules = reactive<FormRules>({
  teamName: [{ required: true, message: 'Please select Team name', trigger: 'blur' }],
  taskName: [{ required: true, trigger: 'blur' }],
  desc: [{ required: true, message: 'Please input team description', trigger: 'blur' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      ElMessage.success('提交的数据为 : ' + JSON.stringify(ruleForm))
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
