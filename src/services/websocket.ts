export class WebSocketService {
    private ws: WebSocket | null = null;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 2000;
    private onStatusChange: ((status: 'connected' | 'disconnected' | 'connecting') => void) | null = null;
    private isDemoMode = true; // Enable demo mode for hackathon

    constructor(private url: string = 'ws://10.151.240.37:81') { }

    setStatusCallback(callback: (status: 'connected' | 'disconnected' | 'connecting') => void) {
        this.onStatusChange = callback;
    }

    connect(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.ws?.readyState === WebSocket.OPEN) {
                resolve();
                return;
            }

            this.onStatusChange?.('connecting');

            if (this.isDemoMode) {
                // Simulate connection for demo
                setTimeout(() => {
                    console.log('Demo: WebSocket connected');
                    this.onStatusChange?.('connected');
                    resolve();
                }, 1000);
                return;
            }

            try {
                this.ws = new WebSocket(this.url);

                this.ws.onopen = () => {
                    console.log('WebSocket connected');
                    this.reconnectAttempts = 0;
                    this.onStatusChange?.('connected');
                    resolve();
                };

                this.ws.onclose = () => {
                    console.log('WebSocket disconnected');
                    this.onStatusChange?.('disconnected');
                    this.attemptReconnect();
                };

                this.ws.onerror = (error) => {
                    console.error('WebSocket error:', error);
                    this.onStatusChange?.('disconnected');
                    reject(error);
                };

                this.ws.onmessage = (event) => {
                    console.log('Received message:', event.data);
                };

            } catch (error) {
                console.error('Failed to create WebSocket:', error);
                this.onStatusChange?.('disconnected');
                reject(error);
            }
        });
    }

    private attemptReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);

            setTimeout(() => {
                this.connect().catch(() => {
                    // Reconnection failed, will try again
                });
            }, this.reconnectDelay);
        } else {
            console.log('Max reconnection attempts reached');
        }
    }

    sendTripData(mode: string, blinkInterval: number, brightness: number) {
        const message = `${mode};${blinkInterval};${brightness}`;
        console.log('Sending trip data:', message);

        if (this.isDemoMode) {
            // Simulate sending for demo
            console.log('Demo: Trip data sent to Arduino');
            return;
        }

        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(message);
        } else {
            console.error('WebSocket is not connected');
        }
    }

    stopTrip() {
        const message = 'stop;0;0';
        console.log('Stopping trip');

        if (this.isDemoMode) {
            // Simulate stopping for demo
            console.log('Demo: Stop command sent to Arduino');
            return;
        }

        if (this.ws?.readyState === WebSocket.OPEN) {
            this.ws.send(message);
        }
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }

    getStatus(): 'connected' | 'disconnected' | 'connecting' {
        if (this.isDemoMode) {
            return 'connected'; // Always show connected in demo mode
        }

        if (!this.ws) return 'disconnected';

        switch (this.ws.readyState) {
            case WebSocket.CONNECTING:
                return 'connecting';
            case WebSocket.OPEN:
                return 'connected';
            default:
                return 'disconnected';
        }
    }
} 