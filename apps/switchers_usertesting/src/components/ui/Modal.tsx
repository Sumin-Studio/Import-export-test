import { useEffect, useId, type ReactNode } from 'react';
import './ui.css';

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  /** Wider dialog for rich content (e.g. expert review). */
  size?: 'md' | 'lg';
}

export function Modal({ open, title, onClose, children, footer, size = 'md' }: ModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="x-modal-overlay"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`x-modal ${size === 'lg' ? 'x-modal--lg' : ''}`.trim()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="x-modal__header">
          <h2 id={titleId} style={{ margin: 0, fontSize: '1.125rem' }}>
            {title}
          </h2>
          <button
            type="button"
            className="x-icon-btn"
            aria-label="Close dialog"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className="x-modal__body">{children}</div>
        {footer ? <div className="x-modal__footer">{footer}</div> : null}
      </div>
    </div>
  );
}
