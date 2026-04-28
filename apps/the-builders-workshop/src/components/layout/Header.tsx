"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/providers/auth-provider";
import styles from "./Header.module.css";

export function Header() {
  const [userOpen, setUserOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);
  const { user, isLoaded } = useAuth();

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
        <Link href="/getting-started" className={styles.title}>
          The Builders Workshop
        </Link>
        {isLoaded && user && (
          <UserInfo
            userOpen={userOpen}
            setUserOpen={setUserOpen}
            userRef={userRef}
          />
        )}
      </div>
    </header>
  );
}

function UserInfo({
  userOpen,
  setUserOpen,
  userRef,
}: {
  userOpen: boolean;
  setUserOpen: (v: boolean) => void;
  userRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { user, signOut } = useAuth();

  if (!user) return null;

  const displayName = user.email || "User";
  const fullName = user.user_metadata?.full_name;

  return (
    <div className={styles.userContainer} ref={userRef}>
      <button
        className={styles.userEmail}
        onClick={() => setUserOpen(!userOpen)}
        aria-expanded={userOpen}
      >
        {displayName}
      </button>
      {userOpen && (
        <div className={styles.userPopover}>
          {fullName && (
            <div className={styles.userDetail}>
              <span className={styles.userLabel}>Name</span>
              <span className={styles.userValue}>{fullName}</span>
            </div>
          )}
          <div className={styles.userDetail}>
            <span className={styles.userLabel}>Email</span>
            <span className={styles.userValue}>{user.email || "\u2014"}</span>
          </div>
          <div className={styles.popoverDivider} />
          <button
            type="button"
            className={styles.signOutButton}
            onClick={() =>
              signOut().then(() => window.location.assign("/sign-in"))
            }
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
