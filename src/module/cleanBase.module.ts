import { Module } from '@nestjs/common';
import { CleanDataBaseController } from 'src/controller/cleanBase.controller';

@Module({
  controllers: [CleanDataBaseController],
})
export class CleanBaseModule {}
