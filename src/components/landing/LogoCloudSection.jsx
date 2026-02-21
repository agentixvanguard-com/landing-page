import React from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

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
                                {t('logoCloud.backedBy')}
                            </h3>
                        </div>
                        <div className="md:w-2/3 flex flex-wrap justify-center md:justify-end items-center gap-8 sm:gap-12 opacity-80 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* Microsoft Logo Simulation */}
                            <div className="flex items-center gap-2">
                                <div className="grid grid-cols-2 gap-0.5">
                                    <div className="w-4 h-4 bg-[#F25022]"></div>
                                    <div className="w-4 h-4 bg-[#7FBA00]"></div>
                                    <div className="w-4 h-4 bg-[#00A4EF]"></div>
                                    <div className="w-4 h-4 bg-[#FFB900]"></div>
                                </div>
                                <span className="text-xl font-semibold text-white tracking-tight">Microsoft</span>
                            </div>
                            {/* Amazon Text */}
                            <span className="text-2xl font-bold text-white tracking-tighter">amazon</span>
                            {/* Google Text */}
                            <span className="text-2xl font-ProductSans font-medium text-white tracking-tight">Google</span>
                        </div>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-800 to-transparent" />

                    {/* Tier 2: Supported by */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
                        <div className="md:w-1/3 text-center md:text-left">
                            <h3 className="text-xl sm:text-2xl font-bold text-slate-300 leading-tight">
                                {t('logoCloud.supportedBy')}
                            </h3>
                        </div>
                        <div className="md:w-2/3 flex flex-wrap justify-center md:justify-end items-center gap-6 sm:gap-10 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                            {/* NVIDIA */}
                            <div className="flex flex-col items-center">
                                <span className="text-[#76B900] font-black tracking-widest text-lg">NVIDIA</span>
                                <span className="text-[0.6rem] text-slate-400 uppercase tracking-widest">Inception Program</span>
                            </div>
                            {/* Google for Startups */}
                            <div className="flex items-center gap-1">
                                <span className="text-lg font-ProductSans font-medium text-white">Google</span>
                                <span className="text-xs text-slate-400">for Startups</span>
                            </div>
                            {/* AWS */}
                            <div className="flex flex-col items-center">
                                <span className="text-[#FF9900] font-black tracking-tight text-xl">aws</span>
                                <span className="text-[0.6rem] text-slate-400 uppercase">Startup Programs</span>
                            </div>
                            {/* Microsoft Founders Hub */}
                            <div className="flex flex-col items-center">
                                <span className="text-[#00A4EF] font-bold text-sm">Microsoft for Startups</span>
                                <span className="text-[0.6rem] text-slate-400 uppercase tracking-widest">Founders Hub</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
