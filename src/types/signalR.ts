export interface SignalRContextType {
    connection: signalR.HubConnection | null;
    isConnected: boolean;
    isConnecting: boolean;
    onlineUsers: string[];
    isGuest: boolean;
    joinServiceGroup: (serviceId: string) => Promise<void>;
    leaveServiceGroup: (serviceId: string) => Promise<void>;
    reconnect: () => Promise<void>;
}