import { Module } from '@nestjs/common';
import { PublicAccountController } from './public-account.controller';
import { PublicAccountService } from './public-account.service';

@Module({
  controllers: [PublicAccountController],
  providers: [PublicAccountService],
})
export class PublicAccountModule {}
