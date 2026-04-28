import { AppWindow } from "lucide-react";
import type { AppEntry } from "~/types/apps";
import { normalizeUrl } from "~/utils/url";
import styles from "./Sidebar.module.css";

interface SidebarProps {
  apps: Array<{ key: string; entry: AppEntry }>;
}

export function Sidebar({ apps }: SidebarProps) {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.sectionTitle}>Apps</div>
      <ul className={styles.menu}>
        {apps.map(({ key, entry }) => {
          const disabled = !entry.url;
          const href = entry.url ? normalizeUrl(entry.url) : undefined;

          return (
            <li key={key}>
              {disabled ? (
                <span
                  className={[styles.menuItem, styles.menuItemDisabled]
                    .join(" ")}
                >
                  <AppWindow size={16} />
                  {entry.name}
                </span>
              ) : (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.menuItem}
                >
                  <AppWindow size={16} />
                  {entry.name}
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
