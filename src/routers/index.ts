import { createRouter, createWebHistory } from 'vue-router'
import { HOME_URL,LOGIN_URL } from "@/config";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: HOME_URL,
    },
    {
      path: LOGIN_URL,
      name: LOGIN_URL,
      component: () => import ('@/views/login/index.vue'),
      meta: {
        title:"登录页"
      }
    },
    {
      path: '/layout',
      name: 'layout',
      component: () => import ('@/layouts/index.vue'),
      redirect: HOME_URL,
      children:[]
    }
    
  ]
})

import { getToken } from "@/composables/auth"
import { toast } from '@/composables/util';
import { useUserStore } from "@/stores/modules/user"
import { useAuthStore } from "@/stores/modules/auth"
import NProgress from '@/config/nprogress';
import { initDynamicRouter } from './dynamicRoutes';



//全局前置守卫

let hasGetUserInfo = false;

router.beforeEach( async(to, from, next)=>{
  
  const authStore = useAuthStore();

  const userStore = useUserStore();
  
  
  const token = getToken();

  //显示loading
  NProgress.start();
  
  //没有登录，强制转换为登录页
  if(!token && to.path != LOGIN_URL){
    // toast('请先登录','error');

    return next({ path:LOGIN_URL });
  }

  //防止重复登录
  if(token && to.path == LOGIN_URL){

    toast('请勿重复登录','warning');

    return next({ path:from.path ? from.path : '/'})
  }

  //如果用户登录，自动获取用户信息，并存储在userStore当中
  if(token && !hasGetUserInfo){
    hasGetUserInfo = true;
    console.log("getInfo");
    await userStore.getUserInfo()
  }

  //设置页面标题
  // eslint-disable-next-line prefer-const
  let title = to.meta.title  + "-学习协同平台";
  if (typeof title === 'string') {
    document.title = title;
  }


  //如果没有菜单列表，就重新请求菜单列表并添加动态路由
  if (!authStore.authMenuList.length) {
    await initDynamicRouter();
    return next({ ...to, replace: true });
  }

  next();
})


/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  NProgress.done();
});

export default router 
