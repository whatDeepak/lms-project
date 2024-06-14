"use client";

import { 
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";
import { Social } from "@/components/auth/social";
import { BackButton } from "@/components/auth/back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  type: "signIn"| "signUp"
};

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
  type
}: CardWrapperProps) => {
  return (
    <Card className="md:w-[40vw] md:h-[70vh] lg:w-[30vw] lg:h-[75vh] shadow-md">
      <CardHeader>
        <Header label={headerLabel} type={type} />
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {showSocial && (
        <CardFooter>
          <Social type={type} />
        </CardFooter>
      )}
      {/* <CardFooter>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
        />
      </CardFooter> */}
    </Card>
  );
};
