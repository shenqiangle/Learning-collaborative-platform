/**
 * teamShow
 */
export interface TeamShow {
    description: null | string;
    id: string;
    leader: UserShow;
    memberAddable: boolean;
    members: UserShow[];
    TaskList: TaskList[] | null;
    teamAvatar: null | string;
    teamName: string;
    teamResource: Resource[] | null;
    theme: string;
    [property: string]: any;
}

export interface TaskList {
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