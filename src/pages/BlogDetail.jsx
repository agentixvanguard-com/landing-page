import React from "react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft } from "lucide-react";

const blogSlugs = [
  "ai-agent-roi-measuring-autonomy",
  "swarms-vs-chatbots-multi-agent-era",
  "ouroboros-protocol-adversarial-ai-security",
];

export default function BlogDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const items = t("blog.items", { returnObjects: true }) || [];
  const index = blogSlugs.indexOf(slug);
  const post = index >= 0 ? items[index] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-[#050a18] text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-3">Post not found</h1>
          <Link to="/" className="text-cyan-400 hover:text-cyan-300">Back to landing</Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-[#050a18] py-20">
      <div className="max-w-3xl mx-auto px-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 mb-10">
          <ArrowLeft className="w-4 h-4" />
          Back to home
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">{post.title}</h1>
        <div className="text-sm text-slate-500 mb-8">{post.date} • {post.tag}</div>
        <p className="text-slate-300 leading-relaxed">{post.description}</p>
      </div>
    </section>
  );
}
