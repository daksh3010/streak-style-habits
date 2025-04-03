
export interface Habit {
  id: string;
  name: string;
  description?: string;
  frequency: 'daily' | 'weekly';
  createdAt: Date;
  color?: string;
  icon?: string;
  currentStreak: number;
  longestStreak: number;
  completedDates: Date[];
}

export interface HabitCompletion {
  habitId: string;
  completedAt: Date;
}
