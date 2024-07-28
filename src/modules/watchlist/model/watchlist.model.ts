import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Table, Model} from "sequelize-typescript";
import { UserModel } from "src/modules/user/models/user.model";


@Table({tableName: 'watchlist'})
export class WatchListModel extends Model<WatchListModel> {

    @ApiProperty({example: 1, description: 'User id'})
    @ForeignKey(()=> UserModel)
    user: UserModel;

    @ApiProperty({example: 'bitcoin', description: 'The asset\'s name'})
    @Column({type: DataType.STRING})
    name: string;

    @ApiProperty({example: '1', description: 'The asset\'s id'})
    @Column({type: DataType.STRING})
    assetId: string;
}