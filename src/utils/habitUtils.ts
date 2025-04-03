
import { Habit } from "@/types/habit";

// Get today's date at midnight for consistent comparison
export const getTodayDate = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};

// Check if a habit was completed today
export const isCompletedToday = (habit: Habit): boolean => {
  const today = getTodayDate();
  return habit.completedDates.some(date => {
    const completedDate = new Date(date);
    return completedDate.getTime() === today.getTime();
  });
};

// Calculate streak for a habit
export const calculateStreak = (completedDates: Date[]): number => {
  if (completedDates.length === 0) return 0;
  
  // Sort dates in descending order
  const sortedDates = [...completedDates].sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );
  
  const today = getTodayDate();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  // Check if the most recent completion is today or yesterday
  const latestDate = new Date(sortedDates[0]);
  const isRecentCompletion = 
    latestDate.getTime() === today.getTime() || 
    latestDate.getTime() === yesterday.getTime();
  
  if (!isRecentCompletion) return 0;
  
  let streak = 1;
  let currentDate = latestDate;
  
  // Go backwards through the sorted dates
  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(sortedDates[i]);
    
    // Set hours to 0 for accurate date comparison
    prevDate.setHours(0, 0, 0, 0);
    
    // Calculate days between current date and previous date
    const prevDay = new Date(currentDate);
    prevDay.setDate(prevDay.getDate() - 1);
    
    if (prevDate.getTime() === prevDay.getTime()) {
      streak++;
      currentDate = prevDate;
    } else {
      // Break streak if there's a gap
      break;
    }
  }
  
  return streak;
};

// Get streak class based on streak count
export const getStreakClass = (streak: number): string => {
  if (streak >= 10) return 'streak-flame-hot';
  if (streak >= 5) return 'streak-flame-warm';
  if (streak > 0) return 'streak-flame-cool';
  return '';
};

// Generate streak dots for visualization
export const generateStreakDots = (habit: Habit, days: number = 7): Array<'completed' | 'missed' | 'future'> => {
  const result: Array<'completed' | 'missed' | 'future'> = [];
  const today = getTodayDate();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Check if this date is in the future
    if (date > today) {
      result.push('future');
      continue;
    }
    
    // Check if the habit was completed on this date
    const wasCompleted = habit.completedDates.some(completedDate => {
      const d = new Date(completedDate);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === date.getTime();
    });
    
    result.push(wasCompleted ? 'completed' : 'missed');
  }
  
  return result;
};

// Generate a unique ID for new habits
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15) + 
         Math.random().toString(36).substring(2, 15);
};
