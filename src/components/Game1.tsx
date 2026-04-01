'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export default function Game1() {
  const [mole, setMole] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setMole(Math.floor(Math.random() * 9));
    }, 700);

    return () => clearInterval(i);
  }, []);

  return (
    <div className="game-grid">
      {[...Array(9)].map((_, i) => (
        <div key={i} className="hole"
          onClick={() => {
            if (i === mole) {
              setScore(score + 1);
              toast.success('+1');
            }
          }}>
          {mole === i && <div className="mole">🐹</div>}
        </div>
      ))}
      <p className="text-white mt-4">Score: {score}</p>
    </div>
  );
}