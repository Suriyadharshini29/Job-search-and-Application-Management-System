import { getAuth, onAuthStateChanged } from "firebase/auth";

// Returns the logged-in user as a Promise
export const getCurrentUser = () => {
  return new Promise((resolve) => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // stop listening
      resolve(user); // user object or null
    });
  });
};
