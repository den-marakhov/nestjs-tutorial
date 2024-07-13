import { Module } from "@nestjs/common";
import { CatController } from "./cat.controller";
import { CatService } from "./cat.service";


@Module ({
    imports:[],
    controllers: [CatController],
    providers: [CatService],
    exports: [CatsModule]
})
export class CatsModule {}