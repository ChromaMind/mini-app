import { Page } from '@/components/PageLayout';
import { ConnectionStatus } from '@/components/ConnectionStatus';
import { TripGallery } from '@/components/TripGallery';
import { Marble, TopBar } from '@worldcoin/mini-apps-ui-kit-react';

export default async function Home() {
  // Mock user data for testing without authentication
  const mockUser = {
    username: 'Demo User',
    profilePictureUrl: undefined,
  };

  return (
    <>
      <Page.Header className="p-0">
        <TopBar
          title="Brain Entrainment"
          endAdornment={
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                  DEMO MODE
                </div>
                <ConnectionStatus />
              </div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold capitalize">
                  {mockUser.username}
                </p>
                <Marble src={mockUser.profilePictureUrl} className="w-12" />
              </div>
            </div>
          }
        />
      </Page.Header>
      <Page.Main className="flex flex-col items-center justify-start gap-4 mb-16">
        <TripGallery />
      </Page.Main>
    </>
  );
}
