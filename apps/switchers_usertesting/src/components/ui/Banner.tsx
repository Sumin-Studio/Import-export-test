import type { ReactNode } from 'react';
import './ui.css';

type Variant = 'info' | 'warning';

interface BannerProps {
  variant?: Variant;
  children: ReactNode;
  title?: string;
}

export function Banner({ variant = 'info', children, title }: BannerProps) {
  return (
    <div className={`x-banner x-banner--${variant}`} role="status">
      <div style={{ flex: 1 }}>
        {title ? (
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{title}</div>
        ) : null}
        <div style={{ color: 'var(--x-color-text-secondary)' }}>{children}</div>
      </div>
    </div>
  );
}
