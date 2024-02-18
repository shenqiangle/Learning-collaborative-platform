import { useCookies } from '@vueuse/integrations/useCookies';

const tokenKey = "token";

const cookie = useCookies();

//获取token
export function getToken(){
    return cookie.get(tokenKey);
}
// 设置token
export function setToken(token:string){
    return cookie.set(tokenKey,token);
}
// 清除token
export function removeToken(){
    console.log("removetoken")
    return cookie.remove(tokenKey);
}