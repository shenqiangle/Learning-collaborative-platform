/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { User } from '../entries/user';
import { hash, compare } from 'bcrypt';
import { Team } from 'src/entries/team';
import { setPlanInfo } from 'src/type';
import { Plan } from 'src/entries/plan';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Plan)
    private planRepository: Repository<Plan>,
  ) {}

  async checkUser(userName: string, password: string) {
    const result = await this.userRepository.findOne({
      where: {
        userName,
      },
    });
    console.log(userName, password);
    console.log(result);
    if (result) return await compare(password, result.password);
  }

  async addUser(user: User) {
    console.log('addUser', user);
    const { userName, password } = user;
    if (!userName || !password) {
      throw new Error('无账号或密码');
    }
    console.log('注册密码', password);
    user.password = await hash(password, 10);
    console.log('加密后密码', user.password);
    return await this.userRepository.insert(user);
  }

  async saveUser(user: User) {
    return this.userRepository.save(user);
  }

  async changepw(user: User, oldPassword: string, newPassword: string) {
    if (!compare(oldPassword, user.password)) {
      throw new Error('原密码输入错误');
    }
    console.log('密码修改成功');
    return await this.userRepository.update(
      { userName: user.userName },
      { password: await hash(newPassword, 10) },
    );
  }

  async getUser(userName: string) {
    const user = await this.userRepository.findOne({
      where: {
        userName,
      },
      relations: {
        leadTeams: {
          members: true,
          requests: true,
          taskList: true,
        },
        joiningTeams: {
          members: true,
          leader: true,
          requests: true,
          taskList: true,
        },
        requestTeams: {
          members: true,
          leader: true,
          requests: true,
          taskList: true,
        },
        taskList: true,
        planList: true,
      },
    });
    user.requestTeams = user.requestTeams.map((team) => {
      return {
        team,
        accepted: !this.computeAccepted(user.userName, team.requests),
      };
    }) as any;

    return user;
  }

  computeAccepted(userName: string, team: User[]): boolean {
    return team.some((user) => user.userName === userName);
  }

  /**
   * 修改对应user
   * @param user 不是undefined的属性即为要修改的属性
   */
  modifyUser(user: Partial<User>) {
    const {
      userName,
      password,
      leadTeams,
      joiningTeams,
      requestTeams,
      ...modifyData
    } = user;
    const finallyModifyData: Record<string, any> = {};
    for (const key of Object.keys(modifyData) as Array<
      keyof typeof modifyData
    >) {
      if (modifyData[key]) {
        Reflect.set(finallyModifyData, key, modifyData[key]);
      }
    }
    return this.userRepository.update(
      {
        userName,
      },
      finallyModifyData,
    );
  }

  async setPlan(user: User, PlanInfo: setPlanInfo) {
    const { planId } = PlanInfo;

    if (planId) {
      let plan: Plan = await this.planRepository.findOne({
        where: {
          id: planId,
        },
      });
      plan = { ...plan, ...PlanInfo };
      await this.planRepository.save(plan);
    } else {
      user = await this.getPureUser(user.userName);
      let plan: Plan = new Plan();
      plan = { ...plan, ...PlanInfo };
      plan.user = user;
      await this.planRepository.save(plan);
    }
  }

  async getPureUser(userName: string) {
    const user = await this.userRepository.findOne({
      where: {
        userName,
      },
      relations: {
        leadTeams: {
          members: true,
          requests: true,
          taskList: true,
        },
        joiningTeams: {
          members: true,
          leader: true,
          requests: true,
          taskList: true,
        },
        requestTeams: {
          members: true,
          leader: true,
          requests: true,
          taskList: true,
        },
        taskList: true,
        planList: true,
      },
    });
    // const user = await this.userRepository.findOne({
    //   where: {
    //     userName,
    //   },
    //   relations: {
    //     requestTeams: true,
    //   },
    // });
    return user;
  }
}
