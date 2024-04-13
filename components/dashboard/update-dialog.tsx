import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "@/lib/db";

interface UpdateDialogProps {
    onClose: () => void;
    userId: string | undefined;
}

export const UpdateDialog: React.FC<UpdateDialogProps> = ({ onClose, userId }) => {
    const [open, setOpen] = useState(true);
    const [rollno, setRollno] = useState("");

    const handleClose = async () => {
        console.log(`User ID: ${userId}`);
        console.log(`Roll Number: ${rollno}`);
    
        if (!userId) {
            console.error("User ID is not provided");
            setOpen(false);
            onClose();
            return;
        }
    
        try {
            console.log("Updating the database...");
            await db.user.update({
                where: { id: userId },
                data: {
                    rollNo: rollno,
                },
            });
            console.log(`Roll number updated for user with ID ${userId}: ${rollno}`);
        } catch (error) {
            console.error("Error updating roll number:", error);
        }
    
        setOpen(false);
        onClose();
    };
    

    return (
        <div className="grid place-items-center h-screen w-screen">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[450px]">
                    <DialogHeader>
                        <DialogTitle>Complete your Profile</DialogTitle>
                        <DialogDescription>
                            Enter details to complete your profile. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="rollno" className="text-right">
                                Roll Number
                            </Label>
                            <Input
                                id="rollno"
                                value={rollno}
                                onChange={(e) => setRollno(e.target.value)}
                                className="col-span-3"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={handleClose} type="button">
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};