import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsString } from "class-validator"

export class CreateAssetResponse {

    @ApiProperty({example: 1, description: 'User id'})
    @IsNumber()
    user: number

    @ApiProperty({example: 'bitcoin', description: 'The asset\'s name'})
    @IsString()
    name: string

    @ApiProperty({example: '1', description: 'The asset\'s id'})
    @IsString()
    assetId: string
}