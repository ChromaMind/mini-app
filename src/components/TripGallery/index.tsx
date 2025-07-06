'use client';
import { trips } from '@/data/trips';
import { Trip } from '@/data/trips';
import { TripCard } from '../TripCard';
import { TripPlayer } from '../TripPlayer';
import { MatrixPreviewModal } from '../MatrixPreviewModal';
import { useState } from 'react';

export const TripGallery = () => {
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
    const [previewTrip, setPreviewTrip] = useState<Trip | null | undefined>(undefined);

    const handleTripSelect = (trip: Trip) => {
        setSelectedTrip(trip);
    };

    const handleTripPreview = (trip: Trip) => {
        setPreviewTrip(trip);
    };

    const handleClosePlayer = () => {
        setSelectedTrip(null);
    };

    const handleClosePreview = () => {
        setPreviewTrip(null);
    };

    return (
        <div className="w-full">
            {/* Demo Banner */}
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-4 mb-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="text-2xl">🧠</div>
                    <div>
                        <h3 className="font-bold text-lg">Brain Entrainment Demo</h3>
                        <p className="text-blue-100 text-sm">
                            Experience 6 different brain wave patterns with animated RGB matrices.
                            Each trip sends commands to Arduino for real-time light therapy.
                        </p>
                    </div>
                </div>
                <button
                    className="ml-4 px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-blue-50 transition"
                    onClick={() => setPreviewTrip(undefined)}
                >
                    Preview
                </button>
            </div>

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Brain Entrainment Trips</h1>
                <p className="text-gray-600">
                    Select a trip to begin your brain entrainment session
                </p>
            </div>

            {/* Trip Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {trips.map((trip) => (
                    <TripCard
                        key={trip.id}
                        trip={trip}
                        onSelect={handleTripSelect}
                        onPreview={handleTripPreview}
                    />
                ))}
            </div>

            {/* Trip Player Modal */}
            {selectedTrip && (
                <TripPlayer
                    trip={selectedTrip}
                    onClose={handleClosePlayer}
                />
            )}
            {/* Matrix Preview Modal */}
            <MatrixPreviewModal
                open={previewTrip !== undefined}
                trip={previewTrip}
                onClose={handleClosePreview}
            />
        </div>
    );
}; 