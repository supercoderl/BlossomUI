import { NotificationType } from "@/enums/notificationType";

export interface Notification {
    notificationId: string;
    userId: string;
    title: string;
    message: string;
    isRead: boolean;
    notificationType: NotificationType;
    priority: number;
    actionUrl?: string | null;
    relatedEntityId?: string | null;
    createdAt: Date;
}