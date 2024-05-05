import service from "@/api";
import type { SetTaskInfo } from "@/types/task";
import type { createTeamInfo, MemberEditInfo } from "@/types/team";

export function createTeam(teamForm: createTeamInfo){
    return service.post("/team/createTeam",{
      ...teamForm
    });
  }

export function editMembers(editInfo: MemberEditInfo){
    return service.patch('/team/member',editInfo);
}

export function deleteTeam(deleteTeamId: string){
  return service.delete(`team/${deleteTeamId}`);
}

export function setTask(setTaskInfo: Partial<SetTaskInfo>){
  return service.patch('/team/setTasks',setTaskInfo);
}

export function uploadResource(uploadData: { file: any; teamId: any; fileDesc: any }) {
  const { file, teamId, fileDesc } = uploadData;
  const formData = new FormData();
  formData.append('file', file);
  formData.append('teamId', teamId);
  formData.append('fileName',file.name);
  formData.append('fileDesc',fileDesc);
  return service.post('/team/uploadResource', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
}