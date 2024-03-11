import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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
    private teamService: TeamService,
    private userService: UserService,
  ) {}

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

  async getIndexTeamInfo(user: User) {
    const minTeamCount = 3;
    const count = await this.teamRepository.count();

    const queryBuilder = this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.leader', 'leader');
    // .where('leader.userName != :userName', { userName: user.userName });

    if (count <= minTeamCount) {
      //返回所有数据
      return await queryBuilder.getMany();
    } else {
      //随机返回minTeamCount条数据
      const random = Math.floor(Math.random() * (count - minTeamCount + 1));
      return await queryBuilder
        .orderBy('RAND()')
        .offset(random)
        .limit(minTeamCount)
        .getMany();
    }
  }
}
