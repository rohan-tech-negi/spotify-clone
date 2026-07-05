import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AppTheme = "dark" | "light" | "system";

interface SettingsStore {
	theme: AppTheme;
	volume: number;
	autoplay: boolean;
	normalizeVolume: boolean;
	crossfade: boolean;
	showFriendActivity: boolean;
	shareListeningActivity: boolean;
	emailNotifications: boolean;

	setTheme: (theme: AppTheme) => void;
	setVolume: (volume: number) => void;
	setAutoplay: (autoplay: boolean) => void;
	setNormalizeVolume: (normalizeVolume: boolean) => void;
	setCrossfade: (crossfade: boolean) => void;
	setShowFriendActivity: (show: boolean) => void;
	setShareListeningActivity: (share: boolean) => void;
	setEmailNotifications: (enabled: boolean) => void;
}

export const useSettingsStore = create<SettingsStore>()(
	persist(
		(set) => ({
			theme: "dark",
			volume: 75,
			autoplay: true,
			normalizeVolume: false,
			crossfade: false,
			showFriendActivity: true,
			shareListeningActivity: true,
			emailNotifications: false,

			setTheme: (theme) => set({ theme }),
			setVolume: (volume) => set({ volume }),
			setAutoplay: (autoplay) => set({ autoplay }),
			setNormalizeVolume: (normalizeVolume) => set({ normalizeVolume }),
			setCrossfade: (crossfade) => set({ crossfade }),
			setShowFriendActivity: (showFriendActivity) => set({ showFriendActivity }),
			setShareListeningActivity: (shareListeningActivity) => set({ shareListeningActivity }),
			setEmailNotifications: (emailNotifications) => set({ emailNotifications }),
		}),
		{ name: "spotify-app-settings" }
	)
);
