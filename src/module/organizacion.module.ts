import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizacionController } from 'src/controller/organizacion.controller';
import { OrganizacionService } from 'src/service/organizacion.service';
import {
  Organizacion,
  OrganizacionSchema,
} from 'src/schema/organizacion.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organizacion.name, schema: OrganizacionSchema },
    ]),
  ],
  controllers: [OrganizacionController],
  providers: [OrganizacionService],
})
export class OrganizacionModule {}
