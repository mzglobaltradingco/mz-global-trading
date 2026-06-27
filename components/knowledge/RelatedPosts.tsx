import Link from "next/link";
import { formatDate } from "@/lib/knowledge";
import type { KnowledgePost } from "@/types/knowledge";

interface RelatedPostsProps {
  posts: KnowledgePost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16 pt-12 border-t border-gray-100">
      <p className="text-gold text-xs font-semibold tracking-[0.2em] uppercase mb-2">Continue Reading</p>
      <h2 className="text-navy-900 text-xl font-bold mb-8">Related Articles</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/knowledge/${post.slug}/`}
            aria-label={post.title}
            className="group block bg-white rounded-xl border border-gray-100 p-5 hover:border-gold/30 hover:shadow-md transition-all duration-200"
          >
            <span className="inline-block px-2 py-0.5 bg-gold/8 text-gold text-[10px] font-bold tracking-[0.12em] uppercase rounded border border-gold/15 mb-3">
              {post.category}
            </span>
            <h3 className="text-navy-900 font-bold text-sm leading-snug line-clamp-2 group-hover:text-gold transition-colors mb-2">
              {post.title}
            </h3>
            <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 mb-4">
              {post.excerpt}
            </p>
            <div className="flex items-center justify-between text-gray-500 text-xs pt-3 border-t border-gray-50">
              <span>{formatDate(post.date)}</span>
              <span>{post.readTime} min read</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
