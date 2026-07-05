import { useEffect } from "react";
import { useSettingsStore } from "@/stores/useSettingsStore";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const theme = useSettingsStore((state) => state.theme);

	useEffect(() => {
		const root = document.documentElement;

		const applyTheme = () => {
			const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
			const isDark = theme === "dark" || (theme === "system" && prefersDark);
			root.classList.toggle("dark", isDark);
		};

		applyTheme();

		if (theme !== "system") return;

		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		mediaQuery.addEventListener("change", applyTheme);
		return () => mediaQuery.removeEventListener("change", applyTheme);
	}, [theme]);

	return <>{children}</>;
};

export default ThemeProvider;
