/**
 * Central site configuration: contact channels, feature flags and team.
 * Fields left as null/empty are hidden from the page automatically.
 *
 * Integrations (analytics, lead endpoint) are read from environment
 * variables so they can differ per environment — see .env.example.
 */
export const SITE = {
  // Public contact channels — leads from the landing go here by default (FormSubmit)
  email: "admin@agentixvanguard.com",
  whatsapp: null, // international format, digits only, e.g. "573001234567"
  phone: null, // display format, e.g. "+57 300 123 4567"

  // State of registration (AgentixVanguard LLC). No physical office: the team is fully remote.
  address: {
    region: "FL",
    country: "US",
  },

  social: {
    linkedin: "https://www.linkedin.com/company/agentix-vanguard/home/",
    facebook: "https://www.facebook.com/people/Agentix-Vanguard/61590516910718/",
    instagram: "https://www.instagram.com/agentix.vanguard/",
    x: "https://x.com/agentixvanguard",
  },

  // Show the blog section on the home page (re-enable when articles are current)
  showBlog: false,

  // Commercial products with public pricing (own microsite for plans/checkout)
  // Copy lives in locales under products.items (matched by id).
  products: [
    {
      id: "smart-frontdesk",
      url: "https://smartfrontdesk.agentixvanguard.com",
      host: "smartfrontdesk.agentixvanguard.com",
    },
  ],

  // Team section is hidden while this list is empty.
  // { name, role, photo: "/team/name.jpg", linkedin: "https://..." }
  team: [],
};

export const ENV = {
  gaId: import.meta.env.VITE_GA_ID,
  linkedinPartnerId: import.meta.env.VITE_LINKEDIN_PARTNER_ID,
  metaPixelId: import.meta.env.VITE_META_PIXEL_ID,
  // POST endpoint that receives leads as JSON (Formspree, Make, Zapier, n8n, own API…)
  leadEndpoint: import.meta.env.VITE_LEAD_ENDPOINT,
  // Inbox for FormSubmit fallback when leadEndpoint is empty
  leadEmail: import.meta.env.VITE_LEAD_EMAIL || "admin@agentixvanguard.com",
};

export const whatsappUrl = (text = "") =>
  SITE.whatsapp ? `https://wa.me/${SITE.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}` : null;
