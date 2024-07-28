import { Module } from '@nestjs/common';
import { CatsModule } from '../cats/cat.module';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../../configurations/index'
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from '../user/models/user.model';
import { AuthModule } from '../auth/auth.module';
import { TokenModule } from '../token/token.module';
import { WatchlistModule } from '../watchlist/watchlist.module';
import { WatchListModel } from '../watchlist/model/watchlist.model';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration]
  }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({

        dialect: 'postgres',

        host: configService.get('db_host'),
        port: configService.get('db_port'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),

        synchronize: true,
        autoLoadModels: true,
        models: [UserModel,  WatchListModel],

      }),
    }),
    CatsModule,
    UserModule,
    AuthModule,
  TokenModule,
    WatchlistModule
],
  
})
export class AppModule {}
