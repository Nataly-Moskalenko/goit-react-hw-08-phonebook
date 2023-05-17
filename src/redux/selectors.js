export const selectContacts = state => state.contacts.items;

export const selectStatus = state => state.contacts.status;

export const selectError = state => state.contacts.error;

export const selectFilter = state => state.filter;

export const selectUserName = state => state.auth.user.name;

export const selectAuthStatus = state => state.auth.status;

export const selectUpdate = state => state.update;
