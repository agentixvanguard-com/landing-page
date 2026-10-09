import { guideContent } from "@/data/guideContent";
import { CALENDLY_URL } from "@/components/landing/motion";

/** Builds the lead-magnet guide as a PDF and triggers the download. jsPDF is loaded on demand. */
export async function downloadGuide(language) {
  const { jsPDF } = await import("jspdf");
  const c = guideContent[language?.startsWith("es") ? "es" : "en"];
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 56;
  const maxW = W - M * 2;
  let y = 0;

  const background = () => {
    doc.setFillColor(5, 10, 24);
    doc.rect(0, 0, W, H, "F");
  };
  const ensure = (h) => {
    if (y + h > H - M) {
      doc.addPage();
      background();
      y = M;
    }
  };
  const text = (str, { size = 11, color = [203, 213, 225], style = "normal", indent = 0, gap = 6 } = {}) => {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    doc.setTextColor(...color);
    const lines = doc.splitTextToSize(str, maxW - indent);
    const lh = size * 1.45;
    lines.forEach((line) => {
      ensure(lh);
      doc.text(line, M + indent, y);
      y += lh;
    });
    y += gap;
  };

  // Cover band
  background();
  doc.setFillColor(8, 145, 178);
  doc.rect(0, 0, W, 6, "F");
  y = M + 20;
  text("AGENTIX VANGUARD", { size: 10, color: [34, 211, 238], style: "bold", gap: 18 });
  text(c.title, { size: 26, color: [255, 255, 255], style: "bold", gap: 10 });
  text(c.subtitle, { size: 13, color: [148, 163, 184], gap: 28 });

  c.sections.forEach((s) => {
    ensure(60);
    text(s.heading, { size: 15, color: [103, 232, 249], style: "bold", gap: 8 });
    (s.paragraphs || []).forEach((p) => text(p));
    (s.bullets || []).forEach((b) => {
      ensure(18);
      doc.setFillColor(168, 85, 247);
      doc.circle(M + 4, y - 4, 2.2, "F");
      text(b, { indent: 16, gap: 4 });
    });
    y += 14;
  });

  // Closing CTA box
  ensure(120);
  doc.setFillColor(15, 23, 42);
  doc.setDrawColor(34, 211, 238);
  doc.roundedRect(M, y, maxW, 100, 10, 10, "FD");
  y += 30;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text(c.ctaTitle, M + 20, y);
  y += 20;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(203, 213, 225);
  doc.text(doc.splitTextToSize(c.ctaText, maxW - 40), M + 20, y);
  y += 34;
  doc.setTextColor(34, 211, 238);
  doc.textWithLink(CALENDLY_URL, M + 20, y, { url: CALENDLY_URL });

  doc.save(c.fileName);
}
