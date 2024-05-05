<template>
  <div class="card content-box">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="140px">
      <el-form-item label="小组名称" prop="teamName">
        <el-input v-model="ruleForm.teamName" />
      </el-form-item>
      <el-form-item label="小组主题" prop="theme">
        <el-input v-model="ruleForm.theme" placeholder="学习" />
      </el-form-item>
      <el-form-item label="是否允许加入" prop="memberAddable">
        <el-switch v-model="ruleForm.memberAddable" />
      </el-form-item>
      <el-form-item label="小组描述" prop="description">
        <el-input v-model="ruleForm.description" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"> 创建 </el-button>
        <el-button @click="resetForm(ruleFormRef)"> 重置信息 </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="createGroup">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { createTeam } from "@/api/modules/team"
import type { createTeamInfo } from "@/types/team";
import { ElMessage } from "element-plus";

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<createTeamInfo>({
  teamName: "",
  theme: "",
  memberAddable: false,
  description: "",
  teamAvatar: null
});

const rules = reactive<FormRules>({
  teamName: [
    { required: true, message: "Please input Team name", trigger: "blur" },
  ],
  theme: [{ required: true,  trigger: "blur" }],
  description: [{ required: true, message: "Please input team description", trigger: "blur" }]
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      // ElMessage.success("提交的数据为 : " + JSON.stringify(ruleForm));
      await createTeam(ruleForm).then(()=>{
        ElMessage.success("创建成功！");
      })
      .catch(()=>{ElMessage.error("创建失败，请检查网络！");})
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
