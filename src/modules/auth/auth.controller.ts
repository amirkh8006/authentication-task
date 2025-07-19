import { UserLoginDto, VerifyUserDto } from '@dto/auth.dto';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  loginUser(@Body() userLoginDto: UserLoginDto): object {
    return this.authService.loginUser(userLoginDto);
  }

  @Post('verify')
  verifyUser(@Body() verifyUserDto: VerifyUserDto): object {
    return this.authService.verifyUser(verifyUserDto);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  logOutUser(): object {
    return this.authService.logOutUser();
  }
}
