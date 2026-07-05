import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Settings } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { Button } from "./ui/button";

const Topbar = () => {
	return (
		<div
			className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 
      backdrop-blur-md z-10
    '
		>
			<div className='flex gap-2 items-center'>
				<img src='/spotify.png' className='size-8' alt='Spotify logo' />
				Spotify
			</div>
			<div className='flex items-center gap-4'>
				<Link to='/settings'>
					<Button variant='outline' size='icon' aria-label='Settings'>
						<Settings className='size-4' />
					</Button>
				</Link>

				<SignedOut>
					<SignInOAuthButtons />
				</SignedOut>

				<SignedIn>
					<UserButton />
				</SignedIn>
			</div>
		</div>
	);
};
export default Topbar;
