import { BadRequestException } from '@nestjs/common';

export const multerImageConfig = {
  limits: {
    fileSize: 10 * 1024 * 1024, // 10 MB
  },
  fileFilter: (req, file, callback) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return callback(new BadRequestException('Invalid file type'), false);
    }
    callback(null, true);
  },
};
