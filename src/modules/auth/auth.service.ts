import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto';
import { AppErrorsObj } from 'src/common/constants/errors';
import { UserModel } from '../user/models/user.model';
import { UserLoginDto } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';
import { TokenService } from '../token/token.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UserService,
        private readonly tokenService: TokenService
    ) {}

   async registerUser(dto: CreateUserDto): Promise<UserModel> {

        const isUserExists = await this.userService.findUserByEmail(dto.email);
        if(isUserExists) throw new BadRequestException(AppErrorsObj.USER_EXISTS);

        return this.userService.createUser(dto);
    }

    async loginUser(dto: UserLoginDto): Promise<AuthUserResponse> {

        const existingUser = await this.userService.findUserByEmail(dto.email);
        if(!existingUser) throw new BadRequestException(AppErrorsObj.USER_NOT_EXISTS);
    
        const isPasswordValid = await bcrypt.compare(dto.password, existingUser.password);
        if(!isPasswordValid) throw new BadRequestException(AppErrorsObj.WRONG_DATA);

        const user = await this.userService.getPublicUser(dto.email);
        const token = await this.tokenService.generateJwtToken(user);

        

        return {
            user,
            accessToken: token
        }
    }
}
