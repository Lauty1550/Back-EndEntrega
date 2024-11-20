import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from 'src/controller/user.controller';
import { User, UserSchema } from 'src/schema/user.schema';
import { OrganizacionService } from 'src/service/organizacion.service';
import { userService } from 'src/service/user.service';
import { OrganizacionModule } from './organizacion.module';
import { ValidationService } from 'src/service/validation.service';
import { ValidationModule } from './validation.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    OrganizacionModule,
    ValidationModule,
  ],
  controllers: [UserController],
  providers: [userService],
})
export class UserModule {}
