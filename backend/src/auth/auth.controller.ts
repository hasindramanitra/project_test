import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninDto, SignupDto } from './dto';


/**
 * controller
 */
@Controller('auth')
export class AuthController {

    /**
     * inject the authService as dependency
     * @param authService 
     */
    constructor(
        private authService: AuthService
    ) {}


    /**
     * endpoints to send new user
     * @param dto 
     * @returns 
     */
    @Post('signup')
    signup(@Body() dto: SignupDto) {

        return this.authService.signup(dto);

    }

    /**
     * endpoints to login user
     * @param dto 
     * @returns 
     */
    @Post('signin')
    signin(@Body() dto: SigninDto) {

        return this.authService.signin(dto);
    }

}
