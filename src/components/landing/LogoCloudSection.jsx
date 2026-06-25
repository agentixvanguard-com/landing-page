import React from "react";
import { useTranslation } from "react-i18next";

const programLockupClass =
  "opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500";

function ProgramLink({ href, ariaLabel, children, className = "" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={`${programLockupClass} ${className}`}
    >
      {children}
    </a>
  );
}

export default function LogoCloudSection() {
  const { t } = useTranslation();

  return (
    <section className="relative py-12 overflow-hidden border-y border-cyan-500/10 bg-[#020617]/50">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="flex flex-col gap-10">
          {/* Tier 1: Backed by leaders and alumni from */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            <div className="md:w-1/3 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-300 leading-tight">
                {t("logoCloud.backedBy")}
              </h3>
            </div>
            <div className="md:w-2/3 flex flex-wrap justify-center md:justify-end items-center gap-8 sm:gap-12 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2">
                <div className="grid grid-cols-2 gap-0.5">
                  <div className="w-4 h-4 bg-[#F25022]" />
                  <div className="w-4 h-4 bg-[#7FBA00]" />
                  <div className="w-4 h-4 bg-[#00A4EF]" />
                  <div className="w-4 h-4 bg-[#FFB900]" />
                </div>
                <span className="text-xl font-semibold text-white tracking-tight">Microsoft</span>
              </div>
              <span className="text-2xl font-bold text-white tracking-tighter">amazon</span>
              <span className="text-2xl font-ProductSans font-medium text-white tracking-tight">Google</span>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

          {/* Tier 2: Cloud & AI startup ecosystems */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            <div className="md:w-1/3 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-300 leading-tight">
                {t("logoCloud.supportedByCloud")}
              </h3>
            </div>
            <div className="md:w-2/3 flex flex-wrap justify-center md:justify-end items-center gap-6 sm:gap-10">
              <ProgramLink href="https://www.nvidia.com/en-us/deep-learning-ai/startups/" ariaLabel="NVIDIA Inception Program">
                <div className="flex flex-col items-center">
                  <span className="text-[#76B900] font-black tracking-widest text-lg">NVIDIA</span>
                  <span className="text-[0.6rem] text-slate-400 uppercase tracking-widest">Inception Program</span>
                </div>
              </ProgramLink>
              <ProgramLink href="https://startup.google.com/" ariaLabel="Google for Startups">
                <div className="flex items-center gap-1">
                  <span className="text-lg font-ProductSans font-medium text-white">Google</span>
                  <span className="text-xs text-slate-400">for Startups</span>
                </div>
              </ProgramLink>
              <ProgramLink href="https://aws.amazon.com/startups" ariaLabel="AWS Activate">
                <div className="flex flex-col items-center">
                  <span className="text-[#FF9900] font-black tracking-tight text-xl">aws</span>
                  <span className="text-[0.6rem] text-slate-400 uppercase tracking-widest">Activate</span>
                </div>
              </ProgramLink>
              <ProgramLink href="https://www.microsoft.com/startups" ariaLabel="Microsoft for Startups Founders Hub">
                <div className="flex flex-col items-center">
                  <span className="text-[#00A4EF] font-bold text-sm">Microsoft for Startups</span>
                  <span className="text-[0.6rem] text-slate-400 uppercase tracking-widest">Founders Hub</span>
                </div>
              </ProgramLink>
            </div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-800/60 to-transparent" />

          {/* Tier 3: Dev tools & startup grants */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
            <div className="md:w-1/3 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-300 leading-tight">
                {t("logoCloud.supportedByTools")}
              </h3>
            </div>
            <div className="md:w-2/3 flex flex-wrap justify-center md:justify-end items-center gap-6 sm:gap-10">
              <ProgramLink href="https://github.com/enterprise/startups" ariaLabel="GitHub for Startups">
                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold text-white tracking-tight">GitHub</span>
                  <span className="text-[0.6rem] text-slate-400 uppercase tracking-widest">for Startups</span>
                </div>
              </ProgramLink>
              <ProgramLink href="https://www.datadoghq.com/partner/datadog-for-startups/" ariaLabel="Datadog for Startups">
                <div className="flex flex-col items-center">
                  <span className="text-[#632CA6] font-bold text-sm tracking-tight">Datadog</span>
                  <span className="text-[0.6rem] text-slate-400 uppercase tracking-widest">for Startups</span>
                </div>
              </ProgramLink>
              <ProgramLink href="https://linear.app/startups" ariaLabel="Linear for Startups">
                <div className="flex flex-col items-center">
                  <span className="text-[#5E6AD2] font-bold text-sm tracking-tight">Linear</span>
                  <span className="text-[0.6rem] text-slate-400 uppercase tracking-widest">for Startups</span>
                </div>
              </ProgramLink>
              <a
                href="https://elevenlabs.io/startup-grants"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ElevenLabs Startup Grants"
                className="opacity-90 hover:opacity-100 transition-opacity duration-300"
              >
                <img
                  src="https://eleven-public-cdn.elevenlabs.io/payloadcms/cy7rxce8uki-IIElevenLabsGrants%201.webp"
                  alt="ElevenLabs Startup Grants"
                  className="w-[180px] sm:w-[220px] h-auto"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
