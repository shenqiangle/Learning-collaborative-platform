import { changePassword, logout } from "@/api/modules/login";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { reactive, ref } from "vue";
import { showMessage, showModal } from "./util";
import { LOGIN_URL } from "@/config";
import type { changePasswordForm } from "@/types/user";
import { useRouter } from 'vue-router'
import { useUserStore } from "@/stores/modules/user";


export function rePassword(){
    const router = useRouter();
    const UserStore = useUserStore();
    const ruleFormRef = ref<FormInstance>();

    const validatePass = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else {
        callback()
      }
    }
  
    const validatePass2 = (rule: any, value: any, callback: any) => {
      if (value === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== ruleForm.newPassword) {
        callback(new Error("两次新密码输入不一致！"))
      } else {
        callback()
      }
    }
  
    const ruleForm = reactive({
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    })
  
    const rules = reactive<FormRules<typeof ruleForm>>({
      newPassword: [{ required: true, validator: validatePass, trigger: 'blur' }],
      confirmNewPassword: [{ required: true, validator: validatePass2, trigger: 'blur' }],
      oldPassword: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
    })
  
    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          changePassword(ruleForm as changePasswordForm)
          .then(()=>{
            showMessage('修改密码成功，请重新登录','success');
            UserStore.logout();
            router.push(LOGIN_URL);
          }).catch(()=>{
            ElMessage.error("修改失败")
          })
        } 
      })
    }
  
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }

    return {
        ruleFormRef,
        ruleForm,
        rules,
        submitForm,
        resetForm

    }
}

export function useLogout(){
    const router = useRouter();
    const UserStore = useUserStore();
    function handleLogout(){
        showModal("是否退出登录",'warning')
        .then(() => {
            logout().then(()=>{
                //移除token，清除用户状态
                UserStore.logout();
                //跳转回登录页
                router.push(LOGIN_URL);
                //提示退出登录成功
                ElMessage({
                type: 'success',
                message: '退出登录成功',
              })
            })
            }).catch(()=>{
                ElMessage({
                type: 'info',
                message: '操作取消',
              })
            }) 
    }
    return {handleLogout}
}