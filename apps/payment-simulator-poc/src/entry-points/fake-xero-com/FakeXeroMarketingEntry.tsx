"use client";

import * as React from "react";
import Image from "next/image";

import { fakeXeroComConfig } from "./config";
import { PAYMENT_BRAND_LOGOS } from "./paymentBrands";
import styles from "./FakeXeroMarketingEntry.module.scss";

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
    >
      <path
        fill="currentColor"
        d="M19 19H5V5h6V3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-6h-2v6zM15 3v2h3.6L9.8 13.8l1.4 1.4L20 6.4V10h2V3h-7z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <span aria-hidden className={styles.featureIcon}>
      ✓
    </span>
  );
}

/**
 * Resolves the preview link. Uses NEXT_PUBLIC_APP_URL when the shell is opened on a
 * different host than the deployed POC (e.g. campaign site → app). Uses a same-origin
 * path when the browser is already on this app so the port matches (avoids .env vs `next dev -p`).
 */
function usePocPreviewHref(): string {
  const base = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "";
  const path = fakeXeroComConfig.pocPreviewPath;
  if (!base) return path;
  if (typeof window === "undefined") {
    return `${base}${path}`;
  }
  try {
    const envUrl = new URL(base);
    if (envUrl.origin === window.location.origin) return path;
    if (envUrl.hostname === window.location.hostname) return path;
  } catch {
    return `${base}${path}`;
  }
  return `${base}${path}`;
}

export function FakeXeroMarketingEntry() {
  const [promoVisible, setPromoVisible] = React.useState(true);
  const pocHref = usePocPreviewHref();

  return (
    <div className={styles.root}>
      {promoVisible ? (
        <div className={styles.promoBar}>
          <p className={styles.promoText}>
            Get <span className={styles.promoStrong}>95% off</span> your plan for
            your first 6 months when you buy by 31 March*{" "}
            <span className={styles.promoStrong}>Buy now</span>
          </p>
          <button
            type="button"
            className={styles.dismissBtn}
            onClick={() => setPromoVisible(false)}
          >
            Dismiss ✕
          </button>
        </div>
      ) : null}

      <header className={styles.navOuter}>
        <div className={styles.navInner}>
          <Image
            src="/xero-logo.png"
            alt="Xero"
            width={88}
            height={28}
            className={styles.logo}
            priority
          />
          <nav className={styles.navLinks} aria-label="Primary">
            <span className={styles.navLink}>
              Features <span className={styles.chevron}>▼</span>
            </span>
            <span className={styles.navLink}>Pricing</span>
            <span className={styles.navLink}>
              For small business <span className={styles.chevron}>▼</span>
            </span>
            <span className={styles.navLink}>
              For accountants &amp; bookkeepers{" "}
              <span className={styles.chevron}>▼</span>
            </span>
            <span className={styles.navLink}>
              Support <span className={styles.chevron}>▼</span>
            </span>
          </nav>
          <div className={styles.navActions}>
            <button type="button" className={styles.btnMint}>
              Try Xero for free
            </button>
            <button type="button" className={styles.btnGhost}>
              Log in
            </button>
          </div>
        </div>
      </header>

      <div className={styles.breadcrumbBar}>
        <div className={styles.breadcrumbInner}>
          Online accounting software &gt;{" "}
          <span className={styles.breadcrumbCurrent}>Invoicing</span>
        </div>
      </div>

      <section className={styles.hero}>
        <div>
          <h1 className={styles.heroTitle}>
            Your business, <span className={styles.accent}>paid</span> up to{" "}
            <span className={styles.accent}>2x faster</span>
          </h1>
          <div className={styles.heroActions}>
            <button type="button" className={styles.btnMint}>
              Try Xero for free
            </button>
            <span className={styles.linkUnderline} role="presentation">
              Compare plans and pricing
            </span>
          </div>
          <p className={styles.heroLead}>
            When customers pay by card or digital wallet straight from the invoice,
            businesses like yours get paid up to twice as fast — so you spend less
            time chasing payments.
          </p>
        </div>

        <aside className={styles.heroCard} aria-label="Checkout experience preview">
          <div className={styles.heroCardCopy}>
            <h2 className={styles.heroCardTitle}>{fakeXeroComConfig.heroCardTitle}</h2>
            <p className={styles.heroCardBody}>{fakeXeroComConfig.heroCardBody}</p>
            <ul className={styles.payRow} aria-label="Accepted payment methods">
              {PAYMENT_BRAND_LOGOS.map(({ src, label }) => (
                <li key={src} className={styles.payLogoItem}>
                  {/* eslint-disable-next-line @next/next/no-img-element -- SVG marks need intrinsic aspect; Next/Image fixed box distorts */}
                  <img src={src} alt="" className={styles.payLogo} loading="lazy" />
                  <span className={styles.visuallyHidden}>{label}</span>
                </li>
              ))}
            </ul>
            <div className={styles.ctaRow}>
              <a
                className={styles.btnPrimary}
                href={pocHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {fakeXeroComConfig.pocCtaLabel}
                <ExternalLinkIcon className={styles.externalIcon} />
              </a>
            </div>
          </div>
          <div className={styles.phoneCol}>
            <span className={styles.exampleBadge}>Example</span>
            <div className={styles.phoneFrame}>
              {/* Native img: full asset aspect ratio, no crop; frame wraps intrinsic size */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={fakeXeroComConfig.heroPhoneMockupSrc}
                alt="Example invoice with online payment options on a phone"
                width={fakeXeroComConfig.heroPhoneMockupWidth}
                height={fakeXeroComConfig.heroPhoneMockupHeight}
                className={styles.phoneImage}
                decoding="async"
                fetchPriority="high"
              />
            </div>
          </div>
        </aside>
      </section>

      <section className={styles.features} aria-labelledby="features-heading">
        <div className={styles.featuresInner}>
          <h2 id="features-heading" className={styles.featuresTitle}>
            Online invoicing that saves you and your customers&apos; time
          </h2>
          <p className={styles.featuresSub}>
            Xero invoicing software makes billing easier – for you and your clients.
          </p>
          <div className={styles.featureGrid}>
            <div className={styles.featureCard}>
              <CheckIcon />
              <p className={styles.featureText}>Personalised invoices</p>
            </div>
            <div className={styles.featureCard}>
              <CheckIcon />
              <p className={styles.featureText}>Automated invoice reminders</p>
            </div>
            <div className={styles.featureCard}>
              <CheckIcon />
              <p className={styles.featureText}>Convenient payment solutions</p>
            </div>
          </div>
        </div>
      </section>

      <p className={styles.footerNote}>{fakeXeroComConfig.disclaimerLine}</p>
    </div>
  );
}
