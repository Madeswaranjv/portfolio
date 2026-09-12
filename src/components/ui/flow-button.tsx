import React from 'react';
import { ArrowUpRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FlowButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  as?: 'a' | 'button';
  text?: string;
  size?: 'default' | 'compact';
  variant?: 'gold' | 'outline' | 'filled' | 'light';
  icon?: LucideIcon | React.ComponentType<{ className?: string; size?: number; [key: string]: any }>;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const FlowButton = React.forwardRef<any, FlowButtonProps>(({
  as,
  text,
  size = 'default',
  variant = 'gold',
  icon: Icon = ArrowUpRight,
  href,
  className,
  children,
  ...props
}, ref) => {
  const content = children || text;

  const innerContent = (
    <>
      {/* Left sliding arrow / icon */}
      <Icon className="flow-arr-left" aria-hidden="true" />

      {/* Center text */}
      <span className="flow-text">
        {content}
      </span>

      {/* Expanding flow circle */}
      <span className="flow-circle" aria-hidden="true" />

      {/* Right sliding arrow / icon */}
      <Icon className="flow-arr-right" aria-hidden="true" />
    </>
  );

  const combinedClassName = cn(
    "flow-btn group",
    size === 'compact' && "flow-btn-compact",
    variant === 'gold' && "flow-btn-gold",
    variant === 'outline' && "flow-btn-outline",
    variant === 'filled' && "flow-btn-filled",
    variant === 'light' && "flow-btn-light",
    className
  );

  if (href && as !== 'button') {
    return (
      <a
        ref={ref}
        href={href}
        data-flow-btn="true"
        className={combinedClassName}
        {...props}
      >
        {innerContent}
      </a>
    );
  }

  return (
    <button
      ref={ref}
      type={(props as any).type || "button"}
      data-flow-btn="true"
      className={combinedClassName}
      {...(props as any)}
    >
      {innerContent}
    </button>
  );
});

FlowButton.displayName = "FlowButton";

export default FlowButton;
