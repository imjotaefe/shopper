import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    setTimeout(async () => {
      await this.$connect();
    }, 6000);
  }

  async enableShutdownHooks(app: INestApplication) {
    const exitHandler = async () => {
      await app.close();
    };

    process.on('beforeExit', exitHandler);
  }
}
