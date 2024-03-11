import type { Task } from "./task";
import type { Resource } from "./resource";
import type { TeamShow, TeamInfo } from "./team";
import type { Plan } from "./plan";
/**
 * user
 */
export interface UserInfo {
    joiningTeams: TeamShow[] | null;
    avatar: null | string;
    email: null | string;
    gender: null | string;
    leadTeams: TeamInfo[] | null;
    major: null | string;
    nickName: string;
    /**
     * 密码
     */
    passWord: string;
    personalDescription: null | string;
    phone: null | string;
    planList: Plan[] | null;
    requestTeams: RequestTeam[] | null;
    resourceList: Resource[] | null;
    taskList: Task[] | null;
    university: null | string;
    /**
     * 账户名
     */
    userName: string;
    [property: string]: any;
}


/**
 * userShow
 */
export interface UserShow {
    avatar: null | string;
    email: null | string;
    gender: null | string;
    major: null | string;
    nickName: string;
    personalDescription: null | string;
    phone: null | string;
    university: null | string;
    userName: string;
    [property: string]: any;
}

export interface RequestTeam {
    description: null | string;
    id: string;
    leader: UserShow;
    memberAddable: boolean;
    members: UserShow[];
    accepted: boolean;
    taskList: Task[] | null;
    teamAvatar: null | string;
    teamName: string;
    teamResource: Resource[] | null;
    theme: string;
    [property: string]: any;
}


export interface changePasswordForm {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

