
import React from 'react';
import { generateStreakDots } from '@/utils/habitUtils';
import { Habit } from '@/types/habit';

interface StreakDotsProps {
  habit: Habit;
  days?: number;
}

const StreakDots: React.FC<StreakDotsProps> = ({ habit, days = 7 }) => {
  const streakStatus = generateStreakDots(habit, days);
  
  return (
    <div className="flex items-center">
      {streakStatus.map((status, index) => (
        <div 
          key={index} 
          className={`streak-dot streak-dot-${status}`}
          title={status === 'completed' ? 'Completed' : status === 'missed' ? 'Missed' : 'Future'}
        />
      ))}
    </div>
  );
};

export default StreakDots;
