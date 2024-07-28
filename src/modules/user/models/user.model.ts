
import { ApiProperty } from "@nestjs/swagger";
import { Table, Model, Column, DataType, HasMany} from "sequelize-typescript";
import { WatchListModel } from "src/modules/watchlist/model/watchlist.model";


@Table({tableName: 'users'})
export class UserModel extends Model<UserModel> {

    @ApiProperty({example: 1, description: 'Unique identifier'})
    @Column({type: DataType.INTEGER, autoIncrement: true, unique: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Den', description: 'User first name'})
    @Column({type: DataType.STRING, allowNull: false})
    firstName: string;

    @ApiProperty({example: 'Bukko', description: 'Username'})
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    userName: string;

    @ApiProperty({example: 'den1992@gmail.com', description: 'User e-mail'})
    @Column({type: DataType.STRING, allowNull: false, unique: true})
    email: string;

    @ApiProperty({example: '123456', description: 'User password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @HasMany(() => WatchListModel, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    watchlist: WatchListModel[];
}