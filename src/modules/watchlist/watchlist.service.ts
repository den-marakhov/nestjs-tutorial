import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { WatchListModel } from './model/watchlist.model';
import { WatchListDto } from './dto';
import { CreateAssetResponse } from './response';


@Injectable()
export class WatchlistService {

    constructor(@InjectModel(WatchListModel) private readonly watchlistRepository: typeof WatchListModel) {}

    async createAsset(user, dto: WatchListDto): Promise<CreateAssetResponse> {

        const watchlist = {
            user: user.id,
            name: dto.name,
            assetId: dto.assetId
        }

        await this.watchlistRepository.create(watchlist);

        return watchlist

    }

    async deleteAsset(userId: number, assetId: string): Promise<boolean> {
      
        await this.watchlistRepository.destroy({
            where:
            {
                user: userId, id: assetId

            }
        });

        return true;
    }
}
