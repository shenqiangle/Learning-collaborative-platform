import { Team } from './entries/team';
import { User } from './entries/user';

export interface LoginData {
  userName: string;
  password: string;
}
export interface AuthRequest {
  user: User;
}

export type Newteam = Omit<Team, 'id' | 'leader' | 'requests' | 'members'>;

export interface MemberEditInfo {
  memberUserName: string;
  teamId: string;
  accepted: boolean;
}

export interface setTaskInfo {
  taskId: number;
  isCompleted: boolean;
  /**
   * 执行者ID
   */
  performers: string;
  taskDescription: null | string;
  taskName: string;
  /**
   * ID 编号
   */
  teamId: string;
}
/**
 * Request
 */
export interface setPlanInfo {
  /**
   * ID 编号
   */
  planId: number;
  isCompleted: boolean;
  isImportant: boolean;
  planDay: Date;
  planName: string;
}
