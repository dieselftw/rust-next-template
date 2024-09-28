'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { auth } from '../lib/firebase';
import { User } from 'firebase/auth';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to SuperJoin Clone</h1>
      <Link 
        href={user ? '/dashboard' : '/login'}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {user ? 'Go to Dashboard' : 'Login'}
      </Link>
    </main>
  );
}
