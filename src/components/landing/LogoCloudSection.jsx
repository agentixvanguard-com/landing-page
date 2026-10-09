import React from "react";
import { useTranslation } from "react-i18next";

function BrandIcon({ file, className = "h-7 w-7 sm:h-8 sm:w-8" }) {
  return (
    <img
      src={`/brands/${file}`}
      alt=""
      width={32}
      height={32}
      loading="lazy"
      decoding="async"
      className={`${className} object-contain shrink-0`}
      aria-hidden="true"
    />
  );
}

function BrandLockup({ href, ariaLabel, icon, name, caption, nameClass = "text-white" }) {
  const content = (
    <div className="flex flex-col items-center gap-1.5 min-w-[5.5rem]">
      <div className="flex items-center gap-2.5">
        {icon}
        <span className={`text-base sm:text-lg font-semibold tracking-tight ${nameClass}`}>{name}</span>
      </div>
      {caption ? (
        <span className="text-[0.6rem] text-slate-500 uppercase tracking-[0.18em] text-center leading-tight">
          {caption}
        </span>
      ) : null}
    </div>
  );

  if (!href) {
    return (
      <div className="opacity-80 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
        {content}
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel || name}
      className="opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500"
    >
      {content}
    </a>
  );
}

function Tier({ title, children }) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">
      <div className="md:w-1/3 text-center md:text-left">
        <h3 className="text-lg sm:text-xl font-semibold text-slate-300 leading-tight">{title}</h3>
      </div>
      <div className="md:w-2/3 flex flex-wrap justify-center md:justify-end items-start gap-x-8 gap-y-6 sm:gap-x-10">
        {children}
      </div>
    </div>
  );
}

export default function LogoCloudSection() {
  const { t } = useTranslation();

  return (
    <section className="relative py-14 sm:py-16 overflow-hidden border-y border-cyan-500/10 bg-[#020617]/50">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 to-transparent opacity-50" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="flex flex-col gap-12">
          <Tier title={t("logoCloud.backedBy")}>
            <BrandLockup
              icon={<BrandIcon file="microsoft.svg" />}
              name="Microsoft"
            />
            <BrandLockup
              icon={<BrandIcon file="amazon.svg" />}
              name="amazon"
              nameClass="text-white lowercase tracking-tighter"
            />
            <BrandLockup
              icon={<BrandIcon file="google.svg" />}
              name="Google"
              nameClass="text-white font-medium"
            />
          </Tier>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

          <Tier title={t("logoCloud.supportedByCloud")}>
            <BrandLockup
              href="https://www.nvidia.com/en-us/deep-learning-ai/startups/"
              ariaLabel="NVIDIA Inception Program"
              icon={<BrandIcon file="nvidia.svg" />}
              name="NVIDIA"
              nameClass="text-[#76B900] font-black tracking-widest"
              caption="Inception Program"
            />
            <BrandLockup
              href="https://startup.google.com/"
              ariaLabel="Google for Startups"
              icon={<BrandIcon file="google.svg" />}
              name="Google"
              caption="for Startups"
            />
            <BrandLockup
              href="https://aws.amazon.com/startups"
              ariaLabel="AWS Activate"
              icon={<BrandIcon file="amazonwebservices.svg" />}
              name="AWS"
              nameClass="text-[#FF9900] font-black tracking-tight"
              caption="Activate"
            />
            <BrandLockup
              href="https://www.microsoft.com/startups"
              ariaLabel="Microsoft for Startups Founders Hub"
              icon={<BrandIcon file="microsoft.svg" />}
              name="Microsoft"
              caption="Founders Hub"
            />
          </Tier>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-800/60 to-transparent" />

          <Tier title={t("logoCloud.supportedByTools")}>
            <BrandLockup
              href="https://github.com/enterprise/startups"
              ariaLabel="GitHub for Startups"
              icon={<BrandIcon file="github.svg" />}
              name="GitHub"
              caption="for Startups"
            />
            <BrandLockup
              href="https://www.datadoghq.com/partner/datadog-for-startups/"
              ariaLabel="Datadog for Startups"
              icon={<BrandIcon file="datadog.svg" />}
              name="Datadog"
              nameClass="text-[#A78BFA] font-semibold"
              caption="for Startups"
            />
            <BrandLockup
              href="https://linear.app/startups"
              ariaLabel="Linear for Startups"
              icon={<BrandIcon file="linear.svg" />}
              name="Linear"
              nameClass="text-[#8B93E8] font-semibold"
              caption="for Startups"
            />
            <BrandLockup
              href="https://elevenlabs.io/startup-grants"
              ariaLabel="ElevenLabs Startup Grants"
              icon={<BrandIcon file="elevenlabs.svg" />}
              name="ElevenLabs"
              caption="Startup Grants"
            />
          </Tier>
        </div>
      </div>
    </section>
  );
}
