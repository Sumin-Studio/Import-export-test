import type { ReactNode } from 'react';
import './ui.css';

type Tone = 'neutral' | 'info' | 'warning' | 'critical' | 'success';

interface BadgeProps {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}

export function Badge({ tone = 'neutral', children, className = '' }: BadgeProps) {
  return (
    <span className={`x-badge x-badge--${tone} ${className}`.trim()}>{children}</span>
  );
}
