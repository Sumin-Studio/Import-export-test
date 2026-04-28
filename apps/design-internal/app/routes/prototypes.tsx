import { useState } from "react";
import { useOutletContext } from "react-router";
import { ExternalLink, Link, User, Calendar, Github } from "lucide-react";
import type { AppsData, AppEntry } from "~/types/apps";
import { compareDatesDesc } from "~/utils/dates";
import { normalizeUrl } from "~/utils/url";
import { Card } from "~/components/ui/Card";
import { Button } from "~/components/ui/Button";
import styles from "./prototypes.module.css";

interface LayoutContext {
  apps: AppsData;
}

function PrototypeCard({
  entry,
  disabled,
}: {
  entry: AppEntry;
  disabled: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const url = entry.url ? normalizeUrl(entry.url) : "";

  function handleCopy() {
    if (!url) return;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <Card className={disabled ? styles.disabledCard : undefined}>
      <div className={styles.protoCard}>
        <div className={styles.protoInfo}>
          <h3 className={styles.protoName}>{entry.name}</h3>
          {entry.description && (
            <p className={styles.protoDescription}>{entry.description}</p>
          )}
        </div>
        <div className={styles.protoRight}>
          <div className={styles.protoMeta}>
            {entry.authors.length > 0 && (
              <span className={styles.protoAuthor}>
                <User size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
                {entry.authors.join(", ")}
              </span>
            )}
            {entry.latestUpdate && (
              <span className={styles.protoDate}>
                <Calendar size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} />
                {entry.latestUpdate}
              </span>
            )}
          </div>
          <div className={styles.protoActions}>
            {entry.repositoryUrl && (
              <Button
                as="a"
                variant="secondary"
                href={entry.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                title="View source repository"
              >
                <Github size={14} />
                Source
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={handleCopy}
              disabled={disabled}
              title="Copy link"
            >
              <Link size={14} />
              {copied ? "Copied!" : "Copy link"}
            </Button>
            <Button
              as="a"
              variant="primary"
              href={url || undefined}
              target="_blank"
              rel="noopener noreferrer"
              disabled={disabled}
            >
              <ExternalLink size={14} />
              Open
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function Prototypes() {
  const { apps } = useOutletContext<LayoutContext>();

  const prototypes = Object.entries(apps)
    .filter(
      ([key, entry]) =>
        key !== "design-internal" &&
        !entry.tags.includes("deleted") &&
        entry.tags.includes("prototype")
    )
    .sort(([, a], [, b]) => compareDatesDesc(a.latestUpdate, b.latestUpdate))
    .map(([key, entry]) => ({ key, entry }));

  return (
    <div className={styles.page}>
      <Card className={styles.welcomeCard}>
        <h1 className={styles.welcomeTitle}>Welcome to the playground</h1>
        <p className={styles.welcomeText}>
          Explore prototypes and tools built by the design team.<br/>
          Read <a href="https://xero.atlassian.net/wiki/spaces/D/pages/271895593735/Design+Playground+prototype+with+Cursor+GitHub+Vercel">here</a> to start building, or navigate to "Learn" above for guided steps.
        </p>
      </Card>

      <h2 className={styles.sectionTitle}>Prototypes</h2>

      <div className={styles.prototypeList}>
        {prototypes.length === 0 && (
          <p style={{ color: "var(--color-text-tertiary)" }}>
            No prototypes available yet.
          </p>
        )}
        {prototypes.map(({ key, entry }) => (
          <PrototypeCard key={key} entry={entry} disabled={!entry.url} />
        ))}
      </div>
    </div>
  );
}
