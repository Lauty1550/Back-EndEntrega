import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrganizacionModule } from './module/organizacion.module';
import { FormaModule } from './module/forma.module';
import { ProyectoModule } from './module/proyecto.module';
import { PlanoModule } from './module/plano.module';
import { UserModule } from './module/user.module';
import { FileModule } from './module/file.module';
import { PingModule } from './module/ping.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(
      process.env.NODE_ENV === 'start:test'
        ? process.env.MONGO_URL_TEST
        : process.env.MONGO_URL,
    ),
    OrganizacionModule,
    FormaModule,
    ProyectoModule,
    PlanoModule,
    UserModule,
    FileModule,
    PingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
