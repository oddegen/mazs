"use client";

import { Grid } from "@/components/grid";
import { PauseContext } from "@/components/pause-provider";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import algorithms from "@/lib/algorithms";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  KeyboardEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface PageProps {
  params: {
    slug: string;
  };
}
export default function Page({ params }: PageProps) {
  const [api, setApi] = useState<CarouselApi>();
  const { isPaused, setIsPaused } = useContext(PauseContext);

  const { push } = useRouter();

  useEffect(() => {
    const handleSpacePress = (ev: KeyboardEvent) => {
      if (ev.key === "p") {
        setIsPaused((prev) => !prev);
      }
    };
    // @ts-ignore
    document.addEventListener("keydown", handleSpacePress);

    return () => {
      // @ts-ignore
      document.removeEventListener("keydown", handleSpacePress);
    };
  }, []);

  useEffect(() => {
    if (!api) return;

    const handleArrowKeysPress = (e: KeyboardEvent) => {
      if (isPaused) {
        if (e.key === "ArrowLeft") {
          if (api.canScrollPrev()) {
            api.scrollPrev();
            console.log("prev");
          }
        } else if (e.key === "ArrowRight") {
          if (api.canScrollNext()) {
            api.scrollNext();
            console.log("next");
          }
        }
      }
    };

    // @ts-ignore
    document.addEventListener("keydown", handleArrowKeysPress);

    return () => {
      // @ts-ignore
      document.removeEventListener("keydown", handleArrowKeysPress);
    };
  }, [api, isPaused]);

  return (
    <Carousel
      className={cn(
        "w-full h-full transition ease-in delay-100 duration-300 md:max-w-2xl max-w-lg flex items-center justify-center mx-auto grow px-4",
        isPaused && "scale-105"
      )}
      opts={{ loop: true }}
      setApi={setApi}
    >
      <div className="overflow-hidden grow">
        <CarouselContent>
          {Array.from({ length: Object.keys(algorithms).length }).map(
            (_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card className="border-none bg-card/30 rounded-none">
                    <CardContent className="aspect-square md:aspect-video p-0">
                      <Grid isPaused={isPaused} />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )
          )}
        </CarouselContent>
      </div>
    </Carousel>
  );
}
