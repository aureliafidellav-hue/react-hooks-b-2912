'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function generateQuestion() {
  const ops = ['+', '-', 'x'];
  const op = ops[Math.floor(Math.random() * ops.length)];
  let a = Math.floor(Math.random() * 20) + 1;
  let b = Math.floor(Math.random() * 20) + 1;
  if (op === '-' && b > a) [a, b] = [b, a];
  const answer = op === '+' ? a + b : op === '-' ? a - b : a * b;
  return { question: `${a} ${op} ${b}`, answer };
}

export default function Game3() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [started, setStarted] = useState(false);
  const [input, setInput] = useState('');
  const [qa, setQa] = useState(generateQuestion());

  useEffect(() => {
    if (!started) return;
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

  const handleAnswer = (e: any) => {
    e.preventDefault();
    if (parseInt(input) === qa.answer) {
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highScore) setHighScore(newScore);
      toast.success('+1 Benar!');
    } else {
      toast.error(`Salah! Jawaban: ${qa.answer}`);
    }
    setQa(generateQuestion());
    setInput('');
  };

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setStarted(true);
    setQa(generateQuestion());
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-80 text-center">
      <h2 className="text-2xl font-bold mb-1">🔢 Math Rush</h2>
      <p className="text-gray-400 text-sm mb-4">Jawab soal matematika secepat mungkin!</p>

      <div className="flex justify-center gap-3 mb-2">
        <span className="bg-green-500 text-white px-4 py-2 rounded-full font-bold">🏆 {score}</span>
        <span className="bg-orange-500 text-white px-4 py-2 rounded-full font-bold">⏱ {timeLeft}s</span>
      </div>
      <p className="text-sm text-gray-500 mb-4">⭐ High Score: {highScore}</p>

      {started ? (
        <>
          <div className="text-4xl font-bold my-6 p-4 bg-gray-100 rounded-xl">{qa.question} = ?</div>
          <form onSubmit={handleAnswer} className="flex gap-2">
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="input-field text-center text-xl font-bold"
              placeholder="?"
              autoFocus
            />
            <button type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg font-bold">
              ✓
            </button>
          </form>
        </>
      ) : (
        <button onClick={startGame}
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-bold text-lg">
          🎮 {timeLeft === 0 ? 'Main Lagi' : 'Mulai'}
        </button>
      )}
    </div>
  );
}