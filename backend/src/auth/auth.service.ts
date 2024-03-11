import {
  Injectable,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginData } from 'src/type';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/entries/user';
import {} from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(data: LoginData) {
    console.log(data);
    const result = await this.userService.checkUser(
      data.userName,
      data.password,
    );
    console.log(result);
    if (result) {
      return { token: await this.jwtService.signAsync(data) };
    } else {
      throw new UnauthorizedException();
    }
  }

  async register(user: User) {
    try {
      await this.userService.addUser(user);
    } catch (e) {
      throw new HttpException('参数错误', 422);
    }
  }

  async changepw(user: User, oldPassword: string, newPassword: string) {
    try {
      await this.userService.changepw(user, oldPassword, newPassword);
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }
}
