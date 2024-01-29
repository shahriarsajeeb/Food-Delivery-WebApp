import { ConfigOptions, v2 } from "cloudinary";
import { Provider } from "@nestjs/common";

const CloudinaryProvider: Provider = {
  provide: 'CLOUDINARY',
  useFactory: ():ConfigOptions => {
    return v2.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_API_SECRET,
    });
  },
};

export { CloudinaryProvider };
