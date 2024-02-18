

/**
 * user
 */
export interface UserInfo {
    avatar: null | string;
    email: null | string;
    gender: null | string;
    leadTeams: string[] | null;
    major: null | string;
    nickName: string;
    /**
     * 密码
     */
    passWord: string;
    personalDescription: null | string;
    phone: null | string;
    requestTeams: string[] | null;
    university: null | string;
    /**
     * 账户名
     */
    userName: string;
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