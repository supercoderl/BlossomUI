import { Filter } from '@/types/filter';
import { withApiLoading } from '@/utils/helpers';
import req from '@/utils/req';

export const ai2Text = (text: string) => req.post('/ai/text', { text });

export const ai2Img = (text: string) => req.post('/ai/image', { text });

export const findConversationId = (recipientId: string) =>
    withApiLoading('find-conversation-id', () =>
        req.get('/Message/conversation', {
            params: { recipientId }
        }));

export const sendMessage = (data: any) =>
    withApiLoading('send-message', () =>
        req.post('/Message', data));

export const getAllMessageFromConversation = (filter: Filter) =>
    withApiLoading('get-messages-from-conversation', () =>
        req.get('/Message', {
            params: {
                query: filter.query,
                searchTerm: filter.searchTerm,
                includeDeleted: filter.includeDeleted,
                conversationId: filter.conversationId
            }
        }));

export const deleteConversation = (messageId?: string, conversationId?: string) =>
    withApiLoading('delete-conversation', () =>
        req.delete('/Message', {
            params: {
                id: messageId,
                conversationId
            }
        }));