'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Game2 from '@/components/Game2';
import Game3 from '@/components/Game3';

export default function HomePage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      router.push('/auth/notauthorized');
    } else {
      setAuthorized(true);
    }
  }, []);

  if (!authorized) return null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10 gap-10">
      <h1 className="text-4xl font-bold text-white">Selamat Datang!</h1>
      <div className="flex flex-wrap justify-center gap-8">
        <Game2 />
        <Game3 />
      </div>
    </div>
  );
}