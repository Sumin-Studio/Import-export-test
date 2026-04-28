"use client";

import * as React from "react";

import XUIButton from "@xero/xui/react/button";

/**
 * Catches runtime errors in the app segment so the tab doesn’t stay on a blank 500.
 */
export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Payment simulator error:", error);
  }, [error]);

  return (
    <div className="xui-padding-vertical-large">
      <div className="xui-page-width-fluid xui-padding-horizontal-large">
        <h1 className="xui-heading-large xui-margin-bottom-small">
          Something went wrong
        </h1>
        <p className="xui-text-minor xui-margin-bottom-medium">
          {error.message || "An unexpected error occurred."}
        </p>
        <XUIButton type="button" variant="standard" onClick={() => reset()}>
          Try again
        </XUIButton>
      </div>
    </div>
  );
}
