import React from "react";
import { Link } from "react-router-dom";

export default function Support() {
  return (
    <section className="min-h-screen bg-[#050a18] py-20">
      <div className="max-w-3xl mx-auto px-6 text-slate-300">
        <Link to="/" className="text-cyan-400 hover:text-cyan-300">← Back to home</Link>
        <h1 className="text-3xl font-bold text-white mt-8 mb-4">Support</h1>
        <p>Need help? Email <a className="text-cyan-400" href="mailto:support@agentixvanguard.com">support@agentixvanguard.com</a>.</p>
      </div>
    </section>
  );
}
