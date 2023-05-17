export const selectContacts = state => state.contacts.items;

export const selectStatus = state => state.contacts.status;

export const selectError = state => state.contacts.error;

export const selectFilter = state => state.filter;

export const selectUserName = state => state.auth.user.name;

export const selectIsLoggedIn = state => state.auth.isLoggedIn;

export const selectIsRefreshing = state => state.auth.isRefreshing;

export const selectUpdate = state => state.update;
