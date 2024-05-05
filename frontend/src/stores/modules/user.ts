
import { defineStore } from "pinia";
import type { UserInfo } from "@/types/user";
import { getUserInfo } from "@/api/modules/login";
import { removeToken } from "@/composables/auth"
import piniaPersistConfig from "@/stores/helper/persist";


export const useUserStore = defineStore({

  id: "userStore",

  state: () => ({
    token: '' as string,
    userInfo: {} as UserInfo,

  }),

  actions:{

    setUserInfo(userInfo: UserInfo) {
      this.userInfo = userInfo;
    },

    async getUserInfo(){
      const res = await getUserInfo(); // 使用 await 替代 promise.then，使代码更简洁明了
      this.setUserInfo( res);
    },

    logout(){
      removeToken();
      this.userInfo = {} as UserInfo;
    }
    
    
  },

  persist: piniaPersistConfig("userStore")
});
