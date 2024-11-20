import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormaController } from 'src/controller/forma.controller';
import { FormaService } from 'src/service/forma.service';
import { Forma, FormaSchema } from 'src/schema/forma.schema';
import { ValidationModule } from './validation.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Forma.name, schema: FormaSchema }]),
    ValidationModule,
  ],
  controllers: [FormaController],
  providers: [FormaService],
})
export class FormaModule {}
