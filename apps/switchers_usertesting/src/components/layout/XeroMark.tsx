import wordmarkUrl from '../../assets/xero-wordmark.png';

/** Xero wordmark — `size` is logo height (px); width follows the image aspect ratio. */
export function XeroMark({ size = 40 }: { size?: number }) {
  return (
    <img
      src={wordmarkUrl}
      alt=""
      className="x-xero-mark"
      style={{ height: size, width: 'auto' }}
      decoding="async"
      aria-hidden
    />
  );
}
