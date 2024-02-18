

/**
 * UserInfo
 */
export interface UserInfo {
    addedTeams: TeamShow[] | null;
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
    requestTeams: TeamShow[] | null;
    taskList: TaskList[] | null;
    university: null | string;
    /**
     * 账户名
     */
    userName: string;
    [property: string]: any;
}

/**
 * teamShow
 */
export interface TeamShow {
    description: null | string;
    id: string;
    leader: UserShow;
    memberAddable: boolean;
    members: UserShow[];
    TaskList: PurpleTaskList[] | null;
    teamAvatar: null | string;
    teamName: string;
    teamResource: Resource[] | null;
    theme: string;
    [property: string]: any;
}

export interface PurpleTaskList {
    completeDay: null | string;
    id: string;
    isCompleted: boolean;
    performers: UserShow[] | null;
    taskName: string;
    teamName: string;
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

/**
 * resource
 */
export interface Resource {
    avatar: null | string;
    email: null | string;
    fileType: null | string;
    gender: null | string;
    major: null | string;
    name: null | string;
    nickName: string;
    personalDescription: null | string;
    phone: null | string;
    src: null | string;
    university: null | string;
    userName: string;
    [property: string]: any;
}

/**
 * teamInfo
 */
export interface TeamInfo {
    description: null | string;
    id: string;
    leader: UserShow;
    memberAddable: boolean;
    members: UserShow[];
    requests: null | UserShow;
    TaskList: FluffyTaskList[] | null;
    teamAvatar: string;
    teamName: string;
    teamResource: Resource[] | null;
    theme: string;
    [property: string]: any;
}

export interface FluffyTaskList {
    completeDay: null | string;
    id: string;
    isCompleted: boolean;
    performers: UserShow[] | null;
    taskName: string;
    teamName: string;
    [property: string]: any;
}

/**
 * plan
 */
export interface Plan {
    id: string;
    isCompleted: boolean;
    isImportant: boolean;
    planDay: string;
    planName: string;
    [property: string]: any;
}

export interface TaskList {
    completeDay: null | string;
    id: string;
    isCompleted: boolean;
    isImportant: boolean;
    performers: UserShow[] | null;
    taskName: string;
    teamName: string;
    [property: string]: any;
}
/**
 * 修改密码
 */
export interface changePasswordForm {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
    [property: string]: any;
}