"use client";
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebaseConfig';
import Auth from './components/Auth';
import Chat from './components/Chat';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {user ? (
        <Chat />
      ) : (
        <Auth />
      )}
    </div>
  );
}
