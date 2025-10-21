import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  endDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ endDate }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = new Date(endDate).getTime() - now;
      setTimeLeft(distance > 0 ? distance : 0);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [endDate]);

  if (timeLeft === 0) return null;

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
  const seconds = Math.floor((timeLeft / 1000) % 60);

  const timeBlocks = [
    { label: 'Jours', value: days },
    { label: 'Heures', value: hours },
    { label: 'Minutes', value: minutes },
    { label: 'Secondes', value: seconds },
  ];

  return (
    <div className="flex space-x-4 mb-6 justify-start">
      {timeBlocks.map(({ label, value }) => (
        <div
          key={label}
          className="flex flex-col items-center bg-gold/10 border border-gold rounded-lg px-4 py-2 min-w-[60px]"
        >
          <span className="text-gold font-extrabold text-3xl tabular-nums">
            {value.toString().padStart(2, '0')}
          </span>
          <span className="text-bissap font-semibold text-xs uppercase mt-1">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CountdownTimer;
