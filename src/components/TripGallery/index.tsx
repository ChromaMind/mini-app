'use client';
import { trips } from '@/data/trips';
import { Trip } from '@/data/trips';
import { TripCard } from '../TripCard';
import { TripPlayer } from '../TripPlayer';
import { useState } from 'react';

export const TripGallery = () => {
    const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);

    const handleTripSelect = (trip: Trip) => {
        setSelectedTrip(trip);
    };

    const handleClosePlayer = () => {
        setSelectedTrip(null);
    };

    return (
        <div className="w-full">
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
        </div>
    );
}; 