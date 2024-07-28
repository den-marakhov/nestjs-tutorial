import { Body, Controller, Delete, Get, HttpCode, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { WatchlistService } from './watchlist.service';
import { WatchListDto } from './dto';
import { JwtAuthGuard } from 'src/guards/jwt-guard';
import { CreateAssetResponse } from './response';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@Controller('watchlist')
export class WatchlistController {

    constructor(private readonly watchlistService: WatchlistService) {}

    @ApiTags('Watchlist')
    @ApiOperation({summary: 'Create asset'})
    @ApiResponse({status: 201, type: CreateAssetResponse})
    @UseGuards(JwtAuthGuard)
    @Post('create')
    createAsset(@Body() assetDTO: WatchListDto, @Req() request): Promise<CreateAssetResponse> {

        const user = request.user;
        
        return this.watchlistService.createAsset(user, assetDTO);
    }

    @ApiTags('Watchlist')
    @ApiOperation({summary: 'Delete asset'})
    @ApiResponse({status: 200})
    @UseGuards(JwtAuthGuard)
    @HttpCode(200)
    @Delete()
    deleteAsset(@Query('id') assetId: string, @Req() request): Promise<boolean> {

        const {id} = request.user;

         return this.watchlistService.deleteAsset(id, assetId);
    }
}
