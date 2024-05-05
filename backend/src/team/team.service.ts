import {
  Injectable,
  HttpException,
  UnauthorizedException,
} from '@nestjs/common';
import { Team } from '../entries/team';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entries/user';
import { MemberEditInfo, Newteam, setTaskInfo } from 'src/type';
import { UserService } from 'src/user/user.service';
import { Task } from 'src/entries/task';
import { Resource } from 'src/entries/resource';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(Resource)
    private resourceRepository: Repository<Resource>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private userService: UserService,
  ) {}

  async getTeam(teamId: number) {
    const team = await this.teamRepository.findOne({
      where: {
        id: teamId,
      },
      relations: {
        leader: true,
        requests: true,
        members: true,
        taskList: true,
        resources: true,
      },
    });
    return team;
    // return this.teamRepository.findOne({ where: { id: teamId } });
  }

  async saveTeam(team: Team) {
    this.teamRepository.save(team);
  }

  async addTeam(newTeam: Newteam, leader: User) {
    try {
      console.log('newTeam', newTeam);
      console.log('leader', leader);
      await this.teamRepository.insert({ ...newTeam, leader });
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  async modifyTeam(newTeamInfo: Partial<Newteam>, teamId: string) {
    try {
      await this.teamRepository.update({ id: Number(teamId) }, newTeamInfo);
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  async editMembers(editInfo: MemberEditInfo) {
    const { memberUserName, teamId, accepted } = editInfo;
    const member = await this.userService.getPureUser(memberUserName);
    const team = await this.teamRepository.findOne({
      where: {
        id: Number(teamId),
      },
      relations: {
        requests: true,
        members: true,
      },
    });
    team.requests = (team.requests || []).filter(
      (user) => user.userName !== memberUserName,
    );
    team.members = team.members || [];
    if (accepted) {
      if (!team.members.includes(member)) {
        team.members.push(member);
      }
    } else {
      team.members = team.members.filter(
        (user) => user.userName !== memberUserName,
      );
    }
    this.teamRepository.save(team);
    console.log(team.members);
  }

  async deleteTeam(deleteTeamId: string, operator: User) {
    this.checkIsLeadTeam(operator, deleteTeamId);

    try {
      await this.teamRepository.delete({ id: Number(deleteTeamId) });
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  /**
   * 是否是该user领导的队伍
   */
  checkIsLeadTeam(user: User, teamId: string) {
    if (
      !user.leadTeams ||
      !user.leadTeams.map((team) => team.id === Number(teamId)).includes(true)
    ) {
      throw new UnauthorizedException('不是你领导的队伍!');
    }
  }

  getTeams(
    university?: string,
    competitionName?: string,
    competitionType?: string,
  ) {
    if (!university && !competitionName && !competitionType) {
      return this.teamRepository.find({
        take: 10,
        relations: {
          leader: true,
          members: true,
        },
      });
    }
    function generateLikeCondition(condition: string) {
      return Like(`%${condition}%`);
    }
    const conditions = {
      university,
      competitionName,
      competitionType,
    };
    for (const key of Object.keys(conditions)) {
      if (conditions[key]) {
        conditions[key] = generateLikeCondition(conditions[key]);
      }
    }
    // return this.teamRepository.find({
    //   where: conditions,
    //   take: 15,
    //   relations: {
    //     leader: true,
    //     members: true,
    //   },
    // });
  }

  async setTask(setTaskInfo: setTaskInfo) {
    const { teamId, performers, taskId } = setTaskInfo; // 添加 taskId
    console.log(setTaskInfo);
    const team = await this.getTeam(Number(teamId));
    const performer = await this.userService.getPureUser(performers);
    if (taskId) {
      let task: Task = await this.taskRepository.findOne({
        where: {
          id: taskId,
        },
      });
      task = { ...task, ...setTaskInfo };
      if (task.isCompleted) {
        task.completeDay = this.getToday();
      }
      console.log(task.completeDay);
      await this.taskRepository.save(task);
    } else {
      let task: Task = new Task();
      task = { ...task, ...setTaskInfo };
      task.performer = performer;
      task.team = team;
      await this.taskRepository.save(task);
    }
  }

  getToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const today = new Date(Date.UTC(year, month, day));
    return today;
  }

  async uploadResource(
    file: any,
    teamId: string,
    uploader: string,
    fileName: string,
    fileDesc: string,
  ) {
    const src = file.path; //文件存储位置
    const name = fileName; //文件名
    const fileType = file.mimetype; //文件类型
    const team = await this.getTeam(Number(teamId));
    let newFile = this.getNewFile(src, name, fileType, fileDesc, team);
    team.members.forEach(async (member) => {
      const user = await this.userService.getPureUser(member.userName);
      newFile = this.getNewFile(src, name, fileType, fileDesc, team);
      newFile.user = user;
      this.resourceRepository.insert(newFile);
    });
    const elseUser = await this.userService.getPureUser(team.leader.userName);
    newFile = this.getNewFile(src, name, fileType, fileDesc, team);
    newFile.user = elseUser;
    this.resourceRepository.insert(newFile);
  }

  getNewFile(src, name, fileType, fileDesc, team) {
    const newFile: Partial<Resource> = {
      src,
      name,
      fileType,
      fileDesc,
      team,
    };

    return newFile;
  }
}
