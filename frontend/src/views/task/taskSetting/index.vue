<template>
  <div>
    <!-- <Header :leadTeams="UserStore.userInfo.leadTeams" @search="handleSearch" /> -->
    <div class="card content-box">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="140px">
        <el-form-item label="选择小组" prop="teamId">
          <el-select
            v-model="ruleForm.teamId"
            placeholder="请选择小组"
            class="header-select"
            clearable
          >
            <el-option
              v-for="item in UserStore.userInfo.leadTeams"
              :key="item.id"
              :label="item.teamName"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="选择组内成员" prop="performers">
          <el-select
            v-model="ruleForm.performers"
            class="header-select"
            clearable
            placeholder="请选择成员"
          >
            <el-option
              v-for="item in leadTeams.members"
              :key="item.userName"
              :label="item.nickName"
              :value="item.userName"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="任务名称" prop="taskName">
          <el-input v-model="ruleForm.taskName" />
        </el-form-item>
        <el-form-item label="任务描述" prop="taskDescription">
          <el-input v-model="ruleForm.taskDescription" type="textarea" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(ruleFormRef)"> 确认 </el-button>
          <el-button @click="resetForm(ruleFormRef)"> 重置 </el-button>
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
import { setTask } from '@/api/modules/team'
import { showMessage } from '@/composables/util'

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
  taskDescription: '',
  performers:'',
  teamId:'',
})

  watch(ruleForm,()=>{
    if(ruleForm.teamId){
      UserStore.userInfo.leadTeams?.forEach(element => {
        if(element.id == ruleForm.teamId){
          leadTeams.members = element.members
          return 
        }
      });
    }
  },{deep:true})
const rules = reactive<FormRules>({
  teamId: [{ required: true, message: 'Please select Team name', trigger: 'blur' }],
  performers:[{ required: true, message: 'Please select performer', trigger: 'blur' }],
  taskName: [{ required: true, trigger: 'blur' }],
  taskDescription: [{ required: true, message: 'Please input team description', trigger: 'blur' }]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      setTask(ruleForm).then(()=>{
        showMessage("设置成功","success");
      }).catch((error)=>{
        showMessage(`设置失败\r\n${error}`,'warning')
      })
      resetForm(formEl);

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
