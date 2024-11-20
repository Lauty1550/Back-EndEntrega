import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizacionController } from 'src/controller/organizacion.controller';
import { OrganizacionService } from 'src/service/organizacion.service';
import {
  Organizacion,
  OrganizacionSchema,
} from 'src/schema/organizacion.schema';
import { ValidationModule } from './validation.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Organizacion.name, schema: OrganizacionSchema },
    ]),
    ValidationModule,
  ],
  controllers: [OrganizacionController],
  providers: [OrganizacionService],
  exports: [OrganizacionService, MongooseModule],
})
export class OrganizacionModule {}
