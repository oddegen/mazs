"use client";

import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";
import { useTheme } from "next-themes";

export default function PageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme, setTheme } = useTheme();

  return (
    <div className="w-screen h-screen">
      {children}
      <div className="fixed bottom-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-end p-8 gap-4">
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
          <PopoverContent side="top">
            <div>for later</div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
