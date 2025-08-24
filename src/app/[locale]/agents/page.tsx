'use client';
import { Button, Popconfirm, Tooltip } from 'antd';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { ChatMessage, ProChat } from '@ant-design/pro-chat';
import {
    PaperClipOutlined,
    SmileOutlined,
    PictureOutlined,
    AudioOutlined,
    MoreOutlined,
    PlusOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { deleteConversation, findConversationId, getAllMessageFromConversation, sendMessage } from './api';
import { useSignalRContext } from '@/providers/signalRProvider';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { MessageType } from '@/enums/messageType';
import { useUserContext } from '@/providers/userProvider';

interface ChatItem {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    timestamp: string;
    isOnline: boolean;
    unreadCount: number;
    isPinned?: boolean;
}

// Create a separate component that uses useProChat hook
function MessengerChatContent() {
    const [showComponent, setShowComponent] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const { isConnected, connection } = useSignalRContext();
    const { userInfo } = useUserContext();
    const [pageQuery, setPageQuery] = useState({ page: 1, pageSize: 10 });
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [includeDeleted, setIncludeDeleted] = useState<boolean>(false);
    const [conversationId, setConversationId] = useState<string | null>(null);
    const [selectedUser, setSelectedUser] = useState<string>('');
    const { loading } = useApiLoadingStore();
    const [chatList, setChatList] = useState<ChatItem[]>([
        {
            id: '98f7750d-655a-4724-812f-50b4ab64012d',
            name: 'AI Smart Assistant',
            avatar: 'https://avatars.githubusercontent.com/u/6422482?v=4',
            lastMessage: 'Hello! How can I help you today?',
            timestamp: 'now',
            isOnline: true,
            unreadCount: 0,
            isPinned: true
        }
    ]);
    const [chats, setChats] = useState<ChatMessage<Record<string, any>>[]>([]);

    const handleChatSelect = async (recipientId: string) => {
        setSelectedUser(recipientId);
        setShowComponent(true);

        await findConversationId(recipientId).then(async (res: any) => {
            if (res.data) {
                setConversationId(res.data);
                await getAllMessageFromConversation({
                    query: { ...pageQuery },
                    searchTerm,
                    includeDeleted,
                    conversationId: res.data
                }).then((res: any) => {
                    if (res.data && res.data.items && res.data.items.length > 0) {
                        setChats(res.data.items.map((message: any) => ({
                            id: message.id,
                            content: message.messageText,
                            role: message.role,
                            createAt: new Date(message.createdAt).getTime(),
                            updateAt: message.lastUpdatedAt ? new Date(message.lastUpdatedAt).getTime() : Date.now()
                        })));
                    }
                })
            }
        })
    };

    const addNewUserChat = (userName: string) => {
        const newChat: ChatItem = {
            id: `user-${Date.now()}`,
            name: userName,
            avatar: '👤',
            lastMessage: 'New conversation started',
            timestamp: 'now',
            isOnline: true,
            unreadCount: 0
        };

        setChatList(prev => [...prev, newChat]);
        setSelectedUser(newChat.id);
    };

    const sortedChatList = [...chatList].sort((a, b) => {
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return 0;
    });

    const handleDeleteConversation = async () => {
        if (conversationId) {
            await deleteConversation(undefined, conversationId).then(() => {
                setChats(selectedUser === '98f7750d-655a-4724-812f-50b4ab64012d' ? [{
                    id: `bot-${Date.now()}`,
                    content: "Hello, how can i assist you today?",
                    role: "assistant",
                    createAt: Date.now(),
                    updateAt: Date.now()
                }] : []);
                setIsDeleting(false);
            })
        }
    }

    useEffect(() => {
        if (!isConnected || !connection || !conversationId) return;

        const connectSignalR = async () => {
            if (connection.state === "Disconnected") {
                await connection.start();
            }
            await connection.invoke("JoinGroup", conversationId);
        };

        connectSignalR();

        connection.on("receiveData", (payload) => {
            if (payload.type === "system") {
                const data = payload.data;
                setChats(prev => [
                    ...prev,
                    {
                        id: data.messageId,
                        content: data.message,
                        role: 'assistant',
                        createAt: Date.now(),
                        updateAt: Date.now()
                    }
                ]);
            }
        });

        return () => {
            connection.off("joinedGroup");
        };
    }, [conversationId, isConnected, connection]);

    const selectedChatData = chatList.find(chat => chat.id === selectedUser);

    return (
        <div className="flex min-h-[calc(100vh-120px)] rounded-lg overflow-hidden shadow-lg">
            {/* Chat List Sidebar */}
            <div className="w-80 border-r border-gray-200 flex flex-col">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-800">Messages</h2>
                    <button
                        className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-bold transition-all duration-200 hover:scale-105"
                        onClick={() => addNewUserChat(`User ${Date.now()}`)}
                    >
                        <PlusOutlined />
                    </button>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    {sortedChatList.map((chat) => (
                        <div
                            key={chat.id}
                            className={`
                                flex items-center p-3 cursor-pointer border-b border-gray-100 transition-all duration-200 relative
                                ${selectedUser === chat.id ?
                                    'bg-blue-50 border-r-4 border-r-blue-500' :
                                    'hover:bg-gray-50'
                                }
                                ${chat.isPinned ? 'bg-amber-50 border-l-4 border-l-amber-400' : ''}
                                ${chat.isPinned && selectedUser === chat.id ? 'bg-blue-50 border-l-4 border-l-amber-400 border-r-4 border-r-blue-500' : ''}
                            `}
                            onClick={() => handleChatSelect(chat.id)}
                        >
                            {/* Avatar */}
                            <div className="relative mr-3">
                                <div className="w-12 h-12 rounded-full bg-gray-100 border-2 border-gray-200 flex items-center justify-center text-2xl p-2">
                                    <img src={chat.avatar} alt='' />
                                </div>
                                {chat.isOnline && (
                                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                                )}
                                {chat.isPinned && (
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full flex items-center justify-center text-xs shadow-md">
                                        📌
                                    </div>
                                )}
                            </div>

                            {/* Chat Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <span className="font-medium text-sm text-gray-800 truncate">
                                        {chat.name}
                                    </span>
                                    {chat.unreadCount > 0 && (
                                        <span className="bg-red-500 text-white text-[10px] rounded-full px-1.5 py-0.5 text-center">
                                            {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                                        </span>
                                    )}
                                </div>
                                <p className="text-xs text-gray-600 truncate">
                                    {chat.lastMessage}
                                </p>
                            </div>

                            {/* Timestamp */}
                            <div className="text-xs text-gray-400 ml-2 flex-shrink-0">
                                {chat.timestamp}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 bg-white flex flex-col">
                {showComponent && selectedChatData && (
                    <ProChat
                        className="h-full border-none"
                        locale='en-US'
                        loading={loading['find-conversation-id'] || loading['get-messages-from-conversation']}
                        helloMessage=""
                        chats={chats}
                        actions={{
                            render: () => {
                                return [
                                    <Tooltip title="Attach file" key="attach">
                                        <Button
                                            type="text"
                                            shape="circle"
                                            icon={<PaperClipOutlined />}
                                            onClick={() => {
                                                // Handle file attachment
                                                console.log('Attach file');
                                            }}
                                            className="hover:bg-gray-100"
                                        />
                                    </Tooltip>,
                                    <Tooltip title="Add emoji" key="emoji">
                                        <Button
                                            type="text"
                                            shape="circle"
                                            icon={<SmileOutlined />}
                                            onClick={() => {
                                                // Handle emoji picker
                                                console.log('Open emoji picker');
                                            }}
                                            className="hover:bg-gray-100"
                                        />
                                    </Tooltip>,
                                    <Tooltip title="Upload image" key="image">
                                        <Button
                                            type="text"
                                            shape="circle"
                                            icon={<PictureOutlined />}
                                            onClick={() => {
                                                // Handle image upload
                                                console.log('Upload image');
                                            }}
                                            className="hover:bg-gray-100"
                                        />
                                    </Tooltip>,
                                    <Tooltip title="Voice message" key="voice">
                                        <Button
                                            type="text"
                                            shape="circle"
                                            icon={<AudioOutlined />}
                                            onClick={() => {
                                                // Handle voice message
                                                console.log('Record voice message');
                                            }}
                                            className="hover:bg-gray-100"
                                        />
                                    </Tooltip>,
                                    <Tooltip title="More options" key="more">
                                        <Button
                                            type="text"
                                            shape="circle"
                                            icon={<MoreOutlined />}
                                            onClick={() => {
                                                // Handle more options
                                                console.log('More options');
                                            }}
                                            className="hover:bg-gray-100"
                                        />
                                    </Tooltip>,
                                    <Popconfirm
                                        title="Delete chat"
                                        description="Are you sure you want to delete this conversation?"
                                        open={isDeleting}
                                        onConfirm={handleDeleteConversation}
                                        okButtonProps={{ loading: loading['delete-conversation'] }}
                                        onCancel={() => setIsDeleting(false)}
                                    >
                                        <Tooltip title="Delete chat" key="more">
                                            <Button
                                                type="text"
                                                shape="circle"
                                                icon={<DeleteOutlined />}
                                                onClick={() => setIsDeleting(true)}
                                                className="hover:bg-gray-100"
                                            />
                                        </Tooltip>
                                    </Popconfirm>,
                                ];
                            },
                            flexConfig: {
                                gap: 24,
                                direction: 'horizontal',
                                justify: 'start',
                            },
                        }}
                        showTitle
                        assistantMeta={{
                            avatar: selectedChatData.avatar,
                            title: selectedChatData.name
                        }}
                        userMeta={{
                            avatar: userInfo?.avatarUrl || '👤',
                            title: userInfo?.firstName + ' ' + userInfo?.lastName
                        }}
                        request={async (messages: any) => {
                            const lastMessage = messages[messages.length - 1];
                            const newUserMessage: ChatMessage = {
                                id: `user-${Date.now()}`,
                                content: lastMessage.content || lastMessage.message,
                                role: 'user',
                                createAt: Date.now(),
                                updateAt: Date.now(),
                            };

                            await sendMessage({
                                recipientId: selectedUser,
                                conversationId,
                                messageText: messages[messages.length - 1].content || messages[messages.length - 1].message,
                                messageType: MessageType.Text
                            });

                            setChats(prev => [...prev, newUserMessage]);
                        }}
                    />
                )}
            </div>
        </div>
    );
}

// Main component wrapped with ProChatProvider
export default function MessengerChatList() {
    return (
        <Layout curActive="/messenger">
            <MessengerChatContent />
        </Layout>
    );
}