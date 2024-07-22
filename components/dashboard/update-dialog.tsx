"use client"

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

interface UpdateDialogProps {
    onClose: () => void;
    userId: string | undefined;
}

export const UpdateDialog: React.FC<UpdateDialogProps> = ({ onClose, userId }) => {
    const [open, setOpen] = useState(true);
    const [rollno, setRollno] = useState("");

    const handleClose = async () => {
    
        if (!userId) {
            console.error("User ID is not provided");
            setOpen(false);
            onClose();
            return;
        }
    
        try {
            const response = await fetch('/api/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, rollNo: rollno }),
            });
    
            if (response.ok) {
                console.log(`Roll number updated for user with ID ${userId}: ${rollno}`);
                setOpen(false);
                onClose();
            } else {
                console.error("Error updating roll number:", response.statusText);
            }
        } catch (error) {
            console.error("Error updating roll number:", error);
        }
    };
    
    

    return (
        <div className="grid place-items-center h-screen w-screen">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[450px]">
                    <DialogHeader>
                        <DialogTitle>Complete your Profile</DialogTitle>
                        <DialogDescription>
                            Enter details to complete your profile. Click save when you&apos;re done.
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