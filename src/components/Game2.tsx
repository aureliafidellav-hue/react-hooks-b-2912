'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const COLORS = ['Merah', 'Biru', 'Hijau', 'Kuning', 'Ungu', 'Oranye'];
const COLOR_MAP: any = {
  Merah: '#ef4444', Biru: '#3b82f6', Hijau: '#22c55e',
  Kuning: '#eab308', Ungu: '#a855f7', Oranye: '#f97316',
};

function shuffle(arr: string[]) {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function Game2() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [started, setStarted] = useState(false);
  const [target, setTarget] = useState('Merah');
  const [options, setOptions] = useState<string[]>([]);

  const generateRound = () => {
    const newTarget = COLORS[Math.floor(Math.random() * COLORS.length)];
    const opts = shuffle([newTarget, ...shuffle(COLORS.filter(c => c !== newTarget)).slice(0, 3)]);
    setTarget(newTarget);
    setOptions(opts);
  };

  useEffect(() => {
    if (!started) return;
    generateRound();
    const timer = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timer);
          setStarted(false);
          toast.info('Waktu habis!');
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started]);

  const handleClick = (color: string) => {
    if (!started) return;
    if (color === target) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highScore) setHighScore(newScore);
      toast.success('+1 Benar!');
      generateRound();
    } else {
      toast.error('Salah!');
    }
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setStarted(true);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center">
      <h2 className="text-2xl font-bold mb-1">🎨 Color Match</h2>
      <p className="text-gray-400 text-sm mb-4">Klik warna yang sesuai dengan teks!</p>

      <div className="flex justify-center gap-3 mb-2">
        <span className="bg-green-500 text-white px-4 py-2 rounded-full font-bold">🏆 {score}</span>
        <span className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold">⏱ {timeLeft}s</span>
      </div>
      <p className="text-sm text-gray-500 mb-4">⭐ High Score: {highScore}</p>

      {started ? (
        <>
          <div className="text-xl font-bold mb-4 p-3 rounded-lg bg-gray-100">
            Klik warna: <span style={{ color: COLOR_MAP[target] }}>{target}</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {options.map(color => (
              <button key={color} onClick={() => handleClick(color)}
                className="py-8 rounded-xl text-white font-bold text-lg shadow-md hover:scale-105 transition-transform"
                style={{ backgroundColor: COLOR_MAP[color] }}>
              </button>
            ))}
          </div>
        </>
      ) : (
        <button onClick={startGame}
          className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-8 py-3 rounded-full font-bold text-lg">
          🎮 {timeLeft === 0 ? 'Main Lagi' : 'Mulai'}
        </button>
      )}
    </div>
  );
}