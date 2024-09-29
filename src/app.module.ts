import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizacionModule } from './module/organizacion.module';
import { FormaModule } from './module/forma.module';
import { ProyectoModule } from './module/proyecto.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://lauty:qazpoeazClewa8W3@ingenieria.jwq3s.mongodb.net/EntregaBackEnd?retryWrites=true&w=majority&appName=Ingenieria',
    ),
    OrganizacionModule,
    FormaModule,
    ProyectoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
