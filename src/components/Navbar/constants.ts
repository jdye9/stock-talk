import {
	IconSettings,
	IconTrendingUp,
	IconShare,
	IconUser,
	IconLogout,
	IconUsersGroup,
	IconSearch,
} from "@tabler/icons-react";

export const topList = [
	{ icon: IconTrendingUp, label: "My Watchlist", href: "my-watchlists" },
	{ icon: IconShare, label: "Watchlist Hub", href: "watchlist-hub" },
	{ icon: IconUsersGroup, label: "Manage Friends", href: "manage-friends" },
	{ icon: IconSearch, label: "Search Equities", href: "search-equities" },
];

export const bottomList = [
	{ icon: IconUser, label: "My Account", href: "my-account" },
	{ icon: IconSettings, label: "Settings", href: "settings" },
	{ icon: IconLogout, label: "Logout", href: "logout" },
];
