export interface GalleryImage {
    id: string;
    imageName: string;
    imageUrl: string;
    description: string;
    createdAt: string;
    serviceName: string;
};

export interface UploadProgress {
    serviceId: string;
    progress: number;
    currentFile: number;
    totalFiles: number;
    currentFileName: string;
}

export interface UploadCompleted {
    serviceId: string;
    message: string;
}