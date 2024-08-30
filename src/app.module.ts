import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MeasureModule } from './modules/measure/measure.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MeasureModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
