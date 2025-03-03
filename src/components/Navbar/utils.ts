export const selectTopTabIndex = (href: string) => {
	switch (href) {
		case "/my-watchlists":
			return 0;
		case "/watchlist-hub":
			return 1;
		case "/manage-friends":
			return 2;
		case "/search-equities":
			return 3;
		default:
			return -1;
	}
};

export const selectBottomTabIndex = (href: string) => {
	switch (href) {
		case "/my-account":
			return 0;
		case "/settings":
			return 1;
		case "/logout":
			return 2;
		default:
			return -1;
	}
};
