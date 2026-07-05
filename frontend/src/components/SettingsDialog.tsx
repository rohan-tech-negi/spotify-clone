import { Button, buttonVariants } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/useAuthStore";
import { LayoutDashboardIcon, Loader, Mic2, Settings } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const SettingsDialog = () => {
	const { isArtist, isLoading, becomeArtist, fetchUserProfile } = useAuthStore();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		if (open) fetchUserProfile();
	}, [open, fetchUserProfile]);

	const handleBecomeArtist = async () => {
		const success = await becomeArtist();
		if (success) {
			toast.success("You are now registered as an artist!");
		} else {
			toast.error("Could not register as an artist. Please try again.");
		}
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant='outline' size='icon' aria-label='Settings'>
					<Settings className='size-4' />
				</Button>
			</DialogTrigger>

			<DialogContent className='bg-zinc-900 border-zinc-800 text-white sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Settings</DialogTitle>
					<DialogDescription className='text-zinc-400'>
						Manage your account preferences and artist access.
					</DialogDescription>
				</DialogHeader>

				<div className='space-y-4'>
					{isArtist ? (
						<div className='rounded-lg border border-zinc-800 bg-zinc-950 p-4 space-y-3'>
							<div className='flex items-center gap-3'>
								<div className='rounded-full bg-emerald-500/10 p-2'>
									<Mic2 className='size-5 text-emerald-400' />
								</div>
								<div>
									<p className='font-medium'>Artist account</p>
									<p className='text-sm text-zinc-400'>
										You can upload songs and manage albums from the dashboard.
									</p>
								</div>
							</div>

							<Link
								to='/admin'
								onClick={() => setOpen(false)}
								className={cn(buttonVariants({ variant: "default" }), "w-full")}
							>
								<LayoutDashboardIcon className='size-4 mr-2' />
								Open Admin Dashboard
							</Link>
						</div>
					) : (
						<div className='rounded-lg border border-zinc-800 bg-zinc-950 p-4 space-y-3'>
							<div className='flex items-center gap-3'>
								<div className='rounded-full bg-zinc-800 p-2'>
									<Mic2 className='size-5 text-zinc-300' />
								</div>
								<div>
									<p className='font-medium'>Become an artist</p>
									<p className='text-sm text-zinc-400'>
										Register as an artist to upload music and access the admin dashboard.
									</p>
								</div>
							</div>

							<Button
								className='w-full'
								onClick={handleBecomeArtist}
								disabled={isLoading}
							>
								{isLoading ? (
									<>
										<Loader className='size-4 mr-2 animate-spin' />
										Registering...
									</>
								) : (
									<>
										<Mic2 className='size-4 mr-2' />
										Become an Artist
									</>
								)}
							</Button>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default SettingsDialog;
