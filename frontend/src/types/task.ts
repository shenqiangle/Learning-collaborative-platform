import type { UserShow } from "./user";
/**
 * Task
 */
export interface Task {
    completeDay: null | Date;
    id: string;
    isCompleted: boolean;
    performers: null | UserShow;
    taskDescription: string;
    taskName: string;
    teamID: string;
    teamName: string;
    [property: string]: any;
}

/**
 * SetTaskInfo
 */
export interface SetTaskInfo {
    /**
     * 执行者ID
     */
    performers: string;
    taskDescription: null | string;
    /**
     * ID 编号
     */
    taskName: string;
    /**
     * ID 编号
     */
    taskId: string | null;
    teamId: string;
    
}

