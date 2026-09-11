"use client";

import * as React from "react";
import {
  Pyramid,
  Castle,
  Mountain,
  TowerControl,
  Building,
  Landmark,
} from "lucide-react";
import { cn } from "@/lib/utils"; 

export interface CardItem {
  id: string | number;
  title: string;
  description: string;
  imgSrc: string;
  icon: React.ReactNode;
  linkHref: string;
}

interface ExpandingCardsProps extends React.HTMLAttributes<HTMLUListElement> {
  items: CardItem[];
  defaultActiveIndex?: number;
  direction?: 'horizontal' | 'vertical';
  onItemClick?: (item: CardItem, index: number) => void;
}

export const ExpandingCards = React.forwardRef<
  HTMLUListElement,
  ExpandingCardsProps
>(({ className, items, defaultActiveIndex = 0, direction, onItemClick, ...props }, ref) => {
  const [activeIndex, setActiveIndex] = React.useState<number | null>(
    defaultActiveIndex,
  );
  
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const useHorizontal = direction === 'horizontal' || (direction !== 'vertical' && isDesktop);

  const gridStyle = React.useMemo(() => {
    if (activeIndex === null || !items || items.length === 0) return {};
    
    if (useHorizontal) {
      const columns = items
        .map((_, index) => (index === activeIndex ? "4fr" : "1fr"))
        .join(" ");
      return { gridTemplateColumns: columns };
    } else {
      const rows = items
        .map((_, index) => (index === activeIndex ? "4fr" : "1fr"))
        .join(" ");
      return { gridTemplateRows: rows };
    }
  }, [activeIndex, items, useHorizontal]);

  const handleInteraction = (index: number) => {
    setActiveIndex(index);
  };

  const handleClick = (item: CardItem, index: number) => {
    setActiveIndex(index);
    if (onItemClick) {
      onItemClick(item, index);
    }
  };

  return (
    <ul
      className={cn(
        "expanding-cards-list w-full gap-2",
        "grid",
        "transition-[grid-template-columns,grid-template-rows] duration-500 ease-out",
        className,
      )}
      style={{
        ...gridStyle,
        ...(useHorizontal 
          ? { gridTemplateRows: '1fr' }
          : { gridTemplateColumns: '1fr' }
        )
      }}
      ref={ref}
      {...props}
    >
      {items.map((item, index) => (
        <li
          key={item.id}
          className={cn(
            "expanding-card-item group relative cursor-pointer overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm",
            "min-h-0 min-w-0"
          )}
          onMouseEnter={() => handleInteraction(index)}
          onFocus={() => handleInteraction(index)}
          onClick={() => handleClick(item, index)}
          tabIndex={0}
          data-active={activeIndex === index}
        >
          <img
            src={item.imgSrc}
            alt={item.title}
            className="expanding-card-img absolute inset-0 h-full w-full object-cover transition-all duration-300 ease-out group-data-[active=true]:scale-100 group-data-[active=true]:grayscale-0 scale-110 grayscale"
          />
          <div className="expanding-card-overlay absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent" />

          <article
            className="expanding-card-article absolute inset-0 flex flex-col justify-end gap-1.5 p-3"
          >
            <h3 className="expanding-card-collapsed-title origin-left rotate-90 text-xs font-medium uppercase tracking-wider text-white/80 opacity-100 transition-all duration-300 ease-out group-data-[active=true]:opacity-0">
              {item.title}
            </h3>

            <div className="expanding-card-icon text-gold text-white/90 opacity-0 transition-all duration-300 delay-75 ease-out group-data-[active=true]:opacity-100">
              {item.icon}
            </div>

            <h3 className="expanding-card-active-title text-sm font-bold text-white opacity-0 transition-all duration-300 delay-150 ease-out group-data-[active=true]:opacity-100">
              {item.title}
            </h3>

            <p className="expanding-card-desc w-full text-xs text-white/80 line-clamp-2 opacity-0 transition-all duration-300 delay-225 ease-out group-data-[active=true]:opacity-100">
              {item.description}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
});
ExpandingCards.displayName = "ExpandingCards";
export default ExpandingCards;
