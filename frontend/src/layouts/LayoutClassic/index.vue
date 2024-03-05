
<!-- 经典布局 -->
<template>
  <el-container class="layout">
    <el-header>
      <div class="header-lf mask-image">
        <div class="logo flx-center">
          <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" />
          <span class="logo-text">Learning </span>
        </div>
        <ToolBarLeft />
      </div>
      <div class="header-ri">
        <ToolBarRight />
      </div>
    </el-header>
    <el-container class="classic-content">
      <el-aside>
        <div class="aside-box" :style="{ width: isCollapse ? '65.8px' : '210px' }">
          <el-scrollbar>
            <el-menu
              :router="false"
              :default-active="activeMenu"
              :collapse="isCollapse"
              :unique-opened="true"
              :collapse-transition="false"
            >
              <Menu :menu-list="menuList.data" />
            </el-menu>
          </el-scrollbar>
        </div>
      </el-aside>
      <el-container class="classic-main">
        <Main/>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts" name="layoutClassic">
import ToolBarLeft from '../components/header/ToolBarLeft.vue';
import ToolBarRight from '../components/header/ToolBarRight.vue';
import Menu from '../components/menu/index.vue';
import Main from '../components/main/index.vue';
// import TagList from '../components/Taglist/index.vue';
import { logout } from '@/api/modules/login';
import { showModal } from '@/composables/util';
import { LOGIN_URL } from '@/config';
import { useUserStore } from '@/stores/modules/user'
import { useRouter,useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useGlobalStore } from "@/stores/modules/global";
import { computed } from 'vue';
const route = useRoute();
const globalStore = useGlobalStore();
const UserStore = useUserStore();
const router = useRouter();
const isCollapse = computed(() => globalStore.isCollapse);
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
import menuList from '@/assets/json/authMenuList.json'
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string);

</script>

<style scoped lang="scss">
@import "./index.scss";


// .el-aside {
//   transition: all 0.2s;
// }
</style>
