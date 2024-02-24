
import { useUserStore } from '@/stores/modules/user';


//获取token
export function getToken(){
    const UserStore = useUserStore();
    return UserStore.userInfo.token;
}
// 设置token
export function setToken(token:string){ 
    const UserStore = useUserStore();
    UserStore.userInfo.token = token
}
// 清除token
export function removeToken(){
    const UserStore = useUserStore();
    UserStore.userInfo.token = '';
}