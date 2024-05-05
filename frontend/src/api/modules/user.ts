import service from "@/api";
import type { Plan, setPlanInfo } from "@/types/plan";
import type { UserShow } from '@/types/user'

export function modifyUser(user: Partial<UserShow>){
    return service.patch('/user',user);
}

export function setPlan(setPlanInfo: Partial<Plan>){
    return service.patch('/user/SetPlan',setPlanInfo)
}