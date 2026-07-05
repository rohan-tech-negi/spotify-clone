import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";
import AudioPlayer from "./components/AudioPlayer";
import { PlaybackControls } from "./components/PlaybackControls";
import { useEffect, useState } from "react";

const MainLayout = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < 768);
		};

		checkMobile();
		window.addEventListener("resize", checkMobile);
		return () => window.removeEventListener("resize", checkMobile);
	}, []);

	const panelLayout: Record<string, number> = isMobile
		? { left: 20, main: 80 }
		: { left: 20, main: 60, right: 20 };

	return (
		<div className='h-screen bg-black text-white flex flex-col'>
			<AudioPlayer />
			<ResizablePanelGroup
				direction='horizontal'
				className='flex-1 flex h-full overflow-hidden p-2'
				defaultLayout={panelLayout}
			>
				{/* left sidebar */}
				<ResizablePanel
					id='left'
					defaultSize="20"
					minSize={isMobile ? "15" : "18"}
					maxSize="30"
					className='h-full overflow-hidden'
				>
					<LeftSidebar />
				</ResizablePanel>

				<ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />

				{/* Main content */}
				<ResizablePanel id='main' defaultSize={isMobile ? "80" : "60"} minSize="40" className='h-full overflow-hidden'>
					<Outlet />
				</ResizablePanel>

				{!isMobile && (
					<>
						<ResizableHandle className='w-2 bg-black rounded-lg transition-colors' />

						{/* right sidebar */}
						<ResizablePanel
							id='right'
							defaultSize="20"
							minSize="18"
							maxSize="30"
							className='h-full overflow-hidden'
						>
							<FriendsActivity />
						</ResizablePanel>
					</>
				)}
			</ResizablePanelGroup>

			<PlaybackControls />
		</div>
	);
};
export default MainLayout;
