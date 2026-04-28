import type { HTMLAttributes, ReactNode } from 'react';
import './ui.css';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  pad?: boolean;
}

export function Card({ children, pad, className = '', ...rest }: CardProps) {
  return (
    <div
      className={`x-card ${pad ? 'x-card--pad' : ''} ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}
