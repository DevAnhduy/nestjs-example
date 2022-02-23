import {
  Controller,
  Get,
  HttpCode,
  Post,
  Header,
  Redirect,
  Query,
  Param,
  Body,
  Res,
  HttpStatus,
  UseFilters,
  UsePipes,
  UseGuards,
  SetMetadata,
  UseInterceptors,
  // More decoration
  //   Put,
  //   Patch,
  //   Delete,
  //   Req,
  //   Next,
  //   Session,
  //   Query,
  //   Headers,
  //   Ip,
  //   HostParam,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
//import { Request } from 'express';
import { CreateCatDto } from './create_cat.dto';
import { Response } from 'express';
import { CatsService } from './cat.service';
import { HttpExceptionFilter } from '../03_exceptions/http.exception';
import { JoiValidationPipe } from '../04_pipes/joi_validation.pipe';
import { ValidationPipe } from '../04_pipes/validation.pipe';
import { ParseIntPipe } from '../04_pipes/parse_int.pipe';
import { RolesGuard } from '../05_guards/roles.guard';
import { Roles } from '../05_guards/roles.decorator';
import { LoggingInterceptor } from '../06_interceptors/logging.interceptor';
import { Cat } from '../07_decorators/cat.decorator';

@Controller({
  path: 'cats',
  //host: 'admin.example.com',
})
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private catsService: CatsService) {}

  @Post()
  @HttpCode(204)
  @Header('Cache-Control', 'none')
  @Roles('admin')
  @UseFilters(new HttpExceptionFilter())
  //@UsePipes(new JoiValidationPipe())
  create(
    @Body(new ValidationPipe()) createCatDto: CreateCatDto,
    @Res() res: Response,
  ) {
    const result = this.catsService.create(createCatDto);

    res.status(HttpStatus.CREATED).send(result);
  }

  @Get()
  findAll(@Cat() cat: any, @Res() res: Response) {
    const cats = this.catsService.findAll();

    return res.status(HttpStatus.OK).json(cats);
  }

  @Get('promise')
  findAllPromise(): Promise<string> {
    const printHello: Promise<string> = new Promise((resolve) =>
      resolve('Hello from cat'),
    );

    return printHello;
  }

  @Get('observale')
  findAllObservable(): Observable<any[]> {
    return of([]);
  }

  //Route path like abcd, ab_cd will match
  @Get('ab*cd')
  findAllWildCard() {
    return 'This route uses a wildcard';
  }

  @Get('redirect')
  @Redirect('https://nestjs.com', 301)
  redirect() {
    return 'This route will be redirect to nestjs website';
  }

  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }

  @Get(':id')
  findOne(@Param() params): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  @Get('param/:id')
  findOneWithParamSpectify(
    @Param('id', new ParseIntPipe()) id: string,
  ): string {
    return `This action returns a #${id} cat`;
  }
}
