export interface Trip {
    id: string;
    name: string;
    duration: number; // in seconds
    description: string;
    previewImage: string;
    mode: string;
    blinkInterval: number; // in milliseconds
    brightness: number; // 0-255
    rgbMatrix: string[]; // RGB matrix pattern for demo
}

export const trips: Trip[] = [
    {
        id: 'alpha-waves',
        name: 'Alpha Waves',
        duration: 60, // 1 minute for demo
        description: 'Deep relaxation and stress relief with 8-12 Hz alpha waves',
        previewImage: '/images/alpha-waves.jpg',
        mode: 'alpha',
        blinkInterval: 125, // 8 Hz
        brightness: 200,
        rgbMatrix: [
            '🔴🟢🔵🔴🟢🔵🔴🟢',
            '🟢🔵🔴🟢🔵🔴🟢🔵',
            '🔵🔴🟢🔵🔴🟢🔵🔴',
            '🔴🟢🔵🔴🟢🔵🔴🟢',
            '🟢🔵🔴🟢🔵🔴🟢🔵',
            '🔵🔴🟢🔵🔴🟢🔵🔴',
            '🔴🟢🔵🔴🟢🔵🔴🟢',
            '🟢🔵🔴🟢🔵🔴🟢🔵'
        ]
    },
    {
        id: 'theta-meditation',
        name: 'Theta Meditation',
        duration: 90, // 1.5 minutes for demo
        description: 'Deep meditation and creativity enhancement with 4-7 Hz theta waves',
        previewImage: '/images/theta-meditation.jpg',
        mode: 'theta',
        blinkInterval: 200, // 5 Hz
        brightness: 180,
        rgbMatrix: [
            '🟣🟣🟣🟣🟣🟣🟣🟣',
            '🟣🟢🟢🟢🟢🟢🟢🟣',
            '🟣🟢🔵🔵🔵🔵🟢🟣',
            '🟣🟢🔵🔴🔴🔵🟢🟣',
            '🟣🟢🔵🔴🔴🔵🟢🟣',
            '🟣🟢🔵🔵🔵🔵🟢🟣',
            '🟣🟢🟢🟢🟢🟢🟢🟣',
            '🟣🟣🟣🟣🟣🟣🟣🟣'
        ]
    },
    {
        id: 'beta-focus',
        name: 'Beta Focus',
        duration: 75, // 1.25 minutes for demo
        description: 'Enhanced focus and concentration with 13-30 Hz beta waves',
        previewImage: '/images/beta-focus.jpg',
        mode: 'beta',
        blinkInterval: 77, // 13 Hz
        brightness: 220,
        rgbMatrix: [
            '🟡🟡🟡🟡🟡🟡🟡🟡',
            '🟡⚪⚪⚪⚪⚪⚪🟡',
            '🟡⚪🟡⚪🟡⚪🟡⚪',
            '🟡⚪⚪🟡🟡⚪⚪🟡',
            '🟡⚪🟡⚪🟡⚪🟡⚪',
            '🟡⚪⚪🟡🟡⚪⚪��',
            '🟡⚪⚪⚪⚪⚪⚪🟡',
            '🟡🟡🟡🟡🟡🟡🟡🟡'
        ]
    },
    {
        id: 'delta-sleep',
        name: 'Delta Sleep',
        duration: 120, // 2 minutes for demo
        description: 'Deep sleep induction with 0.5-4 Hz delta waves',
        previewImage: '/images/delta-sleep.jpg',
        mode: 'delta',
        blinkInterval: 500, // 2 Hz
        brightness: 150,
        rgbMatrix: [
            '🔵🔵🔵🔵🔵🔵🔵🔵',
            '🔵🔵🔵🔵🔵🔵🔵🔵',
            '🔵🔵🔵🔵🔵🔵🔵🔵',
            '🔵🔵🔵🔵🔵🔵🔵🔵',
            '🔵🔵🔵🔵🔵🔵🔵🔵',
            '🔵🔵🔵🔵🔵🔵🔵🔵',
            '🔵🔵🔵🔵🔵🔵🔵🔵',
            '🔵🔵🔵🔵🔵🔵🔵��'
        ]
    },
    {
        id: 'gamma-insight',
        name: 'Gamma Insight',
        duration: 45, // 45 seconds for demo
        description: 'Enhanced insight and high-level processing with 30-100 Hz gamma waves',
        previewImage: '/images/gamma-insight.jpg',
        mode: 'gamma',
        blinkInterval: 50, // 20 Hz
        brightness: 240,
        rgbMatrix: [
            '🟢🔴🟢🔴🟢🔴🟢🔴',
            '🔴🟢🔴🟢🔴🟢🔴🟢',
            '🟢🔴🟢🔴🟢🔴🟢🔴',
            '🔴🟢🔴🟢🔴🟢🔴🟢',
            '🟢🔴🟢🔴🟢🔴🟢🔴',
            '🔴🟢🔴🟢🔴🟢🔴🟢',
            '🟢🔴🟢🔴🟢🔴🟢🔴',
            '🔴🟢🔴🟢🔴🟢🔴🟢'
        ]
    },
    {
        id: 'relaxation-flow',
        name: 'Relaxation Flow',
        duration: 90, // 1.5 minutes for demo
        description: 'Gentle relaxation with flowing light patterns',
        previewImage: '/images/relaxation-flow.jpg',
        mode: 'flow',
        blinkInterval: 300, // 3.33 Hz
        brightness: 160,
        rgbMatrix: [
            '🟢🟢🟢🟢🟢🟢🟢🟢',
            '🟢🟢🟢🟢🟢🟢🟢🟢',
            '🟢🟢🟢🟢🟢🟢🟢🟢',
            '🟢🟢🟢🟢🟢🟢🟢🟢',
            '🟢🟢🟢🟢🟢🟢🟢🟢',
            '🟢🟢🟢🟢🟢🟢🟢🟢',
            '🟢🟢🟢🟢🟢🟢🟢🟢',
            '🟢🟢🟢🟢🟢🟢🟢🟢'
        ]
    },
]; 