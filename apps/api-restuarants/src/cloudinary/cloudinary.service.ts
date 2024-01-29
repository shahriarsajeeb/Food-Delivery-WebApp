import { Injectable } from "@nestjs/common";
import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from "cloudinary";

type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

@Injectable()
export class CloudinaryService {
  async upload(data: string): Promise<CloudinaryResponse> {
    try {
      const result = await cloudinary.uploader.upload(data, {
        folder: "Foods",
      });
      return result;
    } catch (error) {
      console.log(error)
      throw error;
    }
  }
}
