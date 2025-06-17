import { useGlobalMessage } from "@/providers/messageProvider";
import { Modal, Upload } from "antd";
import {
    PlusOutlined
} from '@ant-design/icons';
import { useApiLoadingStore } from "@/stores/loadingStore";
import { createServiceImage } from "../gallery/api";
import Lottie from "lottie-react";

const UploadImageForm = ({ id, onClose }: { id: string, onClose: () => void }) => {
    const [messageApi] = useGlobalMessage();
    const { loading } = useApiLoadingStore();

    // API upload function
    const uploadToAPI = async (file: File) => {
        const formData = new FormData();
        formData.append('imageFile', file);
        formData.append('serviceId', id);
        formData.append('description', `File at ${new Date().toISOString()}`);

        await createServiceImage(formData);
    };

    const handleUpload = async (info: any) => {
        if (info.file.status === 'done') {
            messageApi.success('Image uploaded successfully!');
        }

        if (info.file.status === 'error') {
            messageApi.error('Upload failed!');
        }
    };

    // Custom request handler
    const customRequest = async ({ file, onSuccess, onError, onProgress }: any) => {
        try {
            // Track upload progress if your API supports it
            onProgress({ percent: 50 });

            const result = await uploadToAPI(file as File);

            onProgress({ percent: 100 });
            onSuccess(result);
        } catch (error) {
            console.error('Upload error:', error);
            onError(error);
        }
    };

    return (
        <Modal
            title="Upload Images"
            open={id !== ''}
            onCancel={onClose}
            footer={null}
        >
            <Upload.Dragger
                name="files"
                multiple
                accept="image/*"
                customRequest={customRequest}
                onChange={handleUpload}
                showUploadList={true} // Show upload progress
                disabled={loading['create-service-image']}
            >
                {loading['create-service-image'] ? (
                    <Lottie
                        animationData={require("../../../../../public/animations/loading.json")}
                        loop
                        className="w-1/2 h-1/2 mx-auto"
                    />
                ) : (
                    <>
                        <p className="ant-upload-drag-icon">
                            <PlusOutlined style={{ fontSize: '48px', color: '#1890ff' }} />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag images to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                            Support for single or bulk upload. Accepts JPG, PNG, GIF, WebP formats.
                        </p>
                    </>
                )}
            </Upload.Dragger>
        </Modal>
    );
};

export default UploadImageForm;