/**
 * Task
 */
export interface Task {
    completeDay: null | string;
    id: string;
    isCompleted: boolean;
    performers: UserShow[] | null;
    taskDescription: string;
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