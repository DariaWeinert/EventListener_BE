/// <reference types="multer" />
export declare class CloudinaryService {
    uploadFile(file: Express.Multer.File): Promise<string>;
}
