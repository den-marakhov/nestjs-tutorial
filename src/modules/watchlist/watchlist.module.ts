import { Module } from '@nestjs/common';
import { WatchlistController } from './watchlist.controller';
import { WatchlistService } from './watchlist.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { WatchListModel } from './model/watchlist.model';

@Module({
  imports: [SequelizeModule.forFeature([WatchListModel])],
  controllers: [WatchlistController],
  providers: [WatchlistService],
})
export class WatchlistModule {}
