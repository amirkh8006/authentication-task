import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ description: 'The first name of the user' })
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'The last name of the user' })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'The phone number of the user' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Whether the user is active' })
  @IsNotEmpty()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ description: 'About the user', required: false })
  @IsOptional()
  @IsString()
  about: string;

  @ApiProperty({ description: 'The avatar of the user', required: false })
  @IsOptional()
  @IsString()
  avatar: string;
}

export class UpdateUserDto {
  @ApiProperty({ description: 'The username of the user', required: false })
  @IsOptional()
  @IsString()
  username: string;

  @ApiProperty({ description: 'The password of the user', required: false })
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({ description: 'The first name of the user', required: false })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty({ description: 'The last name of the user', required: false })
  @IsOptional()
  @IsString()
  lastName: string;

  @ApiProperty({ description: 'The phone number of the user' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Whether the user is active', required: false })
  @IsOptional()
  @IsBoolean()
  isActive: boolean;

  @ApiProperty({ description: 'About the user', required: false })
  @IsOptional()
  @IsString()
  about: string;

  @ApiProperty({ description: 'The avatar of the user', required: false })
  @IsOptional()
  @IsString()
  avatar: string;
}
