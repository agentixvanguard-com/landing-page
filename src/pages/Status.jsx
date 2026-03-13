import React from "react";
import { Link } from "react-router-dom";

export default function Status() {
  return (
    <section className="min-h-screen bg-[#050a18] py-20">
      <div className="max-w-3xl mx-auto px-6 text-slate-300">
        <Link to="/" className="text-cyan-400 hover:text-cyan-300">← Back to home</Link>
        <h1 className="text-3xl font-bold text-white mt-8 mb-4">System Status</h1>
        <p>All core systems are currently operational. For incident details, contact support.</p>
      </div>
    </section>
  );
}
