import { useContext, useState } from "react";
import { useParams } from "react-router";
import { MESSAGES, REDIRECT_URL } from "~/config";
import { AuthGate, AuthContext } from "~/components/AuthGate";

const message = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

/**
 * Derive the redirect target from the /go/* splat parameter.
 * Returns the full URL and a display-friendly version (protocol stripped).
 */
function useRedirectUrl(): { url: string; displayUrl: string | null } {
  const { "*": splat } = useParams();
  if (!splat) return { url: REDIRECT_URL, displayUrl: null };

  try {
    const url = new URL(`https://${splat}`);
    if (url.protocol === "https:" || url.protocol === "http:") {
      return {
        url: url.toString(),
        displayUrl: url.toString().replace(/^https?:\/\//, "").replace(/\/$/, ""),
      };
    }
  } catch {
    // invalid URL — fall through to default
  }
  return { url: REDIRECT_URL, displayUrl: null };
}

const ERROR_MESSAGES: Record<string, { text: string; linkText: string; href: string }> = {
  not_configured: {
    text: "Sign in with Vercel isn't set up yet. Add VERCEL_APP_CLIENT_ID and VERCEL_APP_CLIENT_SECRET in the Vercel project settings.",
    linkText: "See setup guide",
    href: "https://vercel.com/docs/sign-in-with-vercel/getting-started",
  },
};

const DEFAULT_ERROR = {
  text: "Uh oh",
  linkText: "Go here instead",
  href: "https://example.org",
};

function stripProtocol(input: string): string {
  return input.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function UrlComposer() {
  const [inputValue, setInputValue] = useState("");
  const [composedUrl, setComposedUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  function handleOpen() {
    const stripped = stripProtocol(inputValue.trim());
    if (!stripped) return;
    setComposedUrl(`https://splash-xro.vercel.app/go/${stripped}`);
    setCopied(false);
  }

  function handleCopy() {
    if (!composedUrl) return;
    navigator.clipboard.writeText(composedUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (composedUrl) {
    return (
      <div className="url-composer">
        <p className="url-composer-label">Here's your URL</p>
        <p className="url-composer-result">{composedUrl}</p>
        <button className="copy-button" onClick={handleCopy} type="button">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <rect x="5" y="5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 5V3.5A1.5 1.5 0 0 0 9.5 2h-6A1.5 1.5 0 0 0 2 3.5v6A1.5 1.5 0 0 0 3.5 11H5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    );
  }

  return (
    <div className="url-composer">
      <p className="url-composer-label">What Vercel site would you like to open?</p>
      <div className="url-input-row">
        <input
          type="text"
          className="url-input"
          placeholder="example-xro.vercel.app"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleOpen(); }}
        />
        <button className="open-button" onClick={handleOpen} type="button">
          Open this
        </button>
      </div>
    </div>
  );
}

function ErrorContent() {
  const { errorReason } = useContext(AuthContext);
  const info = (errorReason && ERROR_MESSAGES[errorReason]) || DEFAULT_ERROR;

  return (
    <div className="error-content">
      <p>{info.text}</p>
      <a href={info.href} className="open-button">
        {info.linkText}
      </a>
    </div>
  );
}

export default function Home() {
  const { url: redirectUrl, displayUrl } = useRedirectUrl();
  const isGoRoute = displayUrl !== null;

  return (
    <div className="page">
      <div className="center">
        <p className="message">
          {message}
        </p>
        <AuthGate loginText="Sign in with Vercel">
          <AuthGate.LogIn>
            <p style={{ textAlign: "center" }}>To open you need a Vercel login.<br />Proceed if you have one, or <a href="https://xero.atlassian.net/wiki/x/RwHDWT8" target="_blank" rel="noopener noreferrer">get one here</a>.</p>
          </AuthGate.LogIn>
          <AuthGate.LoggedIn>
            {isGoRoute ? (
              <>
                <p className="go-destination">Let's go to: {displayUrl}</p>
                <a href={redirectUrl} className="open-button">
                  Open
                </a>
              </>
            ) : (
              <UrlComposer />
            )}
          </AuthGate.LoggedIn>
          <AuthGate.Error>
            <ErrorContent />
          </AuthGate.Error>
        </AuthGate>
      </div>

      <div className="bottom-tag">
        <span className="sensitive-tag">Sensitive(np)</span>
      </div>
    </div>
  );
}
