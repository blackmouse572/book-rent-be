import { v2 as cloudinary } from 'cloudinary';

export const CloudinaryProvider = {
    provide: 'CLOUDINARY',
    useFactory: () => {
        return cloudinary.config({
            cloud_name: 'dvzcpzqiw',
            api_key: '913793345811299',
            api_secret: 'Z9tKEPFtIp57Y2YtkPtMrhso718',
        });
    },
};
