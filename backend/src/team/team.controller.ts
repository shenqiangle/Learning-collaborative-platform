import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthRequest, MemberEditInfo, Newteam, setTaskInfo } from 'src/type';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TeamService } from './team.service';

@Controller('team')
@UseGuards(AuthGuard)
export class TeamController {
  constructor(private TeamService: TeamService) {}

  @Post('createTeam')
  createTeam(@Body() newTeamInfo: Newteam, @Request() requests: AuthRequest) {
    return this.TeamService.addTeam(newTeamInfo, requests.user);
  }

  @Patch('member')
  editMember(@Body() editInfo: MemberEditInfo) {
    return this.TeamService.editMembers(editInfo);
  }

  @Patch('setTasks')
  setTask(@Body() setTaskInfo: setTaskInfo) {
    return this.TeamService.setTask(setTaskInfo);
  }
}
