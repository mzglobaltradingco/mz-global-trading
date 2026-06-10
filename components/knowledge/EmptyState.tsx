interface EmptyStateProps {
  query: string;
  category: string;
  onReset: () => void;
}

export default function EmptyState({ query, category, onReset }: EmptyStateProps) {
  return (
    <div className="py-20 text-center">
      <div className="w-14 h-14 rounded-2xl bg-navy-900/5 flex items-center justify-center mx-auto mb-5">
        <svg className="w-7 h-7 text-navy-900/25" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-navy-900 font-bold text-lg mb-2">No articles found</h3>
      <p className="text-gray-500 text-sm max-w-sm mx-auto mb-6">
        {query && category !== "All"
          ? `No results for "${query}" in ${category}.`
          : query
          ? `No results for "${query}".`
          : `No articles in ${category} yet.`}
        {" "}Try adjusting your search or filter.
      </p>
      <button
        onClick={onReset}
        className="inline-flex items-center justify-center px-6 py-2.5 bg-navy-900 text-white text-sm font-semibold rounded hover:bg-navy-800 transition-colors"
      >
        Clear filters
      </button>
    </div>
  );
}
