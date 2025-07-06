# Brain Entrainment Mini App

A World mini app for brain entrainment trips that connects to Arduino devices via WebSocket.

## Features

- **Trip Gallery**: Browse 6 predefined brain entrainment trips
- **Trip Player**: Start, pause, and stop brain entrainment sessions
- **WebSocket Integration**: Real-time communication with Arduino device
- **Countdown Timer**: 3-second countdown before trip starts
- **Emergency Stop**: Immediate stop functionality
- **Connection Status**: Real-time WebSocket connection monitoring

## Trip Types

1. **Alpha Waves** (5 min) - Deep relaxation and stress relief (8-12 Hz)
2. **Theta Meditation** (10 min) - Deep meditation and creativity (4-7 Hz)
3. **Beta Focus** (8 min) - Enhanced focus and concentration (13-30 Hz)
4. **Delta Sleep** (15 min) - Deep sleep induction (0.5-4 Hz)
5. **Gamma Insight** (6 min) - Enhanced insight and processing (30-100 Hz)
6. **Relaxation Flow** (12 min) - Gentle relaxation with flowing patterns

## WebSocket Protocol

The app sends commands to Arduino in the format: `mode;blink_interval;brightness`

- `mode`: Trip type (alpha, theta, beta, delta, gamma, flow)
- `blink_interval`: Blink interval in milliseconds
- `brightness`: LED brightness (0-255)

Stop command: `stop;0;0`

## Technical Stack

- **Framework**: Next.js 15
- **UI Kit**: @worldcoin/mini-apps-ui-kit-react
- **Authentication**: NextAuth with World App Wallet
- **Styling**: Tailwind CSS
- **WebSocket**: Native WebSocket API

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Set up environment variables:

   ```env
   NEXT_PUBLIC_APP_ID=your_app_id
   NEXTAUTH_SECRET=your_secret
   HMAC_SECRET_KEY=your_hmac_key
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

## Arduino Integration

The app connects to Arduino at `ws://10.151.240.37:81`. Make sure your Arduino device is running the corresponding WebSocket server and can handle the command format.

## User Flow

1. User opens the app and sees the trip gallery
2. User selects a trip from the available options
3. Trip player opens with connection status and trip details
4. User clicks "Start Trip" to begin the session
5. 3-second countdown starts
6. WebSocket sends trip data to Arduino
7. Trip runs for the specified duration
8. User can pause, resume, or stop at any time
9. Emergency stop button available during active sessions

## Development

This is Phase 1 of the brain entrainment mini app. Future phases may include:

- NFT marketplace integration
- User session history
- Custom trip creation
- Advanced analytics
- Social features
