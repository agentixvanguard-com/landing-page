import { ENV, SITE } from "@/config/site";
import { track } from "@/lib/analytics";

/**
 * Submits a lead so the team receives it by email.
 *
 * Priority:
 * 1. VITE_LEAD_ENDPOINT (Formspree, Make, Zapier, n8n, own API…)
 * 2. FormSubmit → SITE.email / VITE_LEAD_EMAIL (no backend needed)
 *
 * First FormSubmit delivery requires confirming the inbox once
 * (FormSubmit sends an activation email to that address).
 */
export async function submitLead({
  source,
  name = "",
  email,
  company = "",
  message = "",
}) {
  const payload = {
    source,
    name,
    email,
    company,
    message,
    page: typeof window !== "undefined" ? window.location.href : "",
    language: typeof document !== "undefined" ? document.documentElement.lang : "",
    submittedAt: new Date().toISOString(),
  };

  if (ENV.leadEndpoint) {
    const res = await fetch(ENV.leadEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`Lead endpoint responded ${res.status}`);
    track("generate_lead", { source, channel: "endpoint" });
    return "sent";
  }

  const inbox = ENV.leadEmail || SITE.email;
  if (!inbox) {
    track("generate_lead", { source, channel: "tracked_only" });
    return "tracked";
  }

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(inbox)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name: name || email,
      email,
      company,
      message:
        message ||
        `Nuevo lead desde la landing (${source}).\nEmail: ${email}${company ? `\nEmpresa: ${company}` : ""}`,
      _subject: `[Agentix Landing] ${source} — ${email}`,
      _template: "table",
      _captcha: "false",
      _replyto: email,
      source,
      page: payload.page,
      language: payload.language,
      submittedAt: payload.submittedAt,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`FormSubmit responded ${res.status}: ${body}`);
  }

  track("generate_lead", { source, channel: "formsubmit" });
  return "sent";
}
