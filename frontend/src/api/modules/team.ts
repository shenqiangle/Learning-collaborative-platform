import service from "@/api";
import type { createTeamInfo } from "@/types/team";

export function createTeam(teamForm: createTeamInfo){
    return service.post("/team/createTeam",{
      ...teamForm
    })
  }