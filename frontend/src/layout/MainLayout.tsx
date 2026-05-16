import React, { useState } from 'react'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Outlet } from 'react-router-dom';
import LeftSidebar from './components/LeftSidebar';
import FriendsActivity from './FriendsActivity';
import AudioPlayer from './components/AudioPlayer';
import PlaybackControls from '@/pages/home/components/PlaybackControls';

const MainLayout = () => {
    const [isMobile, setIsMobile] = useState(false);


  return (
    <div className='h-screen bg-black text-white flex flex-col'>
			<ResizablePanelGroup direction='horizontal' className='flex-1 flex h-full overflow-hidden p-2'>
				<AudioPlayer />
				{/* left sidebar */}
				<ResizablePanel defaultSize={20}>
					<LeftSidebar />
                    left sidebar
				</ResizablePanel>

				<ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />

				{/* Main content */}
				<ResizablePanel defaultSize={isMobile ? 80 : 60}>
					<Outlet />
				</ResizablePanel>

						<ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />

						{/* right sidebar */}
						<ResizablePanel defaultSize={20}>
							<FriendsActivity />
                            friends activity
						</ResizablePanel>
			</ResizablePanelGroup>

			<PlaybackControls />
		</div>
  )
}

export default MainLayout