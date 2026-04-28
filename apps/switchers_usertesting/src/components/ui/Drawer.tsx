import { useEffect, useId, type ReactNode } from 'react';
import './ui.css';

interface DrawerProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
  /** Extra class on the scrollable body (e.g. flush layout for chat). */
  bodyClassName?: string;
}

export function Drawer({ open, title, onClose, children, footer, bodyClassName }: DrawerProps) {
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
    <>
      <div
        className="x-drawer-overlay"
        aria-hidden
        onMouseDown={onClose}
      />
      <aside
        className="x-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="x-drawer__header">
          <h2 id={titleId} style={{ margin: 0, fontSize: '1.125rem' }}>
            {title}
          </h2>
          <button
            type="button"
            className="x-icon-btn"
            aria-label="Close panel"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <div className={`x-drawer__body ${bodyClassName ?? ''}`.trim()}>{children}</div>
        {footer ? <div className="x-drawer__footer">{footer}</div> : null}
      </aside>
    </>
  );
}
