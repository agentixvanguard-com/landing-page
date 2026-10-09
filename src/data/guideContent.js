// Content of the downloadable lead-magnet guide, rendered to PDF client-side.
export const guideContent = {
  es: {
    fileName: "Guia-Agentix-Chatbot-a-Agentes-Autonomos.pdf",
    title: "De chatbot a agentes autónomos en 30 días",
    subtitle: "Guía práctica de Agentix Vanguard para llevar la IA agéntica a producción",
    sections: [
      {
        heading: "1. Chatbot vs. agente autónomo",
        paragraphs: [
          "Un chatbot responde preguntas. Un agente autónomo entiende un objetivo, consulta tus datos, toma decisiones dentro de reglas definidas y ejecuta acciones en tus sistemas (ERP, CRM, dispositivos IoT). Un sistema multi-agente coordina varios agentes especializados: uno detecta, otro analiza, otro decide y otro ejecuta.",
        ],
      },
      {
        heading: "2. Cómo elegir el primer proceso",
        paragraphs: ["El mejor primer proceso cumple cuatro condiciones:"],
        bullets: [
          "Es repetitivo y de alto volumen (decenas o cientos de casos por semana).",
          "Tiene reglas claras, aunque requiera criterio en algunos casos.",
          "Su costo es medible: horas del equipo, tiempo de respuesta, errores o pérdidas.",
          "Los datos necesarios ya existen en algún sistema, documento o sensor.",
        ],
      },
      {
        heading: "3. Checklist de datos y sistemas",
        bullets: [
          "¿Dónde vive la información que el agente necesita? (ERP, CRM, documentos, telemetría)",
          "¿Esos sistemas tienen API o integración disponible?",
          "¿Qué conocimiento interno debe aprender el agente? (políticas, manuales, históricos)",
          "¿Qué acciones podrá ejecutar solo y cuáles requieren aprobación humana?",
          "¿Qué requisitos de seguridad, privacidad y cumplimiento aplican?",
        ],
      },
      {
        heading: "4. Plan de 30 días",
        bullets: [
          "Semana 1 — Diagnóstico: mapear el proceso actual, medir la línea base y definir el objetivo.",
          "Semana 2 — Diseño: definir agentes, reglas de decisión, integraciones y puntos de control humano.",
          "Semana 3 — Construcción: conectar datos con Hybrid RAG, integrar sistemas y probar con casos reales.",
          "Semana 4 — Producción: despliegue controlado, monitoreo y ajuste con usuarios reales.",
        ],
      },
      {
        heading: "5. Métricas para demostrar el impacto",
        bullets: [
          "Horas liberadas al mes y su equivalente en costo.",
          "Tiempo de respuesta o de ciclo antes y después.",
          "Porcentaje de casos resueltos sin intervención humana.",
          "Errores, incidentes o pérdidas evitadas.",
          "Ingresos generados o protegidos por el agente.",
        ],
      },
      {
        heading: "6. Errores comunes",
        bullets: [
          "Empezar por el proceso más complejo en lugar del de mayor retorno.",
          "Medir solo al final, sin línea base.",
          "Dar autonomía total desde el día uno, sin puntos de control humano.",
          "Quedarse en el piloto: sin plan de escalamiento, el proyecto muere.",
        ],
      },
    ],
    ctaTitle: "¿Quieres aplicarlo en tu empresa?",
    ctaText: "Agenda una auditoría de arquitectura y te mostramos qué proceso automatizar primero y cuánto podrías ahorrar.",
  },
  en: {
    fileName: "Agentix-Guide-Chatbot-to-Autonomous-Agents.pdf",
    title: "From chatbot to autonomous agents in 30 days",
    subtitle: "Agentix Vanguard's practical guide to bringing agentic AI to production",
    sections: [
      {
        heading: "1. Chatbot vs. autonomous agent",
        paragraphs: [
          "A chatbot answers questions. An autonomous agent understands a goal, queries your data, makes decisions within defined rules and executes actions in your systems (ERP, CRM, IoT devices). A multi-agent system coordinates several specialized agents: one detects, another analyzes, another decides and another executes.",
        ],
      },
      {
        heading: "2. How to choose the first process",
        paragraphs: ["The best first process meets four conditions:"],
        bullets: [
          "It is repetitive and high-volume (dozens or hundreds of cases per week).",
          "It has clear rules, even if some cases need judgment.",
          "Its cost is measurable: team hours, response time, errors or losses.",
          "The data it needs already exists in a system, document or sensor.",
        ],
      },
      {
        heading: "3. Data and systems checklist",
        bullets: [
          "Where does the information the agent needs live? (ERP, CRM, documents, telemetry)",
          "Do those systems have an API or integration available?",
          "What internal knowledge must the agent learn? (policies, manuals, history)",
          "Which actions can it take alone and which need human approval?",
          "Which security, privacy and compliance requirements apply?",
        ],
      },
      {
        heading: "4. 30-day plan",
        bullets: [
          "Week 1 — Assessment: map the current process, measure the baseline and set the goal.",
          "Week 2 — Design: define agents, decision rules, integrations and human checkpoints.",
          "Week 3 — Build: connect data with Hybrid RAG, integrate systems and test on real cases.",
          "Week 4 — Production: controlled rollout, monitoring and tuning with real users.",
        ],
      },
      {
        heading: "5. Metrics to prove impact",
        bullets: [
          "Hours freed per month and their cost equivalent.",
          "Response or cycle time before and after.",
          "Share of cases resolved without human intervention.",
          "Errors, incidents or losses avoided.",
          "Revenue generated or protected by the agent.",
        ],
      },
      {
        heading: "6. Common mistakes",
        bullets: [
          "Starting with the most complex process instead of the highest-return one.",
          "Measuring only at the end, with no baseline.",
          "Granting full autonomy from day one, with no human checkpoints.",
          "Getting stuck in the pilot: without a scaling plan, the project dies.",
        ],
      },
    ],
    ctaTitle: "Want to apply this in your company?",
    ctaText: "Book an architecture audit and we'll show you which process to automate first and how much you could save.",
  },
};
