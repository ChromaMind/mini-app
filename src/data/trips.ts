export interface Trip {
    id: string;
    name: string;
    duration: number; // in seconds
    description: string;
    previewImage: string;
    mode: string;
    blinkInterval: number; // in milliseconds
    brightness: number; // 0-255
}

export const trips: Trip[] = [
    {
        id: 'alpha-waves',
        name: 'Alpha Waves',
        duration: 300, // 5 minutes
        description: 'Deep relaxation and stress relief with 8-12 Hz alpha waves',
        previewImage: '/images/alpha-waves.jpg',
        mode: 'alpha',
        blinkInterval: 125, // 8 Hz
        brightness: 200,
    },
    {
        id: 'theta-meditation',
        name: 'Theta Meditation',
        duration: 600, // 10 minutes
        description: 'Deep meditation and creativity enhancement with 4-7 Hz theta waves',
        previewImage: '/images/theta-meditation.jpg',
        mode: 'theta',
        blinkInterval: 200, // 5 Hz
        brightness: 180,
    },
    {
        id: 'beta-focus',
        name: 'Beta Focus',
        duration: 480, // 8 minutes
        description: 'Enhanced focus and concentration with 13-30 Hz beta waves',
        previewImage: '/images/beta-focus.jpg',
        mode: 'beta',
        blinkInterval: 77, // 13 Hz
        brightness: 220,
    },
    {
        id: 'delta-sleep',
        name: 'Delta Sleep',
        duration: 900, // 15 minutes
        description: 'Deep sleep induction with 0.5-4 Hz delta waves',
        previewImage: '/images/delta-sleep.jpg',
        mode: 'delta',
        blinkInterval: 500, // 2 Hz
        brightness: 150,
    },
    {
        id: 'gamma-insight',
        name: 'Gamma Insight',
        duration: 360, // 6 minutes
        description: 'Enhanced insight and high-level processing with 30-100 Hz gamma waves',
        previewImage: '/images/gamma-insight.jpg',
        mode: 'gamma',
        blinkInterval: 50, // 20 Hz
        brightness: 240,
    },
    {
        id: 'relaxation-flow',
        name: 'Relaxation Flow',
        duration: 720, // 12 minutes
        description: 'Gentle relaxation with flowing light patterns',
        previewImage: '/images/relaxation-flow.jpg',
        mode: 'flow',
        blinkInterval: 300, // 3.33 Hz
        brightness: 160,
    },
]; 