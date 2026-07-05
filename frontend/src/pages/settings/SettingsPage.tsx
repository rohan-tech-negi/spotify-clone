import Topbar from "@/components/Topbar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import { useSettingsStore, type AppTheme } from "@/stores/useSettingsStore";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-react";
import {
	Bell,
	Headphones,
	LayoutDashboardIcon,
	Loader,
	Mic2,
	Moon,
	Palette,
	Shield,
	User,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { SettingsNavItem, SettingsRow, SettingsSection } from "./components/SettingsSection";
import SignInOAuthButtons from "@/components/SignInOAuthButtons";

type SettingsTab = "account" | "appearance" | "playback" | "account-type" | "notifications" | "privacy";

const NAV_ITEMS: { id: SettingsTab; label: string; icon: typeof User }[] = [
	{ id: "account", label: "Account", icon: User },
	{ id: "appearance", label: "Appearance", icon: Palette },
	{ id: "playback", label: "Playback", icon: Headphones },
	{ id: "account-type", label: "Account type", icon: Mic2 },
	{ id: "notifications", label: "Notifications", icon: Bell },
	{ id: "privacy", label: "Privacy", icon: Shield },
];

const SettingsPage = () => {
	const [activeTab, setActiveTab] = useState<SettingsTab>("account");
	const { user: clerkUser } = useUser();
	const { user, isArtist, isLoading, fetchUserProfile, becomeArtist, becomeListener } = useAuthStore();

	const {
		theme,
		volume,
		autoplay,
		normalizeVolume,
		crossfade,
		showFriendActivity,
		shareListeningActivity,
		emailNotifications,
		setTheme,
		setVolume,
		setAutoplay,
		setNormalizeVolume,
		setCrossfade,
		setShowFriendActivity,
		setShareListeningActivity,
		setEmailNotifications,
	} = useSettingsStore();

	useEffect(() => {
		if (clerkUser) fetchUserProfile();
	}, [clerkUser, fetchUserProfile]);

	const handleAccountTypeChange = async (nextIsArtist: boolean) => {
		if (nextIsArtist === isArtist || isLoading) return;

		const success = nextIsArtist ? await becomeArtist() : await becomeListener();
		if (success) {
			toast.success(nextIsArtist ? "Switched to artist account" : "Switched to listener account");
		} else {
			toast.error("Could not update account type. Please try again.");
		}
	};

	const displayName =
		user?.fullName || `${clerkUser?.firstName || ""} ${clerkUser?.lastName || ""}`.trim() || "User";
	const displayEmail = clerkUser?.primaryEmailAddress?.emailAddress;
	const displayImage = user?.imageUrl || clerkUser?.imageUrl;

	return (
		<main className='h-full rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden flex flex-col'>
			<Topbar />

			<div className='flex-1 min-h-0 px-4 sm:px-6 pb-6'>
				<div className='max-w-6xl mx-auto h-full flex flex-col'>
					<div className='py-6'>
						<h1 className='text-3xl font-bold text-white'>Settings</h1>
						<p className='text-zinc-400 mt-1'>Manage your account, playback, and app preferences.</p>
					</div>

					<div className='flex-1 min-h-0 grid lg:grid-cols-[240px_1fr] gap-6'>
						<nav className='rounded-xl border border-zinc-800 bg-zinc-900/60 p-2 h-fit lg:sticky lg:top-4'>
							{NAV_ITEMS.map((item) => (
								<SettingsNavItem
									key={item.id}
									icon={item.icon}
									label={item.label}
									active={activeTab === item.id}
									onClick={() => setActiveTab(item.id)}
								/>
							))}
						</nav>

						<ScrollArea className='h-[calc(100vh-240px)] pr-4'>
							<div className='space-y-6 pb-8'>
								{activeTab === "account" && (
									<>
										<SettingsSection title='Profile' description='Your public profile information.'>
											<SignedIn>
												<div className='flex items-center gap-4 py-2'>
													<Avatar className='size-16'>
														<AvatarImage src={displayImage} alt={displayName} />
														<AvatarFallback>{displayName[0]}</AvatarFallback>
													</Avatar>
													<div>
														<p className='text-lg font-semibold text-white'>{displayName}</p>
														{displayEmail && <p className='text-sm text-zinc-400'>{displayEmail}</p>}
														<p className='text-xs text-zinc-500 mt-1 capitalize'>
															{isArtist ? "Artist account" : "Listener account"}
														</p>
													</div>
												</div>

												{isArtist && (
													<div className='pt-4 border-t border-zinc-800 mt-4'>
														<Link
															to='/admin'
															className={cn(buttonVariants({ variant: "outline" }), "border-zinc-700")}
														>
															<LayoutDashboardIcon className='size-4 mr-2' />
															Open Artist Dashboard
														</Link>
													</div>
												)}
											</SignedIn>

											<SignedOut>
												<div className='py-4 space-y-4'>
													<p className='text-sm text-zinc-400'>Sign in to view and manage your profile.</p>
													<SignInOAuthButtons />
												</div>
											</SignedOut>
										</SettingsSection>

										<SettingsSection title='Account details' description='Information linked to your account.'>
											<SignedIn>
												<SettingsRow label='Display name' description={displayName}>
													<span className='text-sm text-zinc-400'>Managed by Clerk</span>
												</SettingsRow>
												<SettingsRow label='Email' description='Your sign-in email address'>
													<span className='text-sm text-zinc-400'>{displayEmail || "—"}</span>
												</SettingsRow>
											</SignedIn>
											<SignedOut>
												<p className='text-sm text-zinc-400 py-2'>Sign in to see account details.</p>
											</SignedOut>
										</SettingsSection>
									</>
								)}

								{activeTab === "appearance" && (
									<SettingsSection title='Theme' description='Choose how Spotify looks on your device.'>
										<SettingsRow label='App theme' description='Switch between dark, light, or match your system.'>
											<Select value={theme} onValueChange={(value: AppTheme) => setTheme(value)}>
												<SelectTrigger className='w-[160px] bg-zinc-950 border-zinc-700'>
													<SelectValue />
												</SelectTrigger>
												<SelectContent className='bg-zinc-900 border-zinc-700'>
													<SelectItem value='dark'>
														<span className='flex items-center gap-2'>
															<Moon className='size-4' /> Dark
														</span>
													</SelectItem>
													<SelectItem value='light'>Light</SelectItem>
													<SelectItem value='system'>System default</SelectItem>
												</SelectContent>
											</Select>
										</SettingsRow>
									</SettingsSection>
								)}

								{activeTab === "playback" && (
									<SettingsSection title='Playback' description='Control how music plays in the app.'>
										<SettingsRow label='Default volume' description='Volume level when you start listening.'>
											<div className='flex items-center gap-3 w-40'>
												<Slider
													value={[volume]}
													max={100}
													step={1}
													onValueChange={(value) => setVolume(value[0])}
												/>
												<span className='text-sm text-zinc-400 w-8 text-right'>{volume}%</span>
											</div>
										</SettingsRow>
										<SettingsRow label='Autoplay' description='Automatically play similar songs when your queue ends.'>
											<Switch checked={autoplay} onCheckedChange={setAutoplay} />
										</SettingsRow>
										<SettingsRow label='Normalize volume' description='Set the same volume level for all songs.'>
											<Switch checked={normalizeVolume} onCheckedChange={setNormalizeVolume} />
										</SettingsRow>
										<SettingsRow label='Crossfade' description='Smooth transitions between songs (3 seconds).'>
											<Switch checked={crossfade} onCheckedChange={setCrossfade} />
										</SettingsRow>
									</SettingsSection>
								)}

								{activeTab === "account-type" && (
									<SettingsSection
										title='Account type'
										description='Switch between listener and artist modes, like Spotify.'
									>
										<SignedIn>
											<div className='grid sm:grid-cols-2 gap-4'>
												<button
													type='button'
													disabled={isLoading}
													onClick={() => handleAccountTypeChange(false)}
													className={cn(
														"rounded-xl border p-5 text-left transition-all",
														!isArtist
															? "border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500/50"
															: "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
													)}
												>
													<div className='rounded-full bg-zinc-800 w-10 h-10 flex items-center justify-center mb-3'>
														<Headphones className='size-5 text-zinc-300' />
													</div>
													<p className='font-semibold text-white'>Listener</p>
													<p className='text-sm text-zinc-400 mt-1'>
														Discover music, create playlists, and listen to your favorites.
													</p>
												</button>

												<button
													type='button'
													disabled={isLoading}
													onClick={() => handleAccountTypeChange(true)}
													className={cn(
														"rounded-xl border p-5 text-left transition-all",
														isArtist
															? "border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500/50"
															: "border-zinc-800 bg-zinc-950 hover:border-zinc-700"
													)}
												>
													<div className='rounded-full bg-emerald-500/10 w-10 h-10 flex items-center justify-center mb-3'>
														<Mic2 className='size-5 text-emerald-400' />
													</div>
													<p className='font-semibold text-white'>Artist</p>
													<p className='text-sm text-zinc-400 mt-1'>
														Upload songs, manage albums, and access the artist dashboard.
													</p>
												</button>
											</div>

											{isLoading && (
												<div className='flex items-center gap-2 text-sm text-zinc-400 mt-4'>
													<Loader className='size-4 animate-spin' />
													Updating account type...
												</div>
											)}

											{isArtist && (
												<div className='mt-6 pt-4 border-t border-zinc-800'>
													<Link to='/admin' className={cn(buttonVariants(), "w-full sm:w-auto")}>
														<LayoutDashboardIcon className='size-4 mr-2' />
														Go to Artist Dashboard
													</Link>
												</div>
											)}
										</SignedIn>

										<SignedOut>
											<p className='text-sm text-zinc-400 py-2'>Sign in to switch between listener and artist accounts.</p>
											<SignInOAuthButtons />
										</SignedOut>
									</SettingsSection>
								)}

								{activeTab === "notifications" && (
									<SettingsSection title='Notifications' description='Choose what updates you receive.'>
										<SettingsRow label='Email notifications' description='Get updates about new releases and activity.'>
											<Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
										</SettingsRow>
										<SettingsRow label='Friend activity' description='Show alerts when friends start listening.'>
											<Switch checked={showFriendActivity} onCheckedChange={setShowFriendActivity} />
										</SettingsRow>
									</SettingsSection>
								)}

								{activeTab === "privacy" && (
									<SettingsSection title='Privacy' description='Control what others can see about your activity.'>
										<SettingsRow
											label='Share listening activity'
											description='Let friends see what you are playing in real time.'
										>
											<Switch checked={shareListeningActivity} onCheckedChange={setShareListeningActivity} />
										</SettingsRow>
										<SettingsRow label='Show in friend activity sidebar' description='Appear in the friends activity panel.'>
											<Switch checked={showFriendActivity} onCheckedChange={setShowFriendActivity} />
										</SettingsRow>
									</SettingsSection>
								)}
							</div>
						</ScrollArea>
					</div>
				</div>
			</div>
		</main>
	);
};

export default SettingsPage;
