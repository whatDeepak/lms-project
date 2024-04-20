"use client";
import { LogoutButton } from "@/components/auth/logout-button";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";

export function UserButton() {
  const user = useCurrentUser();

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-sky-500">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-xs">
          <span className="font-medium">{user?.name}</span>
          <span className="text-muted-foreground">{user?.email}</span>
        </div>
      </div>
      <LogoutButton>
        <Button variant="ghost" className="p-2">
          <ExitIcon />
        </Button>
      </LogoutButton>
    </div>
  );
}
