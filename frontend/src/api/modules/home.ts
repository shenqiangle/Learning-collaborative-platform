
import service from "@/api";
import type { TeamShow } from '@/types/team'
import type { Act } from "@/types/act";
/**
 * @name 主页模块，获取队伍信息展示
 */
// 


  export function getIndexTeamInfo(): Promise<TeamShow[]> {
    return service.get<TeamShow[]>('/index/getIndexTeamInfo')
    .then(
      (response) => response.data
      );
  }

  export function getTeamInfo(): Promise<TeamShow> {
    return service.get<TeamShow>('/index/getTeamInfo')
      .then((response) => response.data);
  }

  export function requestTeam(id: string) {
    return service.post('/index/requestTeam', {}, {
        params: {
            id
        }
    });
}

  export function getActInfo(): Promise<Act[]> {
    return service.get<Act[]>('/index/getActInfo')
    .then(
      (response) => response.data
      );
  }