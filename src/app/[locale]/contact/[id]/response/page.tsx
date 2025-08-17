"use client";

import Layout from '@/components/Layout';
import LoadingBackground from '@/components/Loading';
import { useApiLoadingStore } from '@/stores/loadingStore';
import { Contact } from '@/types/contact';
import { Button } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getContactsByEmail, responseContact } from '../../api';
import { useGlobalMessage } from '@/providers/messageProvider';

export default function ContactTimeline() {
    const router = useRouter();
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [responseText, setResponseText] = useState('');
    const [respondingTo, setRespondingTo] = useState(null);
    const { loading } = useApiLoadingStore();
    const [messageApi] = useGlobalMessage();
    const { id } = useParams();
    const [pageQuery, setPageQuery] = useState({ page: 1, pageSize: 100 });

    const onLoad = async () => {
        await getContactsByEmail({
            ...pageQuery,
            includeResponses: true,
            email: atob(decodeURIComponent(id as string))
        }).then((res) => {
            if (res && res.data) {
                setContacts(res.data.items || []);
            }
        });
    }

    useEffect(() => {
        if (id) {
            onLoad();
        }
    }, [id]);

    const handleResponse = (messageId: any) => {
        setRespondingTo(messageId);
    };

    const handleSubmitResponse = async (messageId: any) => {
        if (responseText.trim()) {
            try {
                await responseContact({
                    contactId: messageId,
                    responseText
                }).then(() => {
                    setResponseText('');
                    setRespondingTo(null);
                    onLoad();
                })
            } catch (error: any) {
                if (error && error.response && error.response.data) {
                    const errors = error.response.data.errors;
                    if (errors && errors.length > 0) {
                        errors.forEach((error: any) => {
                            messageApi.error(error || 'Response failed');
                        })
                    }
                }
                else {
                    messageApi.error("Request failed, please try again later");
                }
            }
        }
    };

    const handleCancelResponse = () => {
        setResponseText('');
        setRespondingTo(null);
    };

    return (
        <Layout curActive={`/contact/1/response`}>
            <LoadingBackground loading={loading['get-contacts-by-email']}>
                {/* Header */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-pink-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            <img src='/dummy.webp' alt='avatar' />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{contacts.length > 0 ? contacts[0].name : 'N/A'}</h1>
                            <p className="text-gray-600">{contacts.length > 0 ? contacts[0].email : 'N/A'}</p>
                        </div>
                    </div>

                    <Button
                        type='link'
                        onClick={() => router.back()}
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        <span>Back to Contacts</span>
                    </Button>
                </div>

                {/* Messages Timeline */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Message Timeline</h2>

                    {contacts.length === 0 ? (
                        <div className="text-center py-12">
                            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-3.582 8-8 8a8.959 8.959 0 01-4.906-1.456L3 21l2.456-5.094A8.959 8.959 0 013 12c0-4.418 3.582-8 8-8s8 3.582 8 8z" />
                            </svg>
                            <p className="text-gray-500 text-lg">No messages yet</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {contacts.map((message) => (
                                <div key={message.id} className="border-l-4 border-blue-500 pl-6 pb-6">
                                    {/* Timestamp */}
                                    <div className="text-sm text-gray-500 mb-2">{new Date(message.createdAt).toLocaleDateString()}</div>

                                    {/* Sender Message */}
                                    <div className="bg-gray-50 rounded-lg p-4 mb-3">
                                        <div className="flex items-start space-x-3">
                                            <div className="w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                                <img src='/dummy.webp' alt='avatar' />
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-sm font-semibold text-gray-700 mb-1">{message.name}</div>
                                                <div className="text-gray-800">{message.message}</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Response or Response Button */}
                                    {message.hasResponse ? (
                                        <div className="bg-blue-50 rounded-lg p-4 ml-8">
                                            <div className="flex items-start space-x-3">
                                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                                    <img src={message.contactResponse?.responder?.avatarUrl || '/dummy.webp'} alt='responder avatar' />
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-sm font-semibold text-gray-700 mb-1">{message?.contactResponse?.responder?.firstName ?? "N/A"}</div>
                                                    <div className="text-gray-800">{message.contactResponse?.responseText}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="ml-8">
                                            {respondingTo === message.id ? (
                                                <div className="bg-blue-50 rounded-lg p-4">
                                                    <div className="mb-3">
                                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                            Write your response:
                                                        </label>
                                                        <textarea
                                                            value={responseText}
                                                            onChange={(e) => setResponseText(e.target.value)}
                                                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none outline-none"
                                                            rows={3}
                                                            placeholder="Type your response here..."
                                                        />
                                                    </div>
                                                    <div className="flex space-x-3">
                                                        <Button
                                                            type="primary"
                                                            onClick={() => handleSubmitResponse(message.id)}
                                                            className="font-medium"
                                                            loading={loading['response-contact']}
                                                            disabled={loading['response-contact']}
                                                        >
                                                            Submit Response
                                                        </Button>
                                                        <Button
                                                            type="default"
                                                            onClick={handleCancelResponse}
                                                            className="font-medium"
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <Button
                                                    type="primary"
                                                    onClick={() => handleResponse(message.id)}
                                                    className="font-medium flex items-center"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
                                                    </svg>
                                                    <span>Respond</span>
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </LoadingBackground>
        </Layout>
    );
}