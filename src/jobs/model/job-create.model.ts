import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class JobCreate {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  sourceCodeLink: string;

  @ApiProperty()
  estimatedDays: number;

  @ApiProperty()
  @IsNotEmpty()
  contactEmail: string;

  @ApiProperty()
  @IsNotEmpty()
  priceAmount: number;

  @ApiProperty()
  jobTechnologiesIds?: number[];
}
