import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FlowGaugeModule } from './modules/flow-gauge/flow-gauge.module';

@Module({
  imports: [FlowGaugeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
