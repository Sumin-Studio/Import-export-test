import Link from "next/link";

export default function NotFound() {
  return (
    <div className="xui-padding-vertical-large">
      <div className="xui-page-width-fluid xui-padding-horizontal-large">
        <h1 className="xui-heading-large xui-margin-bottom-small">
          Page not found
        </h1>
        <p className="xui-text-minor xui-margin-bottom-medium">
          The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link href="/" className="xui-link">
          ← Back to checkout preview
        </Link>
      </div>
    </div>
  );
}
