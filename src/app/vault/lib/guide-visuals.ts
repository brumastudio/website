export interface TableData {
  headers: string[];
  rows: string[][];
  highlightCol?: number;
}

export interface ChartData {
  title?: string;
  items: { label: string; value: number; displayValue: string; accent?: boolean }[];
}

export interface SectionVisuals {
  table?: TableData;
  chart?: ChartData;
}

type VisualsMap = Record<string, Record<string, SectionVisuals>>;

const visuals: VisualsMap = {
  // ─── COMMISSION GUIDE EN ──────────────────────────────────────
  "commissions-en": {
    "Our Service Plans": {
      table: {
        headers: ["Plan", "Description", "Price Range"],
        rows: [
          ["The Parchment", "Landing page or single-page site. Responsive, basic CMS, Vercel deploy.", "~$1,000 USD"],
          ["The Tome", "Multi-page site (up to 8 pages). UI/UX design, full Sanity CMS, training.", "~$1,500 USD"],
          ["The Codex", "Complex projects. Bilingual, advanced integrations, design system, extended support.", "~$2,000+ USD"],
        ],
        highlightCol: 2,
      },
    },
    "Quick Commission Summary": {
      table: {
        headers: ["", "Level 1 — Referrer", "Level 2 — Prospector", "Level 3 — Closer"],
        rows: [
          ["Commission", "10%", "15–20%", "20–25%"],
          ["Find prospects", "No", "Yes", "Yes"],
          ["Send outreach emails", "No", "Yes", "Yes"],
          ["Follow up", "No", "Yes", "Yes"],
          ["Sales call", "No", "No", "Yes"],
          ["Close the deal", "No", "No", "Yes"],
          ["Manage client", "No", "No", "Optional (+5%)"],
          ["Time commitment", "Occasional", "1–2 hrs/day", "2–3 hrs/day"],
        ],
        highlightCol: 3,
      },
    },
    "Level 1 — The Referrer": {
      table: {
        headers: ["Project", "Value", "Your Commission (10%)"],
        rows: [
          ["The Parchment", "$1,000", "$100"],
          ["The Tome", "$1,500", "$150"],
          ["The Codex", "$2,000", "$200"],
        ],
        highlightCol: 2,
      },
    },
    "Level 2 — The Prospector": {
      table: {
        headers: ["Project", "Value", "At 15%", "At 20%"],
        rows: [
          ["The Parchment", "$1,000", "$150", "$200"],
          ["The Tome", "$1,500", "$225", "$300"],
          ["The Codex", "$2,000", "$300", "$400"],
        ],
        highlightCol: 3,
      },
    },
    "Level 3 — The Closer": {
      table: {
        headers: ["Project", "Value", "At 20%", "At 25%"],
        rows: [
          ["The Parchment", "$1,000", "$200", "$250"],
          ["The Tome", "$1,500", "$300", "$375"],
          ["The Codex", "$2,000", "$400", "$500"],
        ],
        highlightCol: 3,
      },
    },
    "How Much Can I Earn?": {
      chart: {
        title: "Projected Annual Earnings (based on $1,500 avg project)",
        items: [
          { label: "Conservative — Level 2, 15%, 1/mo", value: 2700, displayValue: "$2,700/yr" },
          { label: "Moderate — Level 3, 20%, 2/mo", value: 7200, displayValue: "$7,200/yr" },
          { label: "Aggressive — Level 3, 25%, 3/mo", value: 13500, displayValue: "$13,500/yr" },
          { label: "Aggressive + Codex — Level 3, 25%", value: 18000, displayValue: "$18,000/yr", accent: true },
        ],
      },
      table: {
        headers: ["Scenario", "Projects/Month", "Monthly", "Annual"],
        rows: [
          ["Conservative (L2, 15%)", "1", "$225", "$2,700"],
          ["Moderate (L3, 20%)", "2", "$600", "$7,200"],
          ["Aggressive (L3, 25%)", "3", "$1,125", "$13,500"],
          ["Aggressive + Codex", "3", "$1,500", "$18,000"],
        ],
        highlightCol: 3,
      },
    },
  },

  // ─── COMMISSION GUIDE ES ──────────────────────────────────────
  "commissions-es": {
    "Nuestros Planes de Servicio": {
      table: {
        headers: ["Plan", "Descripcion", "Rango de Precio"],
        rows: [
          ["El Pergamino", "Landing page o sitio de una pagina. Responsive, CMS basico, deploy en Vercel.", "~$1,000 USD"],
          ["El Tomo", "Sitio multi-pagina (hasta 8 paginas). Diseno UI/UX, Sanity CMS, capacitacion.", "~$1,500 USD"],
          ["El Codice", "Proyectos complejos. Bilingue, integraciones avanzadas, design system, soporte.", "~$2,000+ USD"],
        ],
        highlightCol: 2,
      },
    },
    "Resumen Rapido de Comisiones": {
      table: {
        headers: ["", "Nivel 1 — Referidor", "Nivel 2 — Prospector", "Nivel 3 — Cerrador"],
        rows: [
          ["Comision", "10%", "15–20%", "20–25%"],
          ["Buscar prospectos", "No", "Si", "Si"],
          ["Enviar emails", "No", "Si", "Si"],
          ["Dar seguimiento", "No", "Si", "Si"],
          ["Llamada de ventas", "No", "No", "Si"],
          ["Cerrar el trato", "No", "No", "Si"],
          ["Gestionar cliente", "No", "No", "Opcional (+5%)"],
          ["Tiempo estimado", "Ocasional", "1–2 hrs/dia", "2–3 hrs/dia"],
        ],
        highlightCol: 3,
      },
    },
    "Nivel 1 — El Referidor": {
      table: {
        headers: ["Proyecto", "Valor", "Tu Comision (10%)"],
        rows: [
          ["El Pergamino", "$1,000", "$100"],
          ["El Tomo", "$1,500", "$150"],
          ["El Codice", "$2,000", "$200"],
        ],
        highlightCol: 2,
      },
    },
    "Nivel 2 — El Prospector": {
      table: {
        headers: ["Proyecto", "Valor", "Al 15%", "Al 20%"],
        rows: [
          ["El Pergamino", "$1,000", "$150", "$200"],
          ["El Tomo", "$1,500", "$225", "$300"],
          ["El Codice", "$2,000", "$300", "$400"],
        ],
        highlightCol: 3,
      },
    },
    "Nivel 3 — El Cerrador": {
      table: {
        headers: ["Proyecto", "Valor", "Al 20%", "Al 25%"],
        rows: [
          ["El Pergamino", "$1,000", "$200", "$250"],
          ["El Tomo", "$1,500", "$300", "$375"],
          ["El Codice", "$2,000", "$400", "$500"],
        ],
        highlightCol: 3,
      },
    },
    "Cuanto Puedo Ganar?": {
      chart: {
        title: "Ganancias Anuales Proyectadas (basado en $1,500 promedio)",
        items: [
          { label: "Conservador — Nivel 2, 15%, 1/mes", value: 2700, displayValue: "$2,700/ano" },
          { label: "Moderado — Nivel 3, 20%, 2/mes", value: 7200, displayValue: "$7,200/ano" },
          { label: "Agresivo — Nivel 3, 25%, 3/mes", value: 13500, displayValue: "$13,500/ano" },
          { label: "Agresivo + Codex — Nivel 3, 25%", value: 18000, displayValue: "$18,000/ano", accent: true },
        ],
      },
      table: {
        headers: ["Escenario", "Proyectos/Mes", "Mensual", "Anual"],
        rows: [
          ["Conservador (N2, 15%)", "1", "$225", "$2,700"],
          ["Moderado (N3, 20%)", "2", "$600", "$7,200"],
          ["Agresivo (N3, 25%)", "3", "$1,125", "$13,500"],
          ["Agresivo + Codex", "3", "$1,500", "$18,000"],
        ],
        highlightCol: 3,
      },
    },
  },

  // ─── PROSPECTING PLAYBOOK EN ──────────────────────────────────
  "prospecting-en": {
    "Expected Results": {
      table: {
        headers: ["Metric", "Industry Average", "With Good Targeting"],
        rows: [
          ["Open rate", "15–25%", "30–40%"],
          ["Reply rate", "2–5%", "5–10%"],
          ["Meeting booked", "1–2% of emails", "3–5% of emails"],
          ["Close rate (from meeting)", "20–30%", "30–50%"],
        ],
        highlightCol: 2,
      },
    },
    "How to Qualify a Prospect": {
      table: {
        headers: ["Signal", "Points", "How to Check"],
        rows: [
          ["No website at all", "+2", "Google Maps shows no URL, or links to Facebook"],
          ["Has a bad website", "+2", "Free Wix/GoDaddy template? Slow? Not responsive?"],
          ["Active with reviews", "+1", "20+ Google reviews, active social media"],
          ["High-ROI industry", "+1", "Restaurants, legal, medical, real estate"],
          ["Contact info available", "+1", "Owner email, contact form, or LinkedIn"],
          ["Bilingual opportunity", "+1 bonus", "Hispanic-owned in US, or LATAM → US market"],
        ],
        highlightCol: 1,
      },
    },
    "Free Tools for Prospecting": {
      table: {
        headers: ["Tool", "Purpose", "Free Tier"],
        rows: [
          ["Google Maps", "Find businesses, check websites", "Unlimited"],
          ["PageSpeed Insights", "Test website speed (use as evidence)", "Unlimited"],
          ["Hunter.io", "Find emails from domain names", "25 searches/mo"],
          ["Apollo.io", "Lead database with verified emails", "50 credits/mo"],
          ["LinkedIn", "Find owners and decision-makers", "Basic free"],
          ["Wappalyzer", "See what tech a website uses", "Free extension"],
          ["BuiltWith", "Check site platform (Wix, WP, etc.)", "Free basic"],
          ["GTmetrix", "Website performance test", "Unlimited"],
        ],
      },
    },
    "Weekly Targets": {
      table: {
        headers: ["Activity", "Daily", "Weekly", "Monthly"],
        rows: [
          ["Prospects found", "10–15", "50–75", "200–300"],
          ["Emails sent", "8–10", "40–50", "160–200"],
          ["Follow-ups", "5–8", "25–40", "100–160"],
          ["Expected replies", "—", "2–5", "8–20"],
          ["Expected meetings", "—", "1–2", "4–8"],
          ["New clients", "—", "—", "1–3"],
        ],
      },
      chart: {
        title: "Monthly Pipeline Funnel",
        items: [
          { label: "Emails sent", value: 180, displayValue: "~180" },
          { label: "Replies received", value: 14, displayValue: "~14" },
          { label: "Meetings booked", value: 6, displayValue: "~6" },
          { label: "Clients closed", value: 2, displayValue: "~2", accent: true },
        ],
      },
    },
  },

  // ─── MANUAL DE PROSPECCION ES ─────────────────────────────────
  "prospecting-es": {
    "Resultados Esperados": {
      table: {
        headers: ["Metrica", "Promedio Industria", "Con Buena Segmentacion"],
        rows: [
          ["Tasa de apertura", "15–25%", "30–40%"],
          ["Tasa de respuesta", "2–5%", "5–10%"],
          ["Reunion agendada", "1–2% de emails", "3–5% de emails"],
          ["Tasa de cierre (reunion)", "20–30%", "30–50%"],
        ],
        highlightCol: 2,
      },
    },
    "Como Calificar un Prospecto": {
      table: {
        headers: ["Senal", "Puntos", "Como Verificar"],
        rows: [
          ["No tiene sitio web", "+2", "Google Maps no muestra URL, enlaza a Facebook"],
          ["Sitio web malo", "+2", "Template de Wix/GoDaddy? Lento? No responsive?"],
          ["Activo con resenas", "+1", "20+ resenas en Google, redes activas"],
          ["Industria con alto ROI", "+1", "Restaurantes, legal, medico, bienes raices"],
          ["Info de contacto", "+1", "Email del dueno, formulario, o LinkedIn"],
          ["Oportunidad bilingue", "+1 bonus", "Hispano en EE.UU., o LATAM → mercado US"],
        ],
        highlightCol: 1,
      },
    },
    "Herramientas Gratuitas para Prospeccion": {
      table: {
        headers: ["Herramienta", "Proposito", "Nivel Gratuito"],
        rows: [
          ["Google Maps", "Encontrar negocios, verificar sitios", "Ilimitado"],
          ["PageSpeed Insights", "Probar velocidad (usar como evidencia)", "Ilimitado"],
          ["Hunter.io", "Encontrar emails por dominio", "25 busquedas/mes"],
          ["Apollo.io", "Base de datos de leads verificados", "50 creditos/mes"],
          ["LinkedIn", "Encontrar duenos y tomadores de decisiones", "Basico gratis"],
          ["Wappalyzer", "Ver que tecnologia usa un sitio", "Extension gratis"],
          ["BuiltWith", "Verificar plataforma (Wix, WP, etc.)", "Basico gratis"],
          ["GTmetrix", "Prueba de rendimiento web", "Ilimitado"],
        ],
      },
    },
    "Metas Semanales": {
      table: {
        headers: ["Actividad", "Diario", "Semanal", "Mensual"],
        rows: [
          ["Prospectos encontrados", "10–15", "50–75", "200–300"],
          ["Emails enviados", "8–10", "40–50", "160–200"],
          ["Seguimientos", "5–8", "25–40", "100–160"],
          ["Respuestas esperadas", "—", "2–5", "8–20"],
          ["Reuniones esperadas", "—", "1–2", "4–8"],
          ["Nuevos clientes", "—", "—", "1–3"],
        ],
      },
      chart: {
        title: "Embudo de Pipeline Mensual",
        items: [
          { label: "Emails enviados", value: 180, displayValue: "~180" },
          { label: "Respuestas recibidas", value: 14, displayValue: "~14" },
          { label: "Reuniones agendadas", value: 6, displayValue: "~6" },
          { label: "Clientes cerrados", value: 2, displayValue: "~2", accent: true },
        ],
      },
    },
  },
};

export function getSectionVisuals(
  slug: string,
  heading: string
): SectionVisuals | undefined {
  return visuals[slug]?.[heading];
}
