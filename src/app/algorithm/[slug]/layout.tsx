"use client";

import { PauseContext } from "@/components/pause-provider";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import algorithms from "@/lib/algorithms";
import { cn } from "@/lib/utils";
import { PopoverClose } from "@radix-ui/react-popover";
import { Separator } from "@radix-ui/react-separator";
import { Info, X } from "lucide-react";
import { useContext } from "react";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isPaused } = useContext(PauseContext);

  return (
    <div className={"w-screen h-screen overflow-hidden relative"}>
      {children}
      <div className="fixed bottom-0 z-50 w-full flex justify-end px-8 py-4 gap-4">
        <ThemeToggle />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="border-none bg-muted/40"
            >
              <Info className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" className="rounded border-2 p-0 mr-1">
            <Card className="rounded-none border-none bg-inherit">
              <CardHeader className="w-full flex flex-row p-2 justify-between items-center space-y-0">
                <CardTitle className="text-base pl-1">
                  Keyboard Shortcuts
                </CardTitle>
                <PopoverClose>
                  <Button
                    variant="outline"
                    size="icon"
                    className="flex border-2 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-token-text-quaternary focus-visible:ring-offset-1 focus-visible:ring-offset-transparent dark:hover:bg-token-main-surface-tertiary sm:mt-0 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </PopoverClose>
              </CardHeader>
              <Separator className="w-full border border-t-0 border-r-0 border-l-0" />
              <CardContent className="flex-grow overflow-y-auto p-2 sm:p-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between overflow-hidden">
                    <p className="truncate text-sm">Pause</p>
                    <div className="ml-3 flex flex-row gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md border capitalize">
                        <span className="text-xs">P</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between overflow-hidden">
                    <p className="truncate text-sm">Next</p>
                    <div className="ml-3 flex flex-row gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md border capitalize">
                        <span className="text-xs">{">"}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between overflow-hidden">
                    <p className="truncate text-sm">Prev</p>
                    <div className="ml-3 flex flex-row gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-md border capitalize">
                        <span className="text-xs">{"<"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
      </div>
      <div
        className={cn(
          "absolute inset-0 left-0 bottom-0 transition-all duration-150 delay-75 -z-10 invisible pointer-events-none",
          isPaused && "backdrop-blur-sm z-10 visible"
        )}
      >
        <div className="w-full md:px-8 md:py-10 px-4 py-6  absolute bottom-0">
          <div className="text-sm max-w-[25ch] sm:max-w-[25ch] font-mono">
            <span className="text-2xl">{algorithms.binaryTree.name}</span>
          </div>
        </div>
      </div>
      <svg>
        <filter id="grain">
          <feTurbulence type="turbulence" baseFrequency="0.65" />
        </filter>
      </svg>
    </div>
  );
}
