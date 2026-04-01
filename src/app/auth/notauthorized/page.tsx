'use client';

import { useRouter } from 'next/navigation';

export default function NotAuthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-sm w-full">
        <p className="text-4xl mb-4">❌</p>
        <h2 className="text-xl font-bold mb-2">Anda belum login</h2>
        <p className="text-gray-500 mb-6">Silakan login terlebih dahulu.</p>
        <button
          onClick={() => router.push('/auth/login')}
          className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
          ← Kembali
        </button>
      </div>
    </div>
  );
}