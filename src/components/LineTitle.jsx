export default function LineTitle({ children, lines, id }) {
  return (
    <h1 id={id} className="line-title">
      {lines ? (
        lines.map((line) => (
          <span data-line key={line}>
            {line}
          </span>
        ))
      ) : (
        <span data-line>{children}</span>
      )}
    </h1>
  );
}
