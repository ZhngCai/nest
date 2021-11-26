import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config/config.service';
import { PublicAccountController } from './modules/public-account/public-account.controller';
import { PublicAccountModule } from './modules/public-account/public-account.module';
import { PublicAccountService } from './modules/public-account/public-account.service';

@Module({
  imports: [PublicAccountModule],
  controllers: [AppController, PublicAccountController],
  providers: [AppService, ConfigService, PublicAccountService],
})
export class AppModule {}
