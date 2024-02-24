<template>
  <div class="card content-box">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="140px">
      <el-form-item label="Team name" prop="teamName">
        <el-input v-model="ruleForm.teamName" />
      </el-form-item>
      <el-form-item label="Team theme" prop="teamTheme">
        <el-input v-model="ruleForm.teamTheme" placeholder="学习" />
      </el-form-item>
      <el-form-item label="memberAddable" prop="memberAddable">
        <el-switch v-model="ruleForm.memberAddable" />
      </el-form-item>
      <el-form-item label="Team description" prop="desc">
        <el-input v-model="ruleForm.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"> Create </el-button>
        <el-button @click="resetForm(ruleFormRef)"> Reset </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="createGroup">
import { reactive, ref } from "vue";
import type { FormInstance, FormRules } from "element-plus";
import { ElMessage } from "element-plus";

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive({
  teamName: "",
  teamTheme: "",
  memberAddable: false,
  desc: ""
});

const rules = reactive<FormRules>({
  teamName: [
    { required: true, message: "Please input Team name", trigger: "blur" },
  ],
  teamTheme: [{ required: true,  trigger: "blur" }],
  desc: [{ required: true, message: "Please input team description", trigger: "blur" }]
});

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      ElMessage.success("提交的数据为 : " + JSON.stringify(ruleForm));
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
