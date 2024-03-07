
import service from "@/api";
import type { AxiosResponse } from "axios";
import type { UserInfo,changePasswordForm } from "@/types/user";
import authMenuList from '@/assets/json/authMenuList.json'
/**
 * @name 登录模块
 */
// 用户登录
export function loginApi(username:string,password:string){
  return service.post("/auth/login",{
    username,
    password
  })
}


export function getUserInfo(): Promise<UserInfo> {
  return service.get<UserInfo>('/user')
    .then((response: AxiosResponse<UserInfo>) => response.data);
}


export function logout(){
  return service.post('/auth/logout')
}

export function changePassword({oldPassword,newPassword,confirmNewPassword}:changePasswordForm){
  return service.patch('/auth/changepw',{
    oldPassword,newPassword,confirmNewPassword
  })
}

export function getAuthMenuListApi(){
  //return http.get<Menu.MenuOptions[]>(PORT1 + `/menu/list`, {}, { loading: false });
  // 让菜单变为本地数据，注释上一行代码，并引入本地 authMenuList.json 数据
  return authMenuList;
}
