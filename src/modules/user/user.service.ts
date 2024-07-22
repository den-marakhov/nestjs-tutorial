import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserModel } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, UpdateUserDto } from './dto';


@Injectable()
export class UserService {

constructor(@InjectModel(UserModel) private readonly userRepository: typeof UserModel) {}


   async hashUserPassword(password: string) {

    return bcrypt.hash(password, 10);

   }

   async findUserByEmail(email: string): Promise<UserModel> {

   return await this.userRepository.findOne({
        where: {
            email,
        }
    });

   }


   async createUser(dto: CreateUserDto): Promise<UserModel> {

    const hashedPassword = await this.hashUserPassword(dto.password);


    const newUser = await this.userRepository.create({
        ...dto,
        password: hashedPassword
    });

    return newUser;

   }

   async getPublicUser(email: string) {

    return this.userRepository.findOne({
        where: {
            email
        },
        attributes: {
            exclude: ['password']
        }
    })
   }

   async updateUserInfo(email:string, dto: UpdateUserDto): Promise<UpdateUserDto>  {

   await this.userRepository.update(dto, {where: {email}});

    return dto;
   }

   async removeUser(email: string) {

    await this.userRepository.destroy({where: {email}});
    
   }
}
