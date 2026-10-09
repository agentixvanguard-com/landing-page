import { ENV } from "@/config/site";

/**
 * Loads Google Analytics 4, LinkedIn Insight Tag and Meta Pixel — each one
 * only when its ID is configured — and exposes a single track() helper.
 */

function loadScript(src) {
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

export function initAnalytics() {
  if (typeof window === "undefined") return;

  if (ENV.gaId) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", ENV.gaId);
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${ENV.gaId}`);
  }

  if (ENV.linkedinPartnerId) {
    window._linkedin_partner_id = ENV.linkedinPartnerId;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(ENV.linkedinPartnerId);
    window.lintrk = window.lintrk || function lintrk(a, b) { (window.lintrk.q = window.lintrk.q || []).push([a, b]); };
    loadScript("https://snap.licdn.com/li.lms-analytics/insight.min.js");
  }

  if (ENV.metaPixelId) {
    const fbq = function fbq() {
      fbq.callMethod ? fbq.callMethod.apply(fbq, arguments) : fbq.queue.push(arguments);
    };
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    fbq.queue = [];
    window.fbq = window.fbq || fbq;
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
    window.fbq("init", ENV.metaPixelId);
    window.fbq("track", "PageView");
  }
}

/** Sends a conversion/interaction event to every configured provider. */
export function track(event, params = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
  if (event === "generate_lead" || event === "schedule_click") {
    window.fbq?.("track", event === "generate_lead" ? "Lead" : "Schedule", params);
    window.lintrk?.("track", { conversion_id: params.conversionId });
  }
}
