import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

interface SettingsSectionProps {
	title: string;
	description?: string;
	children: React.ReactNode;
}

export const SettingsSection = ({ title, description, children }: SettingsSectionProps) => (
	<section className='rounded-xl border border-zinc-800 bg-zinc-900/60 overflow-hidden'>
		<div className='border-b border-zinc-800 px-6 py-4'>
			<h2 className='text-lg font-semibold text-white'>{title}</h2>
			{description && <p className='text-sm text-zinc-400 mt-1'>{description}</p>}
		</div>
		<div className='px-6 py-4'>{children}</div>
	</section>
);

interface SettingsRowProps {
	label: string;
	description?: string;
	children: React.ReactNode;
	className?: string;
}

export const SettingsRow = ({ label, description, children, className }: SettingsRowProps) => (
	<div className={cn("flex items-center justify-between gap-6 py-4 border-b border-zinc-800 last:border-0", className)}>
		<div className='min-w-0 flex-1'>
			<p className='font-medium text-white'>{label}</p>
			{description && <p className='text-sm text-zinc-400 mt-1'>{description}</p>}
		</div>
		<div className='shrink-0'>{children}</div>
	</div>
);

interface SettingsNavItemProps {
	icon: LucideIcon;
	label: string;
	active: boolean;
	onClick: () => void;
}

export const SettingsNavItem = ({ icon: Icon, label, active, onClick }: SettingsNavItemProps) => (
	<button
		onClick={onClick}
		className={cn(
			"flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
			active ? "bg-zinc-800 text-white" : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
		)}
	>
		<Icon className='size-4 shrink-0' />
		{label}
	</button>
);
