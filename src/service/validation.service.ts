import { Injectable, BadRequestException } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ValidationService {
  validateObjectId(id: string) {
    if (!isValidObjectId(id)) {
      throw new BadRequestException(`El ID ${id} no es válido`);
    }
    return true;
  }
}
