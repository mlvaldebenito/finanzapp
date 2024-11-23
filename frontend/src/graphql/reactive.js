import { makeVar } from '@apollo/client';

// Initialize the token with value from localStorage (if exists)
export const refreshTokenVar = makeVar(localStorage.getItem('refreshToken') || null);

// Sync with localStorage when the variable changes
refreshTokenVar.onNextChange((newToken) => {
  if (newToken) {
    localStorage.setItem('refreshToken', newToken);
  } else {
    localStorage.removeItem('refreshToken');
  }
});
