"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
interface socialProps {
  type: "signIn"| "signUp" | "error"
};


export const Social = ({type}: socialProps) => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  }

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        onClick={() => onClick("google")}
      >
        {/* <FcGoogle className="h-5 w-5" /> */}
        {type==="signUp"? `Create an Account` : `Log in here` }  
      </Button>
    </div>
  );
};
