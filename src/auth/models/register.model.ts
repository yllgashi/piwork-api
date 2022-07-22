import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class Register {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
