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
      <div className="m-auto bg-slate-50 rounded-md  flex w-[170vh] h-[90vh]">
        <div className="w-2/5 rounded-tl-md rounded-bl-md bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-custom-primary to-purple-100 flex flex-col justify-between">
          {/* Content for left div */}
          <div className="m-10 mt-20">
            <h1 className="text-5xl font-bold text-left text-white">Elevate Your Learning Experience</h1>
            <p className="text-md font-light text-left text-white mt-8">
              Unlock your potential and embark on a journey of knowledge and growth with our immersive learning experiences.
            </p>
          </div>

          <div className="flex justify-center ml-10">
            {/* Empty div to push the carousel to the bottom */}
          </div>
          <div className="flex justify-center mb-8">
            <Carousel
              plugins={[plugin.current]}
              className="w-full max-w-[24rem] h-[150px]"
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
                            <img src={review.imageUrl} alt={review.name} className="w-10 h-10 rounded-full mr-3" />
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