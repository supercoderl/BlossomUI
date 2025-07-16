export interface SignalRContextType {
    connection: signalR.HubConnection | null;
    isConnected: boolean;
    joinServiceGroup: (serviceId: string) => Promise<void>;
    leaveServiceGroup: (serviceId: string) => Promise<void>;
}