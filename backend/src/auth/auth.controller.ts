import {
  Controller,
  Post,
  Patch,
  Body,
  HttpCode,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LoginData } from '../type';
import { AuthService } from './auth.service';
import { User } from 'src/entries/user';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  @HttpCode(200)
  async login(@Body() req: LoginData) {
    return await this.authService.login(req);
  }

  @Post('logout')
  @HttpCode(200)
  async logout() {
    return;
  }

  @Post('register')
  @HttpCode(200)
  async register(@Body() req: User) {
    return await this.authService.register(req);
  }

  @Patch('changepw')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  async changepw(
    @Request() req: { user: User },
    @Body() data: { password: string; newPassword: string },
  ) {
    console.log('修改密码');
    console.log('用户', req.user);
    console.log('原密码', data.password);
    console.log('新密码', data.newPassword);
    return await this.authService.changepw(
      req.user,
      data.password,
      data.newPassword,
    );
  }
}
