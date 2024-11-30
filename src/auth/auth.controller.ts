import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/create-user.dto';
import { GetUser } from './decorator/get-user.decorator';
import { GoogleGuard } from './guard/google.guard';
import { RefreshGuard } from './guard/refresh.guard';

@Controller('/')
export class AuthController {
    constructor(private authService: AuthService) {}


    @Get('google')
    @UseGuards(GoogleGuard)
    async googleAuth(@Req() req) {

    }

    @Get('google/callback')
    @UseGuards(GoogleGuard)
    async googleCallback(@Req() req) {
        return this.authService.googleLogin(req.user)
    }
    
    @Post('signup')
    signUp(@Body() dto: AuthDto) {
        return this.authService.signUp(dto);
    } 


    @Post('signin')
    @HttpCode(HttpStatus.OK)
    signIn(@Body() dto: AuthDto) {
        return this.authService.signIn(dto);
    }

    @UseGuards(RefreshGuard)
    @Post('refresh')
    refreshTokens(@GetUser('sub') userId: string, @GetUser('refreshToken') rt: string ){
        return this.authService.refresh(userId, rt)
    }
}
