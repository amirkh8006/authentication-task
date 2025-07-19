import { UserLoginDto, VerifyUserDto } from '@dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from 'src/database/redis/redis.service';
import { DynamicModelService } from '@utils/dynamicModel.service';
export declare class AuthService {
    private readonly request;
    private jwtService;
    private redisService;
    private readonly dynamicModelService;
    constructor(request: Request, jwtService: JwtService, redisService: RedisService, dynamicModelService: DynamicModelService);
    loginUser(userLoginDto: UserLoginDto): Promise<object>;
    verifyUser(verifyUserDto: VerifyUserDto): Promise<object>;
    logOutUser(): Promise<object>;
}
