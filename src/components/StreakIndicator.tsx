
import React from 'react';
import { Flame } from 'lucide-react';
import { getStreakClass } from '@/utils/habitUtils';

interface StreakIndicatorProps {
  streak: number;
}

const StreakIndicator: React.FC<StreakIndicatorProps> = ({ streak }) => {
  if (streak === 0) return null;
  
  const streakClass = getStreakClass(streak);
  
  return (
    <div className={`streak-flame ${streakClass}`}>
      <Flame className="h-3.5 w-3.5 mr-1" />
      <span>{streak} day{streak !== 1 ? 's' : ''}</span>
    </div>
  );
};

export default StreakIndicator;
