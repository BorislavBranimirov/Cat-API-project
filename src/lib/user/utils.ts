const storageKey = 'current-user-id';

/**
 * Retrieve the last used user id. If no saved user id exists, a new id is
 * generated instead.
 * @returns id used for API calls
 */
export const getSavedUserId = () => {
  const currentId = localStorage.getItem(storageKey);
  if (currentId) {
    return currentId;
  }

  const newId = crypto.randomUUID();
  localStorage.setItem(storageKey, newId);

  return newId;
};
