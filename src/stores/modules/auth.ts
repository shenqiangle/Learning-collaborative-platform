import { defineStore } from "pinia";
import type { AuthState } from "@/stores/interface";
import { getAuthMenuListApi } from "@/api/modules/login";
import { getFlatMenuList } from '@/composables/util'
export const useAuthStore = defineStore({
    
  id: "authStore",

  state: (): AuthState => ({
    // 按钮权限列表
    authButtonList: {},
    // 菜单权限列表
    authMenuList: [],
    // 当前页面的 router name，用来做按钮权限筛选
    routeName: ""
  }),
  getters: {
    // 菜单权限列表 ==> 这里的菜单没有经过任何处理
    authMenuListGet: state => state.authMenuList,
    // 菜单权限列表 ==> 扁平化之后的一维数组菜单，主要用来添加动态路由
    flatMenuListGet: state => getFlatMenuList(state.authMenuList),
  },
  actions: {
 
    // Get AuthMenuList
    async getAuthMenuList() {
        const { data } = await getAuthMenuListApi();
        this.authMenuList = data;
    },
    // Set RouteName
    async setRouteName(name: string) {
      this.routeName = name;
    }
  }
});
