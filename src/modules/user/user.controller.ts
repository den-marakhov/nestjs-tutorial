import { Body, Controller, Delete, HttpCode, Patch, Post, Req, UseGuards,} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';




@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @ApiTags('API')
    @ApiOperation({summary: 'Updating user inforamtion'})
    @ApiResponse({type: UpdateUserDto})
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Patch('update-user')
    updateUser(@Body() updateUserDto: UpdateUserDto, @Req() request): Promise<UpdateUserDto> {

        const user = request.user;
        
      return  this.usersService.updateUserInfo(user.email, updateUserDto);
    }

    @ApiTags('API')
    @ApiOperation({summary: 'Deleting user information'})
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @Delete('delete-user')
    deleteUser(@Req() request) {
        const user = request.user;

        this.usersService.removeUser(user.email);
    }
}
