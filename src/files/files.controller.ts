import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { FilesService } from './files.service';

@ApiBearerAuth()
@ApiTags('Files')
@Controller('files')
@Controller('files')
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Get('/:name')
  async getFile(
    @Param('name') name: string,
    @Res() res: Response,
  ): Promise<any> {
    const file = this.filesService.getFile(name);

    res.setHeader('Content-Type', 'image/pdf');
    file.pipe(res);
  }
}
