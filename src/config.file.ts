import { BadRequestException } from '@nestjs/common';
import { memoryStorage } from 'multer';

export const multerConfig = {
  storage: memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // Límite de MB
  },
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      return callback(
        new BadRequestException('Tipo de archivo no permitido'),
        false,
      );
    }

    callback(null, true);
  },
};
