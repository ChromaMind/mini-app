'use client';
import { Trip } from '@/data/trips';
import { WebSocketService } from '@/services/websocket';
import { Button, LiveFeedback } from '@worldcoin/mini-apps-ui-kit-react';
import { Pause, Play, Stop, X } from 'iconoir-react';
import { useEffect, useState } from 'react';

interface TripPlayerProps {
    trip: Trip;
    onClose: () => void;
}

export const TripPlayer = ({ trip, onClose }: TripPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [timeRemaining, setTimeRemaining] = useState(trip.duration);
    const [wsStatus, setWsStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');
    const [wsService] = useState(() => new WebSocketService());

    useEffect(() => {
        wsService.setStatusCallback(setWsStatus);

        // Connect to WebSocket when component mounts
        wsService.connect().catch(console.error);

        return () => {
            wsService.disconnect();
        };
    }, [wsService]);

    useEffect(() => {
        if (countdown > 0 && isPlaying) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0 && isPlaying) {
            // Start the trip
            wsService.sendTripData(trip.mode, trip.blinkInterval, trip.brightness);
        }
    }, [countdown, isPlaying, wsService, trip]);

    useEffect(() => {
        if (timeRemaining > 0 && isPlaying && countdown === 0 && !isPaused) {
            const timer = setTimeout(() => {
                setTimeRemaining(timeRemaining - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else if (timeRemaining === 0 && isPlaying) {
            // Trip finished
            wsService.stopTrip();
            setIsPlaying(false);
        }
    }, [timeRemaining, isPlaying, countdown, isPaused, wsService]);

    const startTrip = () => {
        setIsPlaying(true);
        setCountdown(3);
        setTimeRemaining(trip.duration);
        setIsPaused(false);
    };

    const pauseTrip = () => {
        setIsPaused(true);
        wsService.stopTrip();
    };

    const resumeTrip = () => {
        setIsPaused(false);
        wsService.sendTripData(trip.mode, trip.blinkInterval, trip.brightness);
    };

    const stopTrip = () => {
        wsService.stopTrip();
        setIsPlaying(false);
        setIsPaused(false);
        setCountdown(3);
        setTimeRemaining(trip.duration);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'connected':
                return 'text-green-600';
            case 'connecting':
                return 'text-yellow-600';
            default:
                return 'text-red-600';
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{trip.name}</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${wsStatus === 'connected' ? 'bg-green-500' :
                                    wsStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
                                }`} />
                            <span className={`text-sm ${getStatusColor(wsStatus)}`}>
                                {wsStatus === 'connected' ? 'Connected' :
                                    wsStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Trip Info */}
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <p className="text-gray-600 text-sm mb-3">{trip.description}</p>
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <div className="text-2xl font-bold text-gray-900">
                                {countdown > 0 ? countdown : formatTime(timeRemaining)}
                            </div>
                            <div className="text-xs text-gray-500">
                                {countdown > 0 ? 'Starting...' : 'Remaining'}
                            </div>
                        </div>
                        <div>
                            <div className="text-lg font-semibold text-gray-900">{trip.mode}</div>
                            <div className="text-xs text-gray-500">Mode</div>
                        </div>
                        <div>
                            <div className="text-lg font-semibold text-gray-900">{trip.blinkInterval}ms</div>
                            <div className="text-xs text-gray-500">Interval</div>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex gap-3">
                    {!isPlaying ? (
                        <Button
                            onClick={startTrip}
                            disabled={wsStatus !== 'connected'}
                            size="lg"
                            variant="primary"
                            className="flex-1"
                        >
                            <Play className="w-4 h-4 mr-2" />
                            Start Trip
                        </Button>
                    ) : (
                        <>
                            {isPaused ? (
                                <Button
                                    onClick={resumeTrip}
                                    size="lg"
                                    variant="primary"
                                    className="flex-1"
                                >
                                    <Play className="w-4 h-4 mr-2" />
                                    Resume
                                </Button>
                            ) : (
                                <Button
                                    onClick={pauseTrip}
                                    size="lg"
                                    variant="secondary"
                                    className="flex-1"
                                >
                                    <Pause className="w-4 h-4 mr-2" />
                                    Pause
                                </Button>
                            )}
                            <Button
                                onClick={stopTrip}
                                size="lg"
                                variant="tertiary"
                                className="flex-1"
                            >
                                <Stop className="w-4 h-4 mr-2" />
                                Stop
                            </Button>
                        </>
                    )}
                </div>

                {/* Emergency Stop */}
                {isPlaying && (
                    <div className="mt-4">
                        <Button
                            onClick={stopTrip}
                            size="lg"
                            variant="tertiary"
                            className="w-full bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                        >
                            Emergency Stop
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}; 