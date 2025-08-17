import React, { useState, useCallback } from 'react';
import { Modal, Button, Space, message } from 'antd';
import { ScissorOutlined, RadiusSettingOutlined } from '@ant-design/icons';
import Cropper from 'react-easy-crop';
import type { Area } from 'react-easy-crop';
import { removeBackgroundAsync } from '@/app/[locale]/api/file/route';

interface ImageEditModalProps {
    visible: boolean;
    onCancel: () => void;
    onSave: (blob: Blob) => void;
    originalFile: File | null;
}

// Helper function to create image from URL
const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', (error) => reject(error));
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
    });

// Helper function to get cropped image
const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area,
    fileName: string
): Promise<File> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        throw new Error('Could not get canvas context');
    }

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                reject(new Error('Canvas is empty'));
                return;
            }
            const file = new File([blob], fileName, { type: 'image/jpeg' });
            resolve(file);
        }, 'image/jpeg', 0.9);
    });
};

// Helper function to remove background (simplified version using canvas manipulation)
const removeBackground = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    return await removeBackgroundAsync(formData);
};

const ImageEditModal: React.FC<ImageEditModalProps> = ({
    visible,
    onCancel,
    onSave,
    originalFile
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [currentMode, setCurrentMode] = useState<'crop' | 'remove-bg' | null>(null);
    const [imageSrc, setImageSrc] = useState<string>('');

    React.useEffect(() => {
        if (originalFile && visible) {
            const url = URL.createObjectURL(originalFile);
            setImageSrc(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [originalFile, visible]);

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const handleCrop = async () => {
        if (!originalFile || !croppedAreaPixels || !imageSrc) return;

        setIsProcessing(true);
        try {
            const croppedFile = await getCroppedImg(
                imageSrc,
                croppedAreaPixels,
                originalFile.name
            );
            onSave(croppedFile);
            message.success('Image cropped successfully');
        } catch (error) {
            console.error('Error cropping image:', error);
            message.error('Failed to crop image');
        } finally {
            setIsProcessing(false);
            setCurrentMode(null);
        }
    };

    const handleRemoveBackground = async () => {
        if (!originalFile) return;

        setIsProcessing(true);
        try {
            const result = await removeBackground(originalFile);
            if (result && result.status === 200) {
                const processedBlob = result.data;
                const processedFile = new File([processedBlob], 'processed.png', { type: 'image/png' });
                onSave(processedFile);
                message.success('Background removed successfully');
            }
        } catch (error) {
            console.error('Error removing background:', error);
            message.error('Failed to remove background');
        } finally {
            setIsProcessing(false);
            setCurrentMode(null);
        }
    };

    const handleModeSelect = (mode: 'crop' | 'remove-bg') => {
        setCurrentMode(mode);
    };

    const handleBack = () => {
        setCurrentMode(null);
    };

    const renderModeSelection = () => (
        <div className="text-center py-8">
            <h3 className="text-lg font-medium mb-6">Choose an editing option:</h3>
            <Space size="large">
                <Button
                    size="large"
                    icon={<RadiusSettingOutlined />}
                    onClick={() => handleModeSelect('crop')}
                    className="h-20 flex items-center justify-center"
                >
                    <div>Crop Image</div>
                </Button>
                <Button
                    size="large"
                    icon={<ScissorOutlined />}
                    onClick={() => handleModeSelect('remove-bg')}
                    className="h-20 flex items-center justify-center"
                >
                    <div>Remove Background</div>
                </Button>
            </Space>
        </div>
    );

    const renderCropMode = () => (
        <div>
            <div style={{ position: 'relative', width: '100%', height: '400px' }}>
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={1} // Square aspect ratio for avatar
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
            <div className="mt-4">
                <label className="block text-sm font-medium mb-2">Zoom:</label>
                <input
                    type="range"
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    onChange={(e) => setZoom(Number(e.target.value))}
                    className="w-full"
                />
            </div>
        </div>
    );

    const renderRemoveBackgroundMode = () => (
        <div className="text-center py-8">
            {imageSrc && (
                <div className="mb-6">
                    <img
                        src={imageSrc}
                        alt="Preview"
                        className="max-w-full max-h-64 mx-auto rounded-lg"
                    />
                </div>
            )}
            <p className="text-gray-600 mb-4">
                This will remove the background from your image. The process may take a few seconds.
            </p>
        </div>
    );

    const getModalFooter = () => {
        if (!currentMode) {
            return [
                <Space>
                    <Button key="cancel" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button key="skip" onClick={() => {
                        if(originalFile) onSave(originalFile)
                    }}>
                        Skip
                    </Button>
                </Space>
            ];
        }

        return [
            <Button key="back" onClick={handleBack}>
                Back
            </Button>,
            <Button key="cancel" onClick={() => {
                onCancel();
                setCurrentMode(null);
            }}>
                Cancel
            </Button>,
            <Button
                key="apply"
                type="primary"
                loading={isProcessing}
                onClick={currentMode === 'crop' ? handleCrop : handleRemoveBackground}
            >
                Apply {currentMode === 'crop' ? 'Crop' : 'Remove Background'}
            </Button>
        ];
    };

    return (
        <Modal
            title="Edit Image"
            open={visible}
            onCancel={() => {
                onCancel();
                setCurrentMode(null);
            }}
            footer={getModalFooter()}
            width={600}
            destroyOnClose
        >
            {!currentMode && renderModeSelection()}
            {currentMode === 'crop' && renderCropMode()}
            {currentMode === 'remove-bg' && renderRemoveBackgroundMode()}
        </Modal>
    );
};

export default ImageEditModal;