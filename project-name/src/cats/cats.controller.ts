import {
  Controller,
  Get,
  Post,
  Res,
  HttpStatus,
  Param,
  Redirect,
  Query,
  Body,
} from '@nestjs/common';
import { Cat } from './interfaces/cat';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    console.log('createCatDto>>', createCatDto);
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    console.log('catsService>>', this.catsService);

    return this.catsService.findAll();
  }
  // @Post()
  // create(@Res() res: Response): string {
  //   // console.log('res>>>>create', res);
  //   // res.status(HttpStatus.CREATED).send();
  //   return 'This action adds a new cat';
  // }

  // @Get()
  // findAll(@Res() res: Response) {
  //   console.log('res>>>>findAll', res);
  //   res.status(HttpStatus.OK).json(['1', '2']);
  // }
  //   @Get(':id')
  //   findOne(@Param() params): string {
  //     console.log(params.id);
  //     return `This action returns a #${params.id} cat`;
  //   }
  //   @Get('docs')
  //   @Redirect('https://docs.nestjs.com', 301)
  //   getDocs(@Query('version') version) {
  //     console.log('version>>', version);
  //     if (version && version === '5') {
  //       return { url: 'https://docs.nestjs.com/v5/' };
  //     }
  //   }
}
