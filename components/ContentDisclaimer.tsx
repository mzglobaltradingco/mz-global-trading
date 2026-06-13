const DEFAULT_TEXT =
  "This content is provided for general information only and does not constitute legal, customs or compliance advice. Always verify requirements against your buyer specification, applicable regulations and your destination market before making commercial decisions.";

export default function ContentDisclaimer({
  text = DEFAULT_TEXT,
  className = "",
}: {
  text?: string;
  className?: string;
}) {
  return (
    <div className={`bg-amber-50 border-l-4 border-gold rounded-r-xl px-5 py-4 ${className}`}>
      <p className="text-amber-800 text-xs sm:text-sm leading-relaxed">
        <strong>Disclaimer:</strong> {text}
      </p>
    </div>
  );
}
