import type { UserShow } from "./user";
/**
 * Task
 */
export interface Task {
    completeDay: null | string;
    id: string;
    isCompleted: boolean;
    performers: null | UserShow;
    taskDescription: string;
    taskName: string;
    teamID: string;
    teamName: string;
    [property: string]: any;
}

