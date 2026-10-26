export function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      ↗
    </span>
  );
}
export default function Button({
  href,
  children,
  secondary = false,
  ...props
}) {
  return (
    <a href={href} className={secondary ? 'text-link' : 'button'} {...props}>
      {children}
      {secondary ? (
        <Arrow />
      ) : (
        <span className="button-arrow-orb" aria-hidden="true">
          <span className="button-arrow-track">
            <span>↗</span>
            <span>↗</span>
          </span>
        </span>
      )}
    </a>
  );
}
