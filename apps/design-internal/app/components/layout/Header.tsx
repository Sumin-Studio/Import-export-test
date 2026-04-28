import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { Menu, X } from "lucide-react";
import styles from "./Header.module.css";
import { getUser } from "~/utils/user";
import type { User } from "~/types/apps";
import logo from "~/assets/design-playground.svg";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [userOpen, setUserOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getUser().then(setUser);
    // Expose getUser on window for console debugging
    (window as unknown as Record<string, unknown>).getUser = getUser;
  }, []);

  // Close popover on outside click
  useEffect(() => {
    if (!userOpen) return;
    function handleClick(e: MouseEvent) {
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [userOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <img src={logo} alt="Design Playground" className={styles.logo} />
        <span className={styles.title}>Design Playground</span>
        <span className={styles.divider} />
        <nav className={[styles.nav, menuOpen ? styles.navOpen : ""].filter(Boolean).join(" ")}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              [styles.navLink, isActive ? styles.navLinkActive : ""]
                .filter(Boolean)
                .join(" ")
            }
            onClick={() => setMenuOpen(false)}
          >
            Prototype
          </NavLink>
          <a
            href="https://the-builders-workshop-xro.vercel.app/"
            className={styles.navLink}
            onClick={() => setMenuOpen(false)}
          >
            Learn
          </a>
          {/* <NavLink
            to="/settings"
            className={({ isActive }) =>
              [styles.navLink, isActive ? styles.navLinkActive : ""]
                .filter(Boolean)
                .join(" ")
            }
            onClick={() => setMenuOpen(false)}
          >
            Settings
          </NavLink> */}
        </nav>
        {user && Object.keys(user).length > 0 && (
          <div className={styles.userContainer} ref={userRef}>
            <button
              className={styles.userEmail}
              onClick={() => setUserOpen(!userOpen)}
              aria-expanded={userOpen}
            >
              {String(user.username || user.email || user.userId || "User")}
            </button>
            {userOpen && (
              <div className={styles.userPopover}>
                {Object.entries(user).map(([key, value]) => (
                  <div key={key} className={styles.userDetail}>
                    <span className={styles.userLabel}>{key}</span>
                    <span className={styles.userValue}>{String(value)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        <button
          className={styles.menuToggle}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
}
