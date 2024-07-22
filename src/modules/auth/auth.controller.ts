import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto';
import { UserModel } from '../user/models/user.model';
import { UserLoginDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUserResponse } from './response';
import { JwtAuthGuard } from 'src/guards/jwt-guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @ApiTags('API')
    @ApiOperation({summary: 'User registration'})
    @ApiResponse({status: 201, type: UserModel})
    @Post('registration')
    registerUser(@Body() dto: CreateUserDto): Promise<UserModel> {

        return this.authService.registerUser(dto);

    }

    @ApiTags('API')
    @ApiOperation({summary: 'User login'})
    @HttpCode(200)
    @ApiResponse({status: 200, type: AuthUserResponse})
    @Post('login')
    loginUser(@Body() dto: UserLoginDto): Promise<AuthUserResponse> {

        return this.authService.loginUser(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('test')
    test() {
        return true
    }
}
