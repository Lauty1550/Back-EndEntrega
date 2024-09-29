import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormaController } from 'src/controller/forma.controller';
import { FormaService } from 'src/service/forma.service';
import { Forma, FormaSchema } from 'src/schema/forma.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Forma.name, schema: FormaSchema }]),
  ],
  controllers: [FormaController],
  providers: [FormaService],
})
export class FormaModule {}
