import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    req: Request,
  ) {
    try {
      const user: any = await currentUser();
      const userId = user?.id ?? "";
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

        // Fetch the current user data to get the existing checkInDates array
    const currUser = await db.user.findUnique({
        where: { id: userId },
        select: { checkInDates: true },
      });
    if(!currUser){
      return new NextResponse("Unauthorized", { status: 401 });
    }
      const currentDate = new Date();
      const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()); // Create a date with time set to 00:00:00
      
      // Check if the current date is already in the checkInDates array
      const isDateAlreadyCheckedIn = currUser.checkInDates.some(date => {
        // Extract the date part of the stored DateTime
        const storedDateOnly = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        return storedDateOnly.getTime() === currentDateOnly.getTime(); // Compare date parts only
      });
      
  
      if (!isDateAlreadyCheckedIn) {
        // Update the checkInDates array with the new date
        const updatedUser = await db.user.update({
          where: { id: userId },
          data: {
            checkInDates: [...currUser.checkInDates, currentDate], // Add the current date and time
          },
        });
    
        // Show a toast or notification that today is the first time user entered
        return new NextResponse(JSON.stringify({ success: true, message: "First time" }), { status: 200 });
      } 
      return new NextResponse(JSON.stringify({ success: true, message: "NotFirstTime" }), { status: 200 });
  
    } catch (error) {
      console.log("[Daly_Check_Progress_Error: ]]", error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  }