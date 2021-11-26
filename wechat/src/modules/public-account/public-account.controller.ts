import { Body, Controller, Get, Post, Query, Req, Res } from '@nestjs/common';
import { DTestDto } from './dto/submit.dto';
import { PublicAccountService } from './public-account.service';
import { Request, Response } from 'express';
import * as fs from 'fs';

@Controller('wechat/public-account')
export class PublicAccountController {
  constructor(private readonly publicAccountService: PublicAccountService) {}
  @Get('test')
  async test(@Query() query: DTestDto): Promise<boolean | string> {
    const { signature, timestamp, nonce, echostr } = query;
    fs.writeFile('file.txt', JSON.stringify(query), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('The file was saved!');
    });
    if (!signature || !timestamp || !nonce) return false;
    const token = 'test';
    const tmpArr = [token, timestamp, nonce];
    tmpArr.sort();
    return echostr;
  }

  @Get('getfile')
  async fileGet(): Promise<string> {
    const result = fs.readFileSync('file.txt', 'utf-8');
    return result;
  }

  @Get('setfile')
  async fileSet(): Promise<void> {
    fs.writeFile('file.txt', 'hello world!', function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('The file was saved!');
    });
    return;
  }

  @Post('test')
  async testPost(@Req() req: Request, @Res() res: Response): Promise<void> {
    this.publicAccountService.getUserDataAsync(req, res);
    return;
  }
}
