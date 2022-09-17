import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class JobApplication {
  id?: number;

  @ApiProperty()
  @IsNumber()
  jobId: number;

  @ApiProperty()
  @IsString()
  comment: string;
}
