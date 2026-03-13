export function buildServiceCatalog(t, language) {
  const baseItems = t("services.items", { returnObjects: true }) || [];
  const baseSlugs = [
    "omnichannel-ai-agents",
    "ai-voice-telephony",
    "ai-marketing-automation",
    "ai-hr-management",
    "ai-risk-compliance",
    "autonomous-iot-telematics",
  ];

  const normalizedLanguage = language?.startsWith("es") ? "es" : "en";
  const extras = normalizedLanguage === "es"
    ? [
        {
          slug: "virtual-concierge-ai",
          title: "Porteria Virtual IA (Voz + Vision)",
          subtitle: "Citofonia virtual 24/7",
          description:
            "Un agente de voz y vision atiende visitantes, valida identidad, registra domicilios y escala a operador humano solo cuando hace falta.",
          features: ["Recepcion inteligente en entrada", "Validacion de visitantes", "Apertura remota segura", "Operacion 24/7 sin recargos"],
        },
        {
          slug: "autonomous-access-lpr",
          title: "Acceso Autonomo LPR/ALPR",
          subtitle: "Placas y control de acceso en milisegundos",
          description:
            "Reconocimiento de placas y reglas de negocio para abrir o bloquear acceso automaticamente con telemetria y trazabilidad.",
          features: ["Lectura de placas en tiempo real", "Reglas por residente/visitante", "Fail-safe manual", "Eventos auditables"],
        },
        {
          slug: "perimeter-sentinel-ai",
          title: "Centinela Perimetral IA",
          subtitle: "Rondas autonomas con vision computacional",
          description:
            "Analisis continuo de camaras para detectar merodeo, objetos abandonados y eventos criticos con alertas priorizadas.",
          features: ["Deteccion de anomalías", "Alertas a administrador", "Clips de evidencia", "Monitoreo 24/7"],
        },
        {
          slug: "pqrs-whatsapp-automation",
          title: "PQRS y WhatsApp Administrativo",
          subtitle: "Operacion y atencion automatizada",
          description:
            "Agente de WhatsApp para reservas de zonas, reportes de daños, envio de facturas y respuestas frecuentes.",
          features: ["Reserva de zonas comunes", "Reportes y tickets", "Mensajeria automatizada", "Menor carga operativa"],
        },
        {
          slug: "coexistence-enforcement-ai",
          title: "Convivencia Inteligente",
          subtitle: "Evidencia para decisiones HITL",
          description:
            "Deteccion de eventos de convivencia y generacion de evidencia para que la decision final la confirme un humano.",
          features: ["Deteccion de infracciones", "Clip y captura de evidencia", "Notificacion preventiva", "Confirmacion humana"],
        },
        {
          slug: "smart-delivery-locker",
          title: "Gestion de Domicilios IA",
          subtitle: "Casillero inteligente y trazable",
          description:
            "Automatiza recepcion y entrega de domicilios con notificacion inmediata al residente y codigos de retiro.",
          features: ["Flujo sin portero", "Notificacion en tiempo real", "Registro de entregas", "Mejor experiencia residente"],
        },
        {
          slug: "visitor-parking-control",
          title: "Control de Parqueaderos Visitantes",
          subtitle: "Tiempo de permanencia y alertas",
          description:
            "Cronometra permanencia de vehiculos y ejecuta reglas de cobro/alerta segun reglamento del conjunto.",
          features: ["Temporizador por vehiculo", "Alertas automaticas", "Reglas configurables", "Reporte para administracion"],
        },
        {
          slug: "moving-audit-monitoring",
          title: "Auditoria de Mudanzas",
          subtitle: "Antes/despues de areas comunes",
          description:
            "Modo de supervision de mudanza con evidencia visual de estado para resolver reclamos con trazabilidad.",
          features: ["Activacion por evento", "Registro antes y despues", "Reporte de daños", "Menor conflictividad"],
        },
        {
          slug: "vod-multilingual-dubbing",
          title: "VOD Multilenguaje con Agentes",
          subtitle: "Sube una vez, publica en varios idiomas",
          description:
            "Servicio para doblar y versionar video en multiples idiomas con agentes, listo para distribucion y crecimiento internacional.",
          features: ["Doblaje multilenguaje", "Versionado por mercado", "QA humano opcional", "Entrega lista para publicar"],
        },
      ]
    : [
        {
          slug: "virtual-concierge-ai",
          title: "Virtual Concierge AI (Voice + Vision)",
          subtitle: "24/7 AI intercom operations",
          description:
            "A voice-and-vision agent handles visitors, validates identity, registers deliveries, and escalates to human monitoring only when needed.",
          features: ["Smart reception at entry points", "Visitor identity validation", "Secure remote door opening", "24/7 operation without overtime"],
        },
        {
          slug: "autonomous-access-lpr",
          title: "Autonomous Access LPR/ALPR",
          subtitle: "Plate recognition in milliseconds",
          description:
            "License plate recognition plus business rules to automatically grant or deny access with complete telemetry traceability.",
          features: ["Real-time plate reading", "Rules by resident/visitor", "Manual fail-safe flow", "Auditable access events"],
        },
        {
          slug: "perimeter-sentinel-ai",
          title: "Perimeter Sentinel AI",
          subtitle: "Autonomous rounds with vision analytics",
          description:
            "Continuous multi-camera analysis to detect loitering, abandoned objects, and critical anomalies with prioritized alerts.",
          features: ["Anomaly detection", "Admin alerting", "Evidence clips", "24/7 monitoring"],
        },
        {
          slug: "pqrs-whatsapp-automation",
          title: "PQRS & WhatsApp Automation",
          subtitle: "Automated resident operations",
          description:
            "WhatsApp agent for common-area booking, incident reports, billing notifications, and resident FAQ support.",
          features: ["Common area booking", "Issue ticketing", "Automated messaging", "Reduced admin workload"],
        },
        {
          slug: "coexistence-enforcement-ai",
          title: "Coexistence Intelligence",
          subtitle: "Evidence-first HITL enforcement",
          description:
            "Detects coexistence events and generates evidence so final enforcement decisions are confirmed by a human administrator.",
          features: ["Violation detection", "Evidence clip generation", "Preventive notifications", "Human confirmation flow"],
        },
        {
          slug: "smart-delivery-locker",
          title: "Smart Delivery Locker AI",
          subtitle: "Traceable package workflows",
          description:
            "Automates package reception and pickup workflows with resident notifications and secure retrieval codes.",
          features: ["No-porter delivery flow", "Real-time resident notifications", "Delivery audit trail", "Improved resident experience"],
        },
        {
          slug: "visitor-parking-control",
          title: "Visitor Parking Control",
          subtitle: "Time tracking and automated alerts",
          description:
            "Tracks parking duration and enforces configurable billing/alert rules based on community regulations.",
          features: ["Per-vehicle timer", "Automated alerts", "Configurable policy rules", "Admin reporting"],
        },
        {
          slug: "moving-audit-monitoring",
          title: "Moving Audit Monitoring",
          subtitle: "Before/after common areas evidence",
          description:
            "Activates move-specific supervision mode to capture before/after evidence and resolve property damage disputes.",
          features: ["Event-driven activation", "Before/after records", "Damage reporting", "Lower conflict"],
        },
        {
          slug: "vod-multilingual-dubbing",
          title: "VOD Multilingual Dubbing",
          subtitle: "Upload once, publish in multiple languages",
          description:
            "Agent-powered service for multilingual dubbing and video localization, ready for distribution and global growth.",
          features: ["Multilingual dubbing", "Market-based versions", "Optional human QA", "Publish-ready delivery"],
        },
      ];

  const normalizedBaseItems = baseItems.map((item, index) => ({
    ...item,
    slug: baseSlugs[index] || `service-${index + 1}`,
  }));

  return [...normalizedBaseItems, ...extras];
}
