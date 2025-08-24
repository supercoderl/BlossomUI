"use client"

import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import * as signalR from '@microsoft/signalr';
import { SignalRContextType } from '@/types/signalR';
import { UserCookieInfo } from '@/types/user';
import { UserRoles } from '@/enums/userRoles';
import { Gender } from '@/enums/gender';
import { UserStatus } from '@/enums/userStatus';
import { useUserContext } from './userProvider';

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
  forceGuestMode?: boolean; // Optional prop to force guest mode
}

export const SignalRProvider: React.FC<SignalRProviderProps> = ({
  children,
  forceGuestMode = false
}) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [isGuest, setIsGuest] = useState(false);
  const { isAuthenticated, setUserInfo } = useUserContext();

  // Use ref to track if component is mounted
  const isMountedRef = useRef(true);
  const currentConnectionRef = useRef<signalR.HubConnection | null>(null);

  // Function to disconnect current connection
  const disconnectCurrent = async () => {
    if (currentConnectionRef.current) {
      try {
        await currentConnectionRef.current.stop();
      } catch (error) {
        console.error('Error stopping connection:', error);
      }
      currentConnectionRef.current = null;
      setConnection(null);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    isMountedRef.current = true;
    const initializeConnection = async () => {
      // First, disconnect any existing connection
      await disconnectCurrent();

      setIsConnecting(true);

      const shouldConnectAsGuest = forceGuestMode || !isAuthenticated;
      setIsGuest(shouldConnectAsGuest);

      // Build connection URL
      let hubUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/trackerHub`;
      const connectionOptions: signalR.IHttpConnectionOptions = {
        withCredentials: !shouldConnectAsGuest,
      };

      if (shouldConnectAsGuest) {
        hubUrl += '?isGuest=true';
        connectionOptions.withCredentials = false;
      }

      const createAndStartConnection = async (url: string, options: signalR.IHttpConnectionOptions, isGuestMode: boolean) => {
        const newConnection = new signalR.HubConnectionBuilder()
          .withUrl(url, options)
          .withAutomaticReconnect()
          .build();

        // Setup event handlers
        const handleProfileInfo = (data?: UserCookieInfo | null) => {
          if (!isMountedRef.current) return;

          if (data) {
            setUserInfo(data);
            if (!isGuestMode && data.role === UserRoles.Admin) {
              newConnection.invoke("JoinGroup", "administrators").catch(console.error);
              console.log("joined admin group");
            }
          } else if (isGuestMode) {
            const guestInfo: UserCookieInfo = {
              id: `guest-${Date.now()}`,
              firstName: 'Guest User',
              lastName: '',
              email: '',
              role: UserRoles.Guest,
              phoneNumber: '',
              avatarUrl: '',
              connectionId: '',
              dateOfBirth: '',
              device: '',
              gender: Gender.Unknow,
              status: UserStatus.Active
            };
            setUserInfo(guestInfo);
          }
        };

        const handleUserOnline = (userId: string) => {
          if (!isMountedRef.current) return;
          setOnlineUsers(prev => prev.some(x => x === userId) ? prev : ([...prev, userId]));
        };

        const handleUserOffline = (userId: string) => {
          if (!isMountedRef.current) return;
          setOnlineUsers(prev => prev.filter(x => x !== userId));
        };

        const handleConnectionClose = () => {
          if (!isMountedRef.current) return;
          setIsConnected(false);
        };

        const handleReconnecting = () => {
          if (!isMountedRef.current) return;
          setIsConnected(false);
          setIsConnecting(true);
        };

        const handleReconnected = () => {
          if (!isMountedRef.current) return;
          setIsConnected(true);
          setIsConnecting(false);
        };

        const handleError = (error: string) => {
          console.error('SignalR Error:', error);
        };

        // Register event handlers
        newConnection.on("getProfileInfo", handleProfileInfo);
        newConnection.on('userOnline', handleUserOnline);
        newConnection.on('userOffline', handleUserOffline);
        newConnection.onclose(handleConnectionClose);
        newConnection.onreconnecting(handleReconnecting);
        newConnection.onreconnected(handleReconnected);
        newConnection.on('onError', handleError);

        try {
          await newConnection.start();
          if (!isMountedRef.current) {
            await newConnection.stop();
            return null;
          }
          setIsConnected(true);
          console.log(`✅ SignalR connected as ${isGuestMode ? 'Guest' : 'Authenticated User'}`);
          return newConnection;
        } catch (error) {
          console.error(`❌ SignalR connection failed as ${isGuestMode ? 'Guest' : 'Authenticated User'}:`, error);
          throw error;
        }
      };

      try {
        const newConnection = await createAndStartConnection(hubUrl, connectionOptions, shouldConnectAsGuest);
        if (newConnection && isMountedRef.current) {
          currentConnectionRef.current = newConnection;
          setConnection(newConnection);
        }
      } catch (err) {
        if (!shouldConnectAsGuest && isMountedRef.current) {
          console.log("🔄 Retrying as guest...");
          try {
            setIsGuest(true);
            const guestConnection = await createAndStartConnection(
              `${process.env.NEXT_PUBLIC_BASE_API_URL}/trackerHub?isGuest=true`,
              { withCredentials: false },
              true
            );
            if (guestConnection && isMountedRef.current) {
              currentConnectionRef.current = guestConnection;
              setConnection(guestConnection);
              console.log("✅ SignalR connected as Guest (fallback)");
            }
          } catch (guestErr) {
            console.error("❌ Guest connection also failed:", guestErr);
          }
        } else if (shouldConnectAsGuest) {
          console.error("❌ Guest connection failed:", err);
        }
      } finally {
        if (isMountedRef.current) {
          setIsConnecting(false);
        }
      }
    };

    initializeConnection();

    return () => {
      isMountedRef.current = false;
      if (currentConnectionRef.current) {
        currentConnectionRef.current.stop().catch(console.error);
        currentConnectionRef.current = null;
      }
    };
  }, [forceGuestMode, isAuthenticated, setUserInfo]); // Added missing dependencies

  const joinServiceGroup = async (serviceId: string) => {
    if (connection && isConnected) {
      try {
        await connection.invoke('JoinGroup', serviceId);
      } catch (error) {
        console.error('Failed to join service group:', error);
      }
    }
  };

  const leaveServiceGroup = async (serviceId: string) => {
    if (connection && isConnected) {
      try {
        await connection.invoke('LeaveGroup', serviceId);
      } catch (error) {
        console.error('Failed to leave service group:', error);
      }
    }
  };

  // Expose a method to manually reconnect (useful for logout)
  const reconnect = async () => {
    await disconnectCurrent();
    // The useEffect will handle reconnection when dependencies change
  };

  return (
    <SignalRContext.Provider value={{
      connection,
      isConnected,
      isConnecting,
      isGuest,
      joinServiceGroup,
      leaveServiceGroup,
      onlineUsers,
      reconnect
    }}>
      {children}
    </SignalRContext.Provider>
  );
};