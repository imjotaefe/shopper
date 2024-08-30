import { Module } from '@nestjs/common';
import { MeasureModule } from './modules/measure/measure.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [MeasureModule, ConfigModule.forRoot()],
})
export class AppModule {}
