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

export interface setPlanInfo {
    planName: string,   
    planDay: string
}