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
}
