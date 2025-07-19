import { UserLoginDto, VerifyUserDto } from '@dto/auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    loginUser(userLoginDto: UserLoginDto): object;
    verifyUser(verifyUserDto: VerifyUserDto): object;
    logOutUser(): object;
}
