"use client";

import * as React from "react";
import Link from "next/link";

import XUIBanner, {
  XUIBannerMessage,
} from "@xero/xui/react/banner";
import XUIButton from "@xero/xui/react/button";
import XUIPanel, {
  XUIPanelHeader,
  XUIPanelSection,
} from "@xero/xui/react/panel";
import { XUIColumn, XUIRow } from "@xero/xui/react/structural";

import checkCircleIcon from "@xero/xui-icon/icons/check-circle";

type Experience = "basic" | "optimized";

const SCENARIOS: Record<
  Experience,
  { label: string; daysToPay: string; completion: string; blurb: string }
> = {
  basic: {
    label: "Typical checkout",
    daysToPay: "18 days",
    completion: "62%",
    blurb:
      "Extra steps, unclear totals, and switching devices often mean customers pay later—or not at all.",
  },
  optimized: {
    label: "Optimized checkout",
    daysToPay: "6 days",
    completion: "89%",
    blurb:
      "Mobile-first flow, saved details, and instant confirmation help customers pay while intent is high.",
  },
};

export function CheckoutSimulator() {
  const [experience, setExperience] = React.useState<Experience>("basic");

  const active = SCENARIOS[experience];

  return (
    <div className="xui-padding-vertical-xlarge">
      <div className="xui-page-width-standard xui-padding-horizontal-large">
        <header className="xui-margin-bottom-large">
          <p className="xui-text-minor xui-margin-bottom-2xsmall">
            <Link href="/preview">← One-time invoice preview</Link>
          </p>
          <p className="xui-text-minor xui-margin-bottom-2xsmall">
            Proof of concept
          </p>
          <h1 className="xui-heading-large xui-margin-bottom-xsmall">
            Get paid faster with a better checkout
          </h1>
          <p className="xui-text-deemphasis xui-max-width">
            Toggle the experience to show business owners how a streamlined payer
            journey can shorten time-to-pay. Figures are illustrative for
            storytelling—not live data.
          </p>
        </header>

        <XUIRow className="xui-margin-bottom-large">
          <XUIColumn gridColumns={12}>
            <div className="xui-u-flex xui-u-flex-wrap xui-u-flex-gap-small">
              <XUIButton
                fullWidth="never"
                size="small"
                variant={experience === "basic" ? "main" : "standard"}
                onClick={() => setExperience("basic")}
              >
                Typical checkout
              </XUIButton>
              <XUIButton
                fullWidth="never"
                leftIcon={checkCircleIcon}
                size="small"
                variant={experience === "optimized" ? "main" : "standard"}
                onClick={() => setExperience("optimized")}
              >
                Optimized checkout
              </XUIButton>
            </div>
          </XUIColumn>
        </XUIRow>

        <XUIRow>
          <XUIColumn gridColumns={7}>
            <XUIPanel>
              <XUIPanelHeader>
                <h2 className="xui-heading-small xui-margin-none">
                  Payer view — {active.label.toLowerCase()}
                </h2>
              </XUIPanelHeader>
              <XUIPanelSection>
                <div className="xui-margin-bottom-small">
                  <p className="xui-text-minor xui-margin-bottom-2xsmall">
                    Acme Studio Ltd · Invoice #1042
                  </p>
                  <p className="xui-heading-medium xui-margin-none">$480.00 NZD</p>
                  <p className="xui-text-deemphasis xui-margin-top-2xsmall">
                    Due 12 Apr 2026
                  </p>
                </div>

                {experience === "basic" && (
                  <XUIBanner sentiment="neutral">
                    <XUIBannerMessage>
                      You are about to leave this page to complete payment on
                      another site. Your progress won&apos;t be saved.
                    </XUIBannerMessage>
                  </XUIBanner>
                )}

                {experience === "optimized" && (
                  <XUIBanner sentiment="neutral">
                    <XUIBannerMessage>
                      Pay here in one step—card details can be saved securely for
                      next time.
                    </XUIBannerMessage>
                  </XUIBanner>
                )}

                <div
                  className="xui-margin-top-large"
                  style={experience === "basic" ? { opacity: 0.55 } : undefined}
                >
                  <p className="xui-text-minor xui-margin-bottom-2xsmall">
                    {experience === "basic"
                      ? "Card number"
                      : "Card (Apple Pay / Google Pay available)"}
                  </p>
                  <div
                    className="xui-padding-large"
                    style={{
                      border: "1px dashed rgba(0,0,0,0.15)",
                      borderRadius: 8,
                      minHeight: 120,
                    }}
                  >
                    <span className="xui-text-deemphasis">
                      {experience === "basic"
                        ? "Hosted payment form placeholder — extra redirects"
                        : "Embedded fields + wallet buttons — fewer taps"}
                    </span>
                  </div>
                </div>

                <div className="xui-margin-top-large">
                  <XUIButton
                    fullWidth="always"
                    variant="main"
                    onClick={() => undefined}
                  >
                    Pay now
                  </XUIButton>
                </div>
              </XUIPanelSection>
            </XUIPanel>
          </XUIColumn>

          <XUIColumn gridColumns={5}>
            <XUIPanel>
              <XUIPanelHeader>
                <h2 className="xui-heading-small xui-margin-none">
                  What this means for the business
                </h2>
              </XUIPanelHeader>
              <XUIPanelSection>
                <dl className="xui-margin-none">
                  <div className="xui-margin-bottom-medium">
                    <dt className="xui-text-minor">Median time to pay</dt>
                    <dd className="xui-heading-medium xui-margin-none">
                      {active.daysToPay}
                    </dd>
                  </div>
                  <div className="xui-margin-bottom-medium">
                    <dt className="xui-text-minor">Share of invoices paid</dt>
                    <dd className="xui-heading-medium xui-margin-none">
                      {active.completion}
                    </dd>
                  </div>
                </dl>
                <p className="xui-text-deemphasis">{active.blurb}</p>
              </XUIPanelSection>
            </XUIPanel>
          </XUIColumn>
        </XUIRow>
      </div>
    </div>
  );
}
