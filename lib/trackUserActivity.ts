import { db } from '@/lib/db';
import toast from 'react-hot-toast';

export const trackUserActivity = async (userId: string) => {
  try {
    if (!userId) {
      throw new Error("User not found");
    }

    // Fetch the current user data to get the existing checkInDates array
    const user = await db.user.findUnique({
      where: { id: userId },
      select: { checkInDates: true },
    });
    if (!user) {
      throw new Error("User not found");
    }

    const currentDate = new Date();
    const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); // Create a date with time set to 00:00:00
    
    // Check if the current date is already in the checkInDates array
    const isDateAlreadyCheckedIn = user.checkInDates.some(date => {
      // Extract the date part of the stored DateTime
      const storedDateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      return storedDateOnly.getTime() === currentDateOnly.getTime(); // Compare date parts only
    });
    

    if (!isDateAlreadyCheckedIn) {
      // Update the checkInDates array with the new date
      const updatedUser = await db.user.update({
        where: { id: userId },
        data: {
          checkInDates: [...user.checkInDates, currentDate], // Add the current date and time
        },
      });
  
    } 
        
  } catch (error) {
    console.error('Failed to track user activity:', error);
    throw new Error('Failed to update last active timestamp');
  }
};
