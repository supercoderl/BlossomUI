import { Input, Modal } from "antd";
import { MessageInstance } from "antd/es/message/interface";
import { useEffect, useState } from "react";
import { updateServiceImage } from "./api";
import { GalleryImage } from "@/types/image";

const { TextArea } = Input;

type EditFormData = {
    serviceImageId: string;
    imageName: string;
    description?: string | null;
};

const EditServiceImageForm = ({ isOpen, onClose, messageApi, currentEditImage, onReload, loading }: {
    isOpen: boolean,
    onClose: () => void,
    messageApi: MessageInstance,
    currentEditImage: GalleryImage | null,
    onReload: () => void,
    loading: Record<string, boolean>
}) => {
    const [formData, setFormData] = useState<EditFormData>({
        serviceImageId: '',
        imageName: '',
        description: null
    });

    const handleEditSubmit = async (values: any) => {
        if (!currentEditImage) return;
        await updateServiceImage(values).then((res: any) => {
            if (res && res.success) {
                onClose();
                onReload();
                messageApi.success('Image updated successfully!');
            }
        })
    };

    useEffect(() => {
        if (currentEditImage) {
            setFormData(prev => ({
                serviceImageId: currentEditImage.id,
                imageName: currentEditImage.imageName,
                description: currentEditImage.description
            }));
        }
    }, [currentEditImage]);

    return (
        <Modal
            title="Edit Image"
            open={isOpen}
            onCancel={onClose}
            okButtonProps={{
                loading: loading['update-service-image']
            }}
            onOk={() => {
                if (!formData.imageName) {
                    messageApi.error('Please fill in required fields');
                    return;
                }
                handleEditSubmit(formData);
            }}
        >
            <div>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                        Name *
                    </label>
                    <Input
                        value={formData.imageName || ''}
                        onChange={(e) => setFormData(prev => ({ ...prev, imageName: e.target.value }))}
                    />
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                        Description
                    </label>
                    <TextArea
                        value={formData.description || ''}
                        rows={5}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default EditServiceImageForm;