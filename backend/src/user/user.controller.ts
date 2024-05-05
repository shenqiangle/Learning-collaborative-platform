import {
  Controller,
  UseGuards,
  Get,
  Request,
  Patch,
  Body,
  HttpCode,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { AuthRequest, setPlanInfo } from '../type';
import { User } from 'src/entries/user';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async getUser(@Request() req: AuthRequest) {
    return req.user;
  }
  @Patch()
  @HttpCode(200)
  async modifyUser(@Request() req: AuthRequest, @Body() data: Partial<User>) {
    data.userName = req.user.userName;
    this.userService.modifyUser(data);
  }

  @Patch('SetPlan')
  @HttpCode(200)
  async setPlan(@Request() req: AuthRequest, @Body() PlanInfo: setPlanInfo) {
    console.log(PlanInfo);
    this.userService.setPlan(req.user, PlanInfo);
  }

  // @Get(':filename')
  // async downloadFile(@Param('filename') filename, @Res() res: FastifyReply) {
  //   const filePath = path.resolve(__dirname, '..', 'files', filename);
  //   res.header('Content-Disposition', `attachment; filename=${filename}`);
  //   createReadStream(filePath).pipe(res.raw); // 注意，Fastify 使用 ".raw" 而不是 ".res"
  // }
}
