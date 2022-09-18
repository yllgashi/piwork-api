import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EmployerComment {
  @ApiProperty()
  @IsString()
  comment: string;
}
