'use client';
import { useEffect, useRef, useState } from 'react';

const previewFrames = [
    [
        '🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡',
        '🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢',
    ],
    [
        '🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴',
        '🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪',
    ],
    [
        '⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵',
        '🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣',
    ],
    [
        '🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪',
        '🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢',
    ],
    [
        '🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣',
        '🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴',
    ],
    [
        '🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢',
        '⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵',
    ],
    [
        '🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡',
        '🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣',
    ],
    [
        '🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴',
        '🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢',
    ],
    [
        '⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵',
        '🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪',
    ],
    [
        '🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡',
        '🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴🟢🔵🟡🟣⚪🔴',
    ],
];

const musicTracks = [
    { name: 'Rave', file: '/music/rave.mp3' },
    { name: 'Energy', file: '/music/energy.mp3' },
    { name: 'NSDR', file: '/music/nsdr.mp3' },
];

interface MatrixPreviewModalProps {
    open: boolean;
    onClose: () => void;
}

export const MatrixPreviewModal = ({ open, onClose }: MatrixPreviewModalProps) => {
    const [frame, setFrame] = useState(0);
    const [track, setTrack] = useState(musicTracks[0]);
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (open) {
            setFrame(0);
            // Pick a random track
            const randomTrack = musicTracks[Math.floor(Math.random() * musicTracks.length)];
            setTrack(randomTrack);
            setTimeout(() => {
                audioRef.current?.play();
            }, 200);
            // Animate frames
            const interval = setInterval(() => {
                setFrame((f) => (f + 1) % previewFrames.length);
            }, 1000);
            // Auto-close after 10 seconds
            const timeout = setTimeout(() => {
                onClose();
            }, 10000);
            return () => {
                clearInterval(interval);
                clearTimeout(timeout);
                audioRef.current?.pause();
                audioRef.current!.currentTime = 0;
            };
        }
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-lg flex flex-col items-center">
                <h2 className="text-xl font-bold mb-2">Preview: LED Matrix + Music</h2>
                <div className="mb-2 text-sm text-gray-500">Now Playing: <span className="font-semibold text-blue-600">{track.name}</span></div>
                <audio ref={audioRef} src={track.file} preload="auto" />
                <div className="bg-gray-900 rounded-lg p-2 mb-4">
                    <div className="flex flex-col gap-1">
                        {previewFrames[frame].map((row, rowIdx) => (
                            <div key={rowIdx} className="flex gap-1">
                                {row.split('').map((pixel, colIdx) => (
                                    <div
                                        key={`${rowIdx}-${colIdx}`}
                                        className="w-3 h-3 rounded-sm text-xs flex items-center justify-center"
                                        style={{
                                            backgroundColor:
                                                pixel === '🔴' ? '#ef4444' :
                                                    pixel === '🟢' ? '#22c55e' :
                                                        pixel === '🔵' ? '#3b82f6' :
                                                            pixel === '🟡' ? '#eab308' :
                                                                pixel === '🟣' ? '#a855f7' :
                                                                    pixel === '⚪' ? '#ffffff' :
                                                                        '#374151',
                                        }}
                                    >
                                        {pixel}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
                <button
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
                    onClick={onClose}
                >
                    Close Preview
                </button>
            </div>
        </div>
    );
}; 