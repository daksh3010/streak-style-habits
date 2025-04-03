
import React from 'react';
import { Check, Trash2 } from 'lucide-react';
import { Habit } from '@/types/habit';
import { Button } from '@/components/ui/button';
import { useHabits } from '@/contexts/HabitsContext';
import { isCompletedToday } from '@/utils/habitUtils';
import StreakIndicator from './StreakIndicator';
import StreakDots from './StreakDots';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface HabitCardProps {
  habit: Habit;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit }) => {
  const { toggleHabitCompletion, deleteHabit } = useHabits();
  const completed = isCompletedToday(habit);
  
  return (
    <div className="habit-card">
      <div className="habit-card-header">
        <h3 className="font-semibold text-lg">{habit.name}</h3>
        <StreakIndicator streak={habit.currentStreak} />
      </div>
      
      {habit.description && (
        <p className="text-sm text-gray-600 mb-3">{habit.description}</p>
      )}
      
      <div className="flex items-center justify-between mt-4">
        <StreakDots habit={habit} />
        
        <div className="flex items-center space-x-2">
          <Button
            variant={completed ? "default" : "outline"}
            size="sm"
            onClick={() => toggleHabitCompletion(habit)}
            className={completed ? "bg-primary hover:bg-primary/90" : ""}
          >
            <Check className={`h-4 w-4 ${completed ? 'mr-1' : 'mr-0'}`} />
            {completed ? 'Done' : ''}
          </Button>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4 text-gray-500" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete habit</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete "{habit.name}"? This action cannot be undone and all streak data will be lost.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => deleteHabit(habit.id)}
                  className="bg-destructive hover:bg-destructive/90"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
