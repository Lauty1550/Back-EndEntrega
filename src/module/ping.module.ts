import { Module } from '@nestjs/common';
import { PingController } from 'src/controller/ping.controller';

@Module({
  controllers: [PingController],
})
export class PingModule {}
