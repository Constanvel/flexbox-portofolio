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
      <Arrow />
    </a>
  );
}
