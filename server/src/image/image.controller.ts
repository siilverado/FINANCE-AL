import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { v2 as cloudinary } from 'cloudinary';

import Multer from 'multer';
import { Response } from 'express';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 1024 * 1024 * 20 }, // permitir archivos de hasta 20 MB
    }),
  )
  async uploadImage(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
    const buffer = file.buffer;
    cloudinary.uploader
      .upload_stream({ resource_type: 'auto', folder: 'images' }, async (error, resolve) => {
        if (error) {
          console.log(error);
          return res.status(500).send(error);
        }
        return res.send(resolve.url);
      })
      .end(buffer);
  }
}
