import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface FlippingCardProps {
  className?: string;
  height?: number | string;
  width?: number | string;
  frontContent?: React.ReactNode;
  backContent?: React.ReactNode;
}

export function FlippingCard({
  className,
  frontContent,
  backContent,
  height = 430,
  width = "100%",
}: FlippingCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group/flipping-card [perspective:1200px] flipping-card-wrapper w-full"
      style={
        {
          "--height": typeof height === "number" ? `${height}px` : height,
          "--width": typeof width === "number" ? `${width}px` : width,
        } as React.CSSProperties
      }
      onClick={() => setIsFlipped((prev) => !prev)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsFlipped((prev) => !prev);
        }
      }}
    >
      <div
        className={cn(
          "relative rounded-2xl border border-neutral-200 bg-white shadow-xl transition-all duration-700 [transform-style:preserve-3d] group-hover/flipping-card:[transform:rotateY(180deg)] dark:border-neutral-800 dark:bg-neutral-950 flipping-card-inner",
          "h-[var(--height)] w-[var(--width)]",
          isFlipped ? "is-flipped [transform:rotateY(180deg)]" : "",
          className
        )}
      >
        {/* Front Face */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-white text-neutral-950 [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(0deg)] dark:bg-zinc-950 dark:text-neutral-50 flipping-card-front">
          <div className="[transform:translateZ(50px)_scale(.96)] h-full w-full flex flex-col justify-between box-border p-5">
            {frontContent}
          </div>
        </div>
        {/* Back Face */}
        <div className="absolute inset-0 h-full w-full rounded-[inherit] bg-white text-neutral-950 [transform-style:preserve-3d] [backface-visibility:hidden] [transform:rotateY(180deg)] dark:bg-zinc-950 dark:text-neutral-50 flipping-card-back">
          <div className="[transform:translateZ(50px)_scale(.96)] h-full w-full flex flex-col justify-between box-border p-5">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlippingCard;
