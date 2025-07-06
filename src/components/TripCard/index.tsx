'use client';
import { Trip } from '@/data/trips';
import { Play } from 'iconoir-react';

interface TripCardProps {
    trip: Trip;
    onSelect: (trip: Trip) => void;
}

export const TripCard = ({ trip, onSelect }: TripCardProps) => {
    const formatDuration = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return secs > 0 ? `${minutes}:${secs.toString().padStart(2, '0')}` : `${minutes}m`;
    };

    return (
        <div
            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onSelect(trip)}
        >
            {/* RGB Matrix Display */}
            <div className="relative h-32 bg-gradient-to-br from-gray-900 to-gray-800 p-4">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="grid grid-cols-8 gap-1">
                        {trip.rgbMatrix.map((row, rowIndex) => (
                            row.split('').map((pixel, colIndex) => (
                                <div
                                    key={`${rowIndex}-${colIndex}`}
                                    className="w-3 h-3 rounded-sm text-xs flex items-center justify-center"
                                    style={{
                                        backgroundColor:
                                            pixel === '🔴' ? '#ef4444' :
                                                pixel === '🟢' ? '#22c55e' :
                                                    pixel === '🔵' ? '#3b82f6' :
                                                        pixel === '🟡' ? '#eab308' :
                                                            pixel === '🟣' ? '#a855f7' :
                                                                pixel === '⚪' ? '#ffffff' :
                                                                    '#374151'
                                    }}
                                >
                                    {pixel}
                                </div>
                            ))
                        ))}
                    </div>
                </div>
                <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full p-2">
                    <Play className="w-4 h-4 text-white" />
                </div>
                <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-sm rounded-lg px-2 py-1">
                    <span className="text-white text-xs font-medium">{trip.mode.toUpperCase()}</span>
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 text-lg">{trip.name}</h3>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {formatDuration(trip.duration)}
                    </span>
                </div>

                <p className="text-gray-600 text-sm line-clamp-2">
                    {trip.description}
                </p>

                <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <span>Mode: {trip.mode}</span>
                    <span>•</span>
                    <span>{trip.blinkInterval}ms interval</span>
                </div>
            </div>
        </div>
    );
}; 