import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
  type: "signIn"| "signUp" | "error"
};

export const Header = ({
  label,
  type,
}: HeaderProps) => {
  return (
    <div className="w-full flex flex-col gap-y-4 justify-start items-start">
      <h1 className={cn(
        "md:text-xl text-3xl font-semibold",
        font.className,
      )}>
      {type==="signUp"? `Create your Account` : `Welcome Back!` }  
      </h1>
      <p className="text-muted-foreground text-sm md:text-xs">
        {label}
      </p>
    </div>
  );
};
