import {
  Controller,
  Post,
  UseGuards,
  Request,
  Query,
  Get,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IndexService } from './index.service';
import { AuthRequest } from 'src/type';

@Controller('index')
@UseGuards(AuthGuard)
export class IndexController {
  constructor(private IndexService: IndexService) {}

  @Post('requestTeam')
  requestTeam(@Query('id') teamId: string, @Request() requests: AuthRequest) {
    console.log(teamId);
    return this.IndexService.requestTeam(requests.user, Number(teamId));
  }

  @Get('getIndexTeamInfo')
  async getIndexTeamInfo(@Request() requests: AuthRequest) {
    return this.IndexService.getIndexTeamInfo(requests.user);
  }

  @Get('getActInfo')
  async getIndexActInfo() {
    return this.IndexService.getActInfo();
  }

  // @Get('getActInfo')
  // async getIndexActInfo() {
  //   const startDate = new Date();
  //   startDate.setFullYear(2024, 2, 19);
  //   const endDate = new Date();
  //   endDate.setFullYear(2024, 9, 19);
  //   const start = startDate.getTime();
  //   const end = endDate.getTime();
  //   const img =
  //     'D:Code/VSCode_HTML/vue/Learning-collaborative-platform/frontend/src/assets/tortoise.jpg';
  //   const src = 'src';
  //   const actTitle = 'actTitle';
  //   const actDesc = 'actDesc';
  //   this.IndexService.setActInfo(start, end, img, src, actTitle, actDesc);
  // }
}
