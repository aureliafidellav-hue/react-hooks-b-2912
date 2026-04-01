'use client';

export default function SocialAuth() {
  return (
    <div className="mt-4">
      <div className="flex items-center gap-2 my-4">
        <hr className="flex-1 border-gray-300" />
        <span className="text-gray-400 text-sm">Atau masuk dengan</span>
        <hr className="flex-1 border-gray-300" />
      </div>
      <div className="flex justify-center gap-4">
        <button type="button" onClick={() => alert('Google')}
          className="p-3 rounded-full border border-gray-300 hover:bg-gray-50">
          <img src="https://www.google.com/favicon.ico" className="w-5 h-5" />
        </button>
        <button type="button" onClick={() => alert('GitHub')}
          className="p-3 rounded-full border border-gray-300 hover:bg-gray-50">
          <img src="https://github.com/favicon.ico" className="w-5 h-5" />
        </button>
        <button type="button" onClick={() => alert('Facebook')}
          className="p-3 rounded-full border border-gray-300 hover:bg-gray-50">
          <img src="https://www.facebook.com/favicon.ico" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}