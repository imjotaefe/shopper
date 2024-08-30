import { Module } from '@nestjs/common';
import { MeasureService } from './measure.service';
import { MeasureController } from './measure.controller';
import { PrismaService } from '../../database/prisma.service';
import { MeasureRepository } from './measure.repository';

@Module({
  controllers: [MeasureController],
  providers: [MeasureService, MeasureRepository, PrismaService],
})
export class MeasureModule {}
