// Mock Zircuit Flow Smart Contract Integration
// Contract Address: 0x506D428E0414478dadC772891028282831085331
// Network: Garfield Testnet

export interface TripSession {
    id: string;
    tripId: string;
    userId: string;
    startTime: number;
    endTime?: number;
    duration: number;
    intensity: number;
    brainwaveState: string;
    txHash?: string;
}

export interface UserStats {
    totalSessions: number;
    totalDuration: number;
    favoriteTrip: string;
    averageIntensity: number;
    lastSession?: number;
}

export interface ContractConfig {
    contractAddress: string;
    network: string;
    chainId: number;
}

// Mock contract configuration
export const CONTRACT_CONFIG: ContractConfig = {
    contractAddress: "0x506D428E0414478dadC772891028282831085331",
    network: "garfield-testnet",
    chainId: 1337
};

class ZircuitFlowContract {
    private isConnected: boolean = false;
    private userAddress: string | null = null;
    private sessions: TripSession[] = [];
    private userStats: Map<string, UserStats> = new Map();

    constructor() {
        this.initializeMockData();
    }

    private initializeMockData() {
        // Mock user stats
        this.userStats.set("0x1234567890abcdef", {
            totalSessions: 47,
            totalDuration: 2840,
            favoriteTrip: "cosmic-voyage",
            averageIntensity: 7.2,
            lastSession: Date.now() - 86400000 // 1 day ago
        });

        // Mock recent sessions
        this.sessions = [
            {
                id: "session_001",
                tripId: "cosmic-voyage",
                userId: "0x1234567890abcdef",
                startTime: Date.now() - 3600000,
                endTime: Date.now() - 1800000,
                duration: 1800,
                intensity: 8,
                brainwaveState: "gamma",
                txHash: "0xabc123def456789..."
            },
            {
                id: "session_002",
                tripId: "deep-meditation",
                userId: "0x1234567890abcdef",
                startTime: Date.now() - 7200000,
                endTime: Date.now() - 5400000,
                duration: 1800,
                intensity: 6,
                brainwaveState: "theta",
                txHash: "0xdef456abc789123..."
            }
        ];
    }

    async connect(): Promise<boolean> {
        // Simulate wallet connection
        await new Promise(resolve => setTimeout(resolve, 1000));
        this.isConnected = true;
        this.userAddress = "0x1234567890abcdef";
        console.log("🔗 Connected to Zircuit Flow contract:", CONTRACT_CONFIG.contractAddress);
        return true;
    }

    async disconnect(): Promise<void> {
        this.isConnected = false;
        this.userAddress = null;
        console.log("🔌 Disconnected from Zircuit Flow contract");
    }

    async startTripSession(tripId: string, intensity: number): Promise<TripSession> {
        if (!this.isConnected || !this.userAddress) {
            throw new Error("Wallet not connected");
        }

        const session: TripSession = {
            id: `session_${Date.now()}`,
            tripId,
            userId: this.userAddress,
            startTime: Date.now(),
            duration: 0,
            intensity,
            brainwaveState: this.getBrainwaveState(tripId),
            txHash: `0x${Math.random().toString(16).substr(2, 40)}`
        };

        this.sessions.unshift(session);
        console.log("🚀 Started trip session on blockchain:", session.txHash);

        return session;
    }

    async endTripSession(sessionId: string, duration: number): Promise<TripSession> {
        const session = this.sessions.find(s => s.id === sessionId);
        if (!session) {
            throw new Error("Session not found");
        }

        session.endTime = Date.now();
        session.duration = duration;

        // Update user stats
        const stats = this.userStats.get(session.userId) || {
            totalSessions: 0,
            totalDuration: 0,
            favoriteTrip: "",
            averageIntensity: 0
        };

        stats.totalSessions += 1;
        stats.totalDuration += duration;
        stats.lastSession = Date.now();
        stats.averageIntensity = (stats.averageIntensity + session.intensity) / 2;

        this.userStats.set(session.userId, stats);

        console.log("✅ Ended trip session on blockchain:", session.txHash);
        return session;
    }

    async getUserStats(userAddress?: string): Promise<UserStats | null> {
        const address = userAddress || this.userAddress;
        if (!address) return null;

        return this.userStats.get(address) || null;
    }

    async getRecentSessions(limit: number = 10): Promise<TripSession[]> {
        return this.sessions.slice(0, limit);
    }

    async getSessionHistory(tripId?: string): Promise<TripSession[]> {
        if (tripId) {
            return this.sessions.filter(s => s.tripId === tripId);
        }
        return this.sessions;
    }

    private getBrainwaveState(tripId: string): string {
        const states = {
            "cosmic-voyage": "gamma",
            "deep-meditation": "theta",
            "energy-boost": "beta",
            "sleep-inducer": "delta",
            "focus-enhancer": "alpha",
            "creativity-flow": "gamma"
        };
        return states[tripId as keyof typeof states] || "alpha";
    }

    getConnectionStatus() {
        return {
            isConnected: this.isConnected,
            userAddress: this.userAddress,
            contractAddress: CONTRACT_CONFIG.contractAddress,
            network: CONTRACT_CONFIG.network
        };
    }

    // Mock blockchain events
    async subscribeToEvents(callback: (event: any) => void) {
        // Simulate blockchain events
        setInterval(() => {
            if (this.isConnected && Math.random() > 0.7) {
                callback({
                    type: "SessionCompleted",
                    data: {
                        sessionId: `session_${Date.now()}`,
                        reward: Math.floor(Math.random() * 100) + 50
                    }
                });
            }
        }, 5000);
    }
}

// Export singleton instance
export const zircuitContract = new ZircuitFlowContract();

// Export types for use in components
export type { TripSession, UserStats, ContractConfig }; 