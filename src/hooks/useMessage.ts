import { message } from "antd";
import { MessageType } from "antd/es/message/interface";
import { ReactNode, useEffect, useRef } from "react";

const useStatusMessage = ({
    isLoading,
    isError,
    messages,
}: {
    isLoading: boolean;
    isError: boolean;
    messages: {
        isLoading?: string | ReactNode;
        isError?: string | ReactNode;
    };
}): void => {

    const info = useRef<MessageType>();
    const [messageApi] = message.useMessage();

    useEffect(() => {
        const { isLoading: loadingMessage, isError: errorMessage } = messages;

        if (isError && !!errorMessage) {
            info.current = messageApi.error({
                content: errorMessage,
            });
            return;
        }

        if (isLoading && !!loadingMessage) {
            info.current = messageApi.loading({
                content: loadingMessage,
                duration: 0,
            });
            return;
        }

        if (!!info.current && !isLoading) info.current();

    }, [messageApi, isError, isLoading, messages]);
};

export default useStatusMessage;