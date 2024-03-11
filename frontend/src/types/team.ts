import type { UserShow } from "./user";
import type { Task } from "./task";
import type { Resource } from "./resource";
/**
 * teamInfo
 */
export interface TeamInfo {
    description: null | string;
    id: string;
    leader: UserShow;
    memberAddable: boolean;
    members: UserShow[];
    requests: null | UserShow[];
    taskList: Task[] | null;
    teamAvatar: null | string;
    teamName: string;
    teamResource: Resource[] | null;
    theme: string;
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
    taskList: Task[] | null;
    teamAvatar: null | string;
    teamName: string;
    teamResource: Resource[] | null;
    theme: string;
    [property: string]: any;
}


export interface createTeamInfo {
    description: null | string;
    memberAddable: boolean;
    teamAvatar: null | string;
    teamName: string;
    theme: string;
}
