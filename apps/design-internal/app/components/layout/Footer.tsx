import { Github } from "lucide-react";
import styles from "./Footer.module.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerLeft}>
          <span className={styles.copyright}>&copy; Xero {currentYear}</span>
          <span className={styles.sensitiveTag}>Sensitive(np)</span>
        </div>
        <a
          href="https://github.com/xero-internal-actions-poc/design-internal"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.githubLink}
        >
          <Github size={14} />
          Start prototyping on GitHub
        </a>
      </div>
    </footer>
  );
}
