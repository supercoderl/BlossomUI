import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import Lottie from 'lottie-react';

interface LoadingBackgroundProps {
    loading: boolean;
    children: React.ReactNode;
    text?: string;
    delay?: number;
}

const LoadingBackground: React.FC<LoadingBackgroundProps> = ({
    loading,
    children,
    text = "Wait a minute...",
}) => {
    return (
        <>
            {loading && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        width: '100vw',
                        height: '100vh',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 9999,
                        backdropFilter: 'blur(4px)',
                    }}
                >
                    <Lottie
                        animationData={require('../../../public/animations/loading.json')}
                        loop
                        className="w-1/3 h-1/3"
                    />
                    <div
                        style={{
                            fontSize: '24px',
                            color: '#666',
                            fontWeight: 500,
                        }}
                    >
                        {text}
                    </div>
                </div>
            )}
            <div style={{ opacity: loading ? 0.3 : 1, transition: 'opacity 0.3s ease' }}>
                {children}
            </div>
        </>
    );
};

export default LoadingBackground;