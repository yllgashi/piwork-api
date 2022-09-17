import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class CreateSkill {
    @ApiProperty()
    @IsNumber()
  skillId: number;
}
