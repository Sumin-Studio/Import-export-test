import type { ButtonHTMLAttributes, ReactNode } from 'react';
import './ui.css';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  block?: boolean;
  size?: 'md' | 'lg';
  children: ReactNode;
}

export function Button({
  variant = 'primary',
  block,
  size = 'md',
  className = '',
  type = 'button',
  ...rest
}: ButtonProps) {
  const classes = [
    'x-btn',
    `x-btn--${variant}`,
    block ? 'x-btn--block' : '',
    size === 'lg' ? 'x-btn--lg' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  return <button type={type} className={classes} {...rest} />;
}
