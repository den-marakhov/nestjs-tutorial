import { Controller, Get } from "@nestjs/common";
import { CatService } from "./cat.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller('cats')
export class CatController {

    constructor(private readonly catService: CatService) {}

    @ApiTags('Cats')
    @ApiOperation({summary: 'Get a cat'})
    @Get('get-cat')
    getCat(): string {
      return  this.catService.getCat();
    }
}