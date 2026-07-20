import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class ImageService {
  async uploadImage(file: any) {
    // const { path } = file;
    const uploadedImage = await cloudinary.uploader.upload(file.buffer.toString('base64'));
    return { data: uploadedImage.secure_url };
  }
}
