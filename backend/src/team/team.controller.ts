import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Patch,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthRequest, MemberEditInfo, Newteam, setTaskInfo } from 'src/type';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { TeamService } from './team.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as path from 'path';
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

  @Delete(':id')
  deleteTeam(@Param('id') id: string, @Request() req: AuthRequest) {
    return this.TeamService.deleteTeam(id, req.user);
  }

  @Post('uploadResource')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          // 获取文件的原始扩展名，file.originalname 是文件的原始名字
          const originalExtension = path.extname(file.originalname);
          // 生成新的文件名，可以添加逻辑来确保文件名的唯一性
          const newFileName = `${Date.now()}${originalExtension}`;
          // 将新的文件名传递给回调函数，就可以保存文件了
          cb(null, newFileName);
        },
      }),
    }),
  ) // 'file' 是前端传递文件的字段名称
  uploadFile(
    @UploadedFile() file,
    @Body('teamId') teamId,
    @Body('fileName') fileName,
    @Body('fileDesc') fileDesc,
    @Request() req: AuthRequest,
  ) {
    return this.TeamService.uploadResource(
      file,
      teamId,
      req.user.userName,
      fileName,
      fileDesc,
    );
  }
}
