import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'echarts';
import { Act } from 'src/entries/act';
import { Team } from 'src/entries/team';
import { User } from 'src/entries/user';
import { TeamService } from 'src/team/team.service';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

@Injectable()
export class IndexService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Act)
    private actRepository: Repository<Act>,
    private teamService: TeamService,
    private userService: UserService,
  ) {}

  async getActInfo() {
    return await this.actRepository.find();
  }

  async setActInfo(
    start: number,
    end: number,
    img: string,
    src: string,
    actTitle: string,
    actDesc: string,
  ) {
    const act: Partial<Act> = {
      startDate: start,
      endDate: end,
      img,
      src,
      actTitle,
      actDesc,
    };
    this.actRepository.insert(act);
  }

  async requestTeam(user: User, teamId: number) {
    const team = await this.teamService.getTeam(teamId);
    user = await this.userRepository.findOne({
      where: {
        userName: user.userName,
      },
      relations: {
        requestTeams: true,
      },
    });
    if (user.requestTeams) {
      user.requestTeams.push(team);
    } else {
      user.requestTeams = [team];
    }
    if (!this.hasMember(team, user)) {
      await this.teamRepository
        .createQueryBuilder()
        .relation(Team, 'requests')
        .of(team) // you can use just post id as well
        .add(user);
      if (team.requests) {
        team.requests.push(user);
      } else {
        team.requests = [user];
      }
      // await this.teamService.saveTeam(team);
      await this.userService.saveUser(user);
    }
  }

  hasMember(team: Team, user: User) {
    let result: boolean = false;
    if (team.requests) {
      team.requests.forEach((member) => {
        if (member.userName == user.userName) {
          result = true;
        }
      });
    }
    return result;
  }

  async getIndexTeamInfo(user: User) {
    const minTeamCount = 3;

    // 获取所有的team的Id
    const allTeamsId = await this.teamRepository
      .createQueryBuilder('team')
      .select('team.id')
      .getRawMany();
    const queryBuilder = this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.leader', 'leader')
      .leftJoinAndSelect('team.members', 'member');

    if (allTeamsId.length <= minTeamCount) {
      //返回所有数据
      return await queryBuilder.getMany();
    } else {
      // 随机选取三个team的Id
      const randomTeamIds = [];
      for (let i = 0; i < minTeamCount; i++) {
        const randomIndex = Math.floor(Math.random() * allTeamsId.length);
        randomTeamIds.push(allTeamsId[randomIndex].team_id);
        allTeamsId.splice(randomIndex, 1);
      }

      //获取指定Id的teams
      const randomTeams = randomTeamIds.map((teamId) =>
        queryBuilder.where('team.id = :id', { id: teamId }).getOne(),
      );

      //等待所有的随机团队查询返回结果，并返回这些结果
      return await Promise.all(randomTeams);
    }
  }
}
