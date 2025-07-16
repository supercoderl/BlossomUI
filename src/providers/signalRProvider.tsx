"use client"

import React, { createContext, useContext, useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { SignalRContextType } from '@/types/signalR';
import { getTokenCookie } from '@/utils/cookie';

const SignalRContext = createContext<SignalRContextType | null>(null);

export const useSignalRContext = () => {
  const context = useContext(SignalRContext);
  if (!context) {
    throw new Error('useSignalRContext must be used within a SignalRProvider');
  }
  return context;
};

interface SignalRProviderProps {
  children: React.ReactNode;
}

export const SignalRProvider: React.FC<SignalRProviderProps> = ({ children }) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const t = await getTokenCookie();
      const value = t?.value ?? null;
      setToken(prev => (prev !== value ? value : prev));
    };

    checkToken();
    const interval = setInterval(checkToken, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!token) return;

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${process.env.NEXT_PUBLIC_BASE_API_URL}/trackerHub`, {
        accessTokenFactory: () => token,
        withCredentials: true,
      })
      .withAutomaticReconnect()
      .build();

    const startConnection = async () => {
      try {
        await newConnection.start();
        setIsConnected(true);
        console.log("✅ SignalR connected");
      } catch (err) {
        console.error("❌ SignalR connection failed:", err);
      }
    };

    newConnection.onclose(() => setIsConnected(false));
    newConnection.onreconnecting(() => setIsConnected(false));
    newConnection.onreconnected(() => setIsConnected(true));

    setConnection(newConnection);
    startConnection();

    return () => {
      newConnection.stop();
    };
  }, [token]);

  const joinServiceGroup = async (serviceId: string) => {
    if (connection && isConnected) {
      await connection.invoke('JoinServiceGroup', serviceId);
    }
  };

  const leaveServiceGroup = async (serviceId: string) => {
    if (connection && isConnected) {
      await connection.invoke('LeaveServiceGroup', serviceId);
    }
  };

  return (
    <SignalRContext.Provider value={{
      connection,
      isConnected,
      joinServiceGroup,
      leaveServiceGroup
    }}>
      {children}
    </SignalRContext.Provider>
  );
};