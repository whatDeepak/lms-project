"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )
  return (
    // <div className="h-full flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-custom-primary to-blue-500">
    //   {children}
    // </div>
    <div className="flex h-screen">
      <div className="m-auto bg-slate-50 rounded-md  flex w-[170vh] h-[90vh]">
        <div className="w-2/5 rounded-tl-md rounded-bl-md bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-custom-primary to-purple-100 flex flex-col justify-between">
          {/* Content for left div */}
          <div className="flex justify-center">
            {/* Empty div to push the carousel to the bottom */}
          </div>
          <div className="flex justify-center mb-8">
            <Carousel
              plugins={[plugin.current]}
              className="w-full max-w-xs"
            >
              <CarouselContent>
                {Array.from({ length: 5 }).map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="">
                      <Card>
                        <CardContent className="flex w-full h-full items-center justify-center">
                          <span className="text-4xl font-semibold">{index + 1}</span>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

        </div>
        <div className="w-3/5 rounded-tr-md rounded-br-md flex items-center justify-center">
          <div className="text-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;