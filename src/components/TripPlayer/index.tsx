'use client';
import { Trip } from '@/data/trips';
import { WebSocketService } from '@/services/websocket';
import { zircuitContract, TripSession } from '@/services/contract';
import { Pause, Play, Square, X } from 'iconoir-react';
import { useEffect, useState, useRef } from 'react';

interface TripPlayerProps {
    trip: Trip;
    onClose: () => void;
}

const musicTracks = [
    { name: 'Rave', file: '/music/rave.mp3' },
    { name: 'Energy', file: '/music/energy.mp3' },
    { name: 'NSDR', file: '/music/nsdr.mp3' },
];

export const TripPlayer = ({ trip, onClose }: TripPlayerProps) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [timeRemaining, setTimeRemaining] = useState(trip.duration);
    const [wsStatus, setWsStatus] = useState<'connected' | 'disconnected' | 'connecting'>('disconnected');
    const [wsService] = useState(() => new WebSocketService());
    const [matrixAnimation, setMatrixAnimation] = useState(0);
    const [audioTrack, setAudioTrack] = useState(musicTracks[0]);
    const [currentSession, setCurrentSession] = useState<TripSession | null>(null);
    const [contractStatus, setContractStatus] = useState(zircuitContract.getConnectionStatus());
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        wsService.setStatusCallback(setWsStatus);

        // Connect to WebSocket when component mounts
        wsService.connect().catch(console.error);

        // Connect to smart contract
        zircuitContract.connect().then(() => {
            setContractStatus(zircuitContract.getConnectionStatus());
        }).catch(console.error);

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

            // End session on blockchain
            if (currentSession) {
                zircuitContract.endTripSession(currentSession.id, trip.duration)
                    .then((endedSession) => {
                        console.log("✅ Trip session recorded on blockchain:", endedSession.txHash);
                    })
                    .catch(console.error);
            }

            setIsPlaying(false);
            setCurrentSession(null);
        }
    }, [timeRemaining, isPlaying, countdown, isPaused, wsService]);

    // Matrix animation effect
    useEffect(() => {
        if (isPlaying && countdown === 0 && !isPaused) {
            const interval = setInterval(() => {
                setMatrixAnimation(prev => (prev + 1) % 8);
            }, trip.blinkInterval);
            return () => clearInterval(interval);
        }
    }, [isPlaying, countdown, isPaused, trip.blinkInterval]);

    useEffect(() => {
        if (isPlaying && countdown === 0 && !isPaused) {
            // Pick a random track and play
            const randomTrack = musicTracks[Math.floor(Math.random() * musicTracks.length)];
            setAudioTrack(randomTrack);
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.currentTime = 0;
                    audioRef.current.muted = false;
                    audioRef.current.volume = 1;
                    audioRef.current.play();
                }
            }, 200);
        } else {
            // Pause audio when not playing
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
            }
        }
    }, [isPlaying, countdown, isPaused]);

    const startTrip = async () => {
        try {
            // Start session on blockchain
            const session = await zircuitContract.startTripSession(trip.id, trip.intensity || 7);
            setCurrentSession(session);

            setIsPlaying(true);
            setCountdown(3);
            setTimeRemaining(trip.duration);
            setIsPaused(false);
        } catch (error) {
            console.error("Failed to start trip session:", error);
            // Still start the trip even if blockchain fails
            setIsPlaying(true);
            setCountdown(3);
            setTimeRemaining(trip.duration);
            setIsPaused(false);
        }
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

    const getAnimatedMatrix = () => {
        if (!isPlaying || countdown > 0 || isPaused) {
            return trip.rgbMatrix;
        }

        // Create animated matrix by shifting rows
        const shiftedMatrix = [...trip.rgbMatrix];
        for (let i = 0; i < matrixAnimation; i++) {
            shiftedMatrix.push(shiftedMatrix.shift()!);
        }
        return shiftedMatrix;
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                {/* Audio element for music playback */}
                <audio ref={audioRef} src={audioTrack.file} preload="auto" />

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">{trip.name}</h2>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                                DEMO MODE
                            </div>
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

                {/* Animated RGB Matrix */}
                <div className="bg-gray-900 rounded-xl p-4 mb-6">
                    <div className="grid grid-cols-8 gap-1 mx-auto w-fit">
                        {getAnimatedMatrix().map((row, rowIndex) => (
                            row.split('').map((pixel, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className="w-4 h-4 rounded-sm text-xs flex items-center justify-center transition-all duration-200"
                                    style={{
                                        backgroundColor:
                                            pixel === '🔴' ? '#ef4444' :
                                                pixel === '🟢' ? '#22c55e' :
                                                    pixel === '🔵' ? '#3b82f6' :
                                                        pixel === '🟡' ? '#eab308' :
                                                            pixel === '🟣' ? '#a855f7' :
                                                                pixel === '⚪' ? '#ffffff' :
                                                                    '#374151',
                                        opacity: isPlaying && countdown === 0 && !isPaused ? 1 : 0.7
                                    }}
                                >
                                    {pixel}
                                </div>
                            ))
                        ))}
                    </div>
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
                        <button
                            onClick={startTrip}
                            className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                        >
                            <Play className="w-4 h-4 mr-2" />
                            Start Trip
                        </button>
                    ) : (
                        <>
                            {isPaused ? (
                                <button
                                    onClick={resumeTrip}
                                    className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
                                >
                                    <Play className="w-4 h-4 mr-2" />
                                    Resume
                                </button>
                            ) : (
                                <button
                                    onClick={pauseTrip}
                                    className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors flex items-center justify-center"
                                >
                                    <Pause className="w-4 h-4 mr-2" />
                                    Pause
                                </button>
                            )}
                            <button
                                onClick={stopTrip}
                                className="flex-1 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center"
                            >
                                <Square className="w-4 h-4 mr-2" />
                                Stop
                            </button>
                        </>
                    )}
                </div>

                {/* Emergency Stop */}
                {isPlaying && (
                    <div className="mt-4">
                        <button
                            onClick={stopTrip}
                            className="w-full bg-red-50 text-red-600 border border-red-200 px-4 py-3 rounded-lg font-semibold hover:bg-red-100 transition-colors"
                        >
                            Emergency Stop
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}; 