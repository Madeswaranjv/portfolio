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
  height = 460,
  width = "100%",
}: FlippingCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardHeight = typeof height === "number" ? `${height}px` : height;
  const cardWidth = typeof width === "number" ? `${width}px` : width;

  return (
    <div
      className={cn("flipping-card-wrapper", className)}
      style={{
        height: cardHeight,
        minHeight: cardHeight,
        width: cardWidth,
      }}
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
          "flipping-card-inner",
          isFlipped ? "is-flipped" : ""
        )}
      >
        {/* Front Face */}
        <div className="flipping-card-front">
          <div className="flipping-card-content">
            {frontContent}
          </div>
        </div>
        {/* Back Face */}
        <div className="flipping-card-back">
          <div className="flipping-card-content">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlippingCard;
