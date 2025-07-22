import { Client, Message, Stomp, StompSubscription } from "@stomp/stompjs";
import { useCallback, useEffect, useRef } from "react";
import SockJS from "sockjs-client";


type UseWebSocketOptions = {
    onConnect?: () => void;
    onMessage?: (data: any) => void;
    onDisconnect?: () => void;
    onError?: (err: any) => void;
    autoReconnect?: boolean;
    reconnectInterval?: number;
    maxRetry?: number;
    topic?: string;
};

export const useWebSocket = (
    url: string,
    {
        onConnect,
        onMessage,
        onDisconnect,
        onError,
        autoReconnect = true,
        reconnectInterval = 3000,
        maxRetry = 5,
        topic = "/topic/stock"
    }: UseWebSocketOptions = {}
) => {
    const socketClientRef = useRef<Client | null>(null);
    const subscriptionRef = useRef<StompSubscription | null>(null);

    const reconnectTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const reconnectAttemptsRef = useRef(0);

    const connect = useCallback(() => {
        if (socketClientRef.current?.active) {
            socketClientRef.current.deactivate(); // clean up before reconnect
        }

        const socket = new SockJS(url);
        const stompClient = Stomp.over(() => socket);

        stompClient.reconnectDelay = autoReconnect ? reconnectInterval : 0;
        stompClient.debug = () => {};

        stompClient.onConnect = () => {            
            reconnectAttemptsRef.current = 0; // reset
            if(onConnect) onConnect();

            if(subscriptionRef.current){
                subscriptionRef.current.unsubscribe();
                subscriptionRef.current = null;
            }
            // subscribe to the topic
            subscriptionRef.current = stompClient.subscribe(topic, (message: Message) => {
                const parsed = JSON.parse(message.body);
                if(onMessage) onMessage(parsed);
            });
        };

        stompClient.onStompError = (frame) => {
            if(onError) onError(frame);
        };

        stompClient.onWebSocketClose = () => {
            if(onDisconnect) onDisconnect();

            if(autoReconnect && !stompClient.connected && reconnectAttemptsRef.current < maxRetry){
                reconnectAttemptsRef.current += 1;

                reconnectTimeoutRef.current = setTimeout(() => {
                    
                    connect();
                },reconnectInterval);
            }
            else if(reconnectAttemptsRef.current >= maxRetry){
                console.log('Maximum retries exceeded!');
            }
        };

        stompClient.activate();

        socketClientRef.current = stompClient;
        
    }, [url, topic, onConnect, onMessage, onError, onDisconnect, autoReconnect, reconnectInterval]);


    useEffect(() => {
        connect();
        return () => {
            if(subscriptionRef.current) subscriptionRef.current.unsubscribe();
            if(socketClientRef.current) socketClientRef.current.deactivate();
            if(reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
        }
    },[connect]);


    return {
        client: socketClientRef.current,
        isConnected: socketClientRef.current?.connected || false
    };


};