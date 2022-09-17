import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class Experience {
  id: number;

  @ApiProperty()
  @IsString()
  workplaceName: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate?: Date;
}
