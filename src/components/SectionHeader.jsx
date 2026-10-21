export function SectionHeader({ index, label, aside, title, id }) {
  return (
    <header className="section-header" data-reveal>
      <div className="section-topline">
        <span className="section-index">{index}</span>
        <span className="section-label">{label}</span>
        {aside ? <span className="section-aside">{aside}</span> : null}
      </div>
      {title ? (
        <h2 className="section-title" id={id}>
          {title}
        </h2>
      ) : null}
    </header>
  );
}
