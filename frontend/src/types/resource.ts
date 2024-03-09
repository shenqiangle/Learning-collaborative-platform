/**
 * resource
 */
export interface Resource {
    avatar: null | string;
    email: null | string;
    fileDesc: null | string;
    fileType: null | string;
    gender: null | string;
    major: null | string;
    name: string;
    nickName: string;
    personalDescription: null | string;
    phone: null | string;
    src: string;
    university: null | string;
    userName: string;
    [property: string]: any;
}