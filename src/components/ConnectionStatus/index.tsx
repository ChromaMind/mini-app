'use client';
import { WebSocketService } from '@/services/websocket';
import { useEffect, useState } from 'react';

export const ConnectionStatus = () => {
    const [status, setStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');
    const [wsService] = useState(() => new WebSocketService());

    useEffect(() => {
        wsService.setStatusCallback(setStatus);

        // Connect to WebSocket when component mounts
        wsService.connect().catch(console.error);

        return () => {
            wsService.disconnect();
        };
    }, [wsService]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'connected':
                return 'bg-green-500';
            case 'connecting':
                return 'bg-yellow-500';
            default:
                return 'bg-red-500';
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case 'connected':
                return 'Connected';
            case 'connecting':
                return 'Connecting...';
            default:
                return 'Disconnected';
        }
    };

    return (
        <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`} />
            <span className="text-xs text-gray-600">{getStatusText(status)}</span>
        </div>
    );
}; 