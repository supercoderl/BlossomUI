import React from 'react';
import { Modal, Button, Typography } from 'antd';
import { ExclamationCircleOutlined, CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';

const { Text } = Typography;

// Reusable Confirmation Modal Component
export const ConfirmationModal = ({
    open,
    onConfirm,
    onCancel,
    title = "Confirm Action",
    content = "Are you sure you want to proceed?",
    confirmText = "Confirm",
    cancelText = "Cancel",
    type = "warning", // warning, error, info, success
    loading = false,
    danger = false
}: {
    open: boolean,
    onConfirm: () => void,
    onCancel: () => void,
    title: string,
    content: string,
    confirmText: string,
    cancelText: string,
    type: "warning" | "error" | "info" | "success",
    loading: boolean,
    danger: boolean
}) => {
    const getIcon = () => {
        switch (type) {
            case 'error':
                return <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />;
            case 'success':
                return <CheckCircleOutlined style={{ color: '#52c41a' }} />;
            case 'info':
                return <ExclamationCircleOutlined style={{ color: '#1677ff' }} />;
            case 'warning':
            default:
                return <WarningOutlined style={{ color: '#faad14' }} />;
        }
    };

    return (
        <Modal
            title={
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {getIcon()}
                    <span>{title}</span>
                </div>
            }
            open={open}
            onCancel={onCancel}
            footer={[
                <Button key="cancel" onClick={onCancel}>
                    {cancelText}
                </Button>,
                <Button
                    key="confirm"
                    type="primary"
                    danger={danger}
                    loading={loading}
                    onClick={onConfirm}
                >
                    {confirmText}
                </Button>,
            ]}
            width={400}
            centered
        >
            <div style={{ padding: '16px 0' }}>
                <Text>{content}</Text>
            </div>
        </Modal>
    );
};