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
import { cn } from "@/lib/utils";
import Image from "next/image"

const reviews = [
  {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere purus ac arcu cursus, nec laoreet ipsum venenatis.',
    imageUrl: '/user1.jpg',
    name: 'John Doe',
    job: 'Professor',
  },
  {
    text: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
    imageUrl: '/user2.jpg',
    name: 'Jane Doe',
    job: 'Professor',
  },
  {
    text: 'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.',
    imageUrl: '/user3.jpg',
    name: 'Alice Smith',
    job: 'Professor',
  }
];

const AuthLayout = ({
  children
}: {
  children: React.ReactNode
}) => {
  const plugin = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  )

  return (
    <div className="flex h-screen">
      <div className="m-auto bg-slate-50 rounded-md  flex lg:w-[70vw] lg:h-[90vh] md:w-[80vw] md:h-[80vh]">
        <div className="hidden md:flex w-2/5 rounded-tl-md rounded-bl-md bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-custom-primary to-purple-100 flex-col justify-between">
          {/* Content for left div */}
          <div className="m-10 mt-15">
            <h1 className="md:text-2xl lg:text-4xl font-bold text-left text-white">Elevate Your Learning Experience</h1>
            <p className="md:text-sm text-md font-light text-left text-white mt-8">
              Unlock your potential and embark on a journey of knowledge and growth with our immersive learning experiences.
            </p>
          </div>

          <div className="flex justify-center ml-10">
            {/* Empty div to push the carousel to the bottom */}
          </div>
          <div className="flex justify-center mb-8">
            <Carousel
              plugins={[plugin.current]}
              className="w-full lg:block lg:w-[22vw] lg:h-[22vh] md:hidden"
            >
              <CarouselContent>
                {reviews.map((review, index) => (
                  <CarouselItem key={index}>
                    <div className="">
                      <Card>
                        <CardContent className="flex flex-col w-full h-[150px] p-6 items-start rounded-lg justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#B1A0FD] to-[#8D79F6]">
                          {/* <span className="text-4xl font-semibold">{}</span> */}

                          <div className="text-white font-normal text-xs">
                            <p>{review.text}</p>
                          </div>
                          {/* Dynamic image and name */}
                          <div className="flex items-start mt-5">
                            <Image src={review.imageUrl} alt={review.name} className="w-10 h-10 rounded-full mr-3" />
                            <div>
                              <span className="text-white text-sm block">{review.name}</span>
                              <span className="text-white text-xs block">{review.job}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

        </div>
        <div className="md:hidden w-[80vw]">
          <div className="text-center">
            {children}
          </div>
        </div>

        {/* Render only on large screens */}
        <div className="hidden md:flex w-3/5 rounded-tr-md rounded-br-md items-center justify-center">
          <div className="text-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;