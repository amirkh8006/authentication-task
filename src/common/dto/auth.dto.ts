import { IsNotEmpty, Length, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({ description: 'The phone number of the user' })
  @IsNotEmpty()
  @Length(11)
  @Matches(new RegExp('^(\\+98|0)?9\\d{9}$'))
  phoneNumber: string;
}

export class VerifyUserDto {
  @ApiProperty({ description: 'The phone number of the user' })
  @IsNotEmpty()
  @Length(11)
  @Matches(new RegExp('^(\\+98|0)?9\\d{9}$'))
  phoneNumber: string;

  @ApiProperty({ description: 'The verification code sent to the user' })
  @IsNotEmpty()
  @Length(4)
  verCode: string;
}
