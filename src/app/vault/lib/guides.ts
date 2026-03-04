export interface Guide {
  slug: string;
  title: string;
  description: string;
  lang: "en" | "es";
  sections: { heading: string; body: string }[];
}

export const salesGuides: Guide[] = [
  {
    slug: "prospecting-en",
    title: "Prospecting Playbook",
    description: "A daily system for finding, qualifying, and reaching out to potential clients.",
    lang: "en",
    sections: [
      {
        heading: "The Mission",
        body: "Find businesses that either have no website or have an outdated/cheap-looking website, and offer them a modern, professional web presence built by Bruma Studio. Focus on two markets: US-based businesses (especially Hispanic-owned) and Latin American businesses expanding digitally.",
      },
      {
        heading: "Expected Results",
        body: `Cold outreach is a numbers game, but quality targeting dramatically improves conversion.

Open rate: Industry average 15–25%, with good targeting 30–40%
Reply rate: Industry average 2–5%, with good targeting 5–10%
Meeting booked: Industry average 1–2% of emails sent, with good targeting 3–5%
Close rate (from meeting): Industry average 20–30%, with good targeting 30–50%

Realistic expectations: 100 targeted emails → 3–5 replies → 1–2 meetings → 1 client every 100–200 emails. At 10 emails/day, expect 1–3 solid leads per month.

What makes the difference: personalization. A generic "we build websites" email gets deleted. An email that says "I noticed your restaurant's menu isn't mobile-friendly and your Google listing links to a Facebook page — we can fix that" gets a reply.`,
      },
      {
        heading: "Daily Routine (1–2 Hours)",
        body: `Block 1: Prospecting (45 min)
Find 10–15 qualified prospects and add them to the tracker.

Block 2: Outreach (30 min)
Write and send 8–10 personalized emails.

Block 3: Follow-up (15 min)
Follow up on emails sent 3 and 7 days ago that haven't received a reply.`,
      },
      {
        heading: "Where to Find Prospects",
        body: `TIER 1: HIGHEST QUALITY (prioritize these)

Google Maps / Google Business Profiles
• Search for business types in target cities: "restaurant Tijuana", "law firm San Diego", "dental clinic CDMX", "real estate agent Miami"
• Look at their listed website — many link to a Facebook page or have no website at all
• Check their Google reviews: businesses with 50+ reviews and no website are perfect — they have customers but no digital presence
• Filter for 3–5 star ratings (they care about their business, just haven't invested in web yet)

Yelp
• Same approach — search by category and city
• Businesses with Yelp pages but no website, or a broken/outdated one
• Bonus: Yelp businesses are already marketing-aware

Industry-Specific Directories
• Lawyers: Avvo, FindLaw, local bar association directories
• Restaurants: Google Maps, TripAdvisor, Yelp
• Doctors/Dentists: Healthgrades, Zocdoc, Doctoralia (LATAM)
• Real estate: Zillow agent profiles, Realtor.com
• Trades (plumbers, electricians, contractors): HomeAdvisor, Thumbtack, local directories

TIER 2: GOOD QUALITY

Social Media Businesses
• Instagram/Facebook businesses that operate entirely through DMs
• Look for "link in bio" that goes to Linktree or a basic landing page
• These businesses are actively marketing but need a proper web presence
• Search hashtags: #smallbusiness[city], #negociolocal, #emprendedor

Chambers of Commerce / Business Associations
• US Hispanic Chamber of Commerce (USHCC) member directories
• Local chambers of commerce in target cities
• Industry associations often list members with websites (easy to check quality)

LinkedIn
• Search for business owners, founders, and managing directors in target industries
• Check their company's website from their LinkedIn profile
• Best for B2B services: consultants, agencies, professional services

TIER 3: VOLUME PLAY

Craigslist / Marketplace
• Businesses advertising services on Craigslist often have no website
• Local service providers: cleaning, landscaping, catering, photography

Event Listings / Vendor Lists
• Local markets, trade shows, pop-up events — vendors often have Instagram but no site
• Wedding vendor directories (photographers, florists, caterers, venues)`,
      },
      {
        heading: "How to Qualify a Prospect",
        body: `Score each prospect before reaching out. Only email prospects scoring 3+ out of 5.

+2 points — No website at all: Google Maps listing shows no URL, or links to Facebook/Instagram
+2 points — Has a website but it looks bad: Is it a free Wix/GoDaddy template? Slow? Not mobile-friendly? Broken links?
+1 point — Active business with reviews/customers: 20+ Google reviews, active social media, real customers
+1 point — Industry with high web ROI: Restaurants, legal, medical, real estate, professional services
+1 point — Clear contact info available: Owner's email, contact form, or LinkedIn profile findable
+1 point (bonus) — Bilingual market opportunity: Hispanic-owned in the US, or LATAM business wanting to reach US market

RED FLAGS (Skip These):
• Business appears to be closed or struggling (bad reviews, "permanently closed")
• Already has a professional, modern website (they don't need you)
• No way to find contact info (no email, no LinkedIn, no contact form)
• Franchise or chain (decisions made at corporate level)
• Business too small to invest (1-person side hustles with no revenue signals)`,
      },
      {
        heading: "What to Look For on a Bad Website",
        body: `When you find a business with a website, evaluate it quickly. Look for:

IMMEDIATE DISQUALIFIERS (the site is bad):
• "Built with Wix" / "Powered by GoDaddy" / "Squarespace" footer branding
• Not mobile-responsive (text overlaps, horizontal scrolling on phone)
• Takes more than 5 seconds to load
• Uses stock photos that don't match the business
• Broken links, missing images, outdated content (copyright 2019, old COVID info)
• No SSL certificate (browser shows "Not Secure")
• Looks like a template with no customization

MODERATE ISSUES (opportunity for upgrade):
• Basic WordPress theme, functional but generic
• No clear call to action (phone number, contact form, book appointment)
• Poor SEO (no meta descriptions, generic page titles)
• No Google Analytics or tracking
• Content is sparse or clearly auto-generated

Take a screenshot of every bad website you find. You'll reference specific issues in your outreach email.`,
      },
      {
        heading: "Contact Information: How to Find It",
        body: `In order of reliability:

1. Website contact page — if they have a site, check for owner/manager email
2. Google Business Profile — sometimes lists owner email or phone
3. LinkedIn — search for the business name, find the owner/founder
4. Facebook/Instagram — business pages often have email in the "About" section
5. Whois lookup — domain registration email (often privacy-protected, but worth trying)
6. Hunter.io — email finder tool, enter their domain and find associated emails (free: 25 searches/month)
7. Apollo.io — lead database with verified emails (free tier: 50 credits/month)

Always reach out to the owner or decision-maker. Don't email info@ or support@ — find the person who decides on marketing spend.`,
      },
      {
        heading: "Contact Management: The Tracker",
        body: `Use a simple Google Sheet or Notion database. Don't overcomplicate this.

GOOGLE SHEET COLUMNS:
• Business Name — Company name
• Industry — Restaurant, Legal, Medical, etc.
• Location — City/Region
• Website — URL (or "None")
• Website Issues — Brief notes: "no mobile", "Wix template", "no site"
• Contact Name — Owner/decision-maker name
• Contact Email — Their email address
• Contact Source — Where you found the email (LinkedIn, website, Hunter.io)
• Score — Qualification score (3–5)
• Status — Not Contacted / Email Sent / Follow-up 1 / Follow-up 2 / Replied / Meeting / Not Interested
• Date First Email — When you sent the first outreach
• Date Follow-up 1 — 3 days after first email
• Date Follow-up 2 — 7 days after first email
• Notes — Any relevant context for personalization
• Language — EN or ES (which language to email in)

STATUS WORKFLOW:
Not Contacted → Email Sent → Follow-up 1 (day 3) → Follow-up 2 (day 7) → Closed/Not Interested
If they reply: Replied → Meeting Booked → Proposal Sent → Client / Lost

WEEKLY REVIEW (every Friday):
• How many emails sent this week?
• How many replies received?
• Any meetings booked?
• What industries/messages are getting the best response?
• Adjust targeting based on what's working`,
      },
      {
        heading: "Email Templates",
        body: `TEMPLATE 1: NO WEBSITE

Subject: Quick question about [Business Name]'s online presence

Hi [Name],

I came across [Business Name] on [Google Maps / Yelp / directory] and noticed you don't currently have a website. With [X] positive reviews, you clearly have a great reputation — a website would help turn that into even more business.

We're Bruma Studio, a web development studio that builds modern, fast websites for businesses like yours. A few things a site could do for you:
• Show up in Google when people search for [industry] in [city]
• Let customers book appointments / see your menu / request quotes online
• Look professional to new customers who find you for the first time

Would you be open to a quick 15-minute call to see if it makes sense? No pressure either way.

Best,
[Your Name]
Bruma Studio · brumastudio.dev

---

TEMPLATE 2: BAD/OUTDATED WEBSITE

Subject: Noticed something on [Business Name]'s website

Hi [Name],

I was looking at [business website URL] and noticed a few things that might be costing you customers:
• [Specific issue 1: e.g., "The site isn't mobile-friendly — on a phone, the text overlaps and the menu is hard to tap"]
• [Specific issue 2: e.g., "It takes about 8 seconds to load, and most visitors leave after 3"]
• [Specific issue 3: e.g., "There's no clear way for someone to contact you or book an appointment"]

These are common issues and straightforward to fix with a modern rebuild. We're Bruma Studio — we build fast, mobile-first websites with built-in content management so you can update things yourself.

Would you be interested in seeing what a refreshed [Business Name] site could look like? Happy to put together a quick mockup at no cost.

Best,
[Your Name]
Bruma Studio · brumastudio.dev

---

TEMPLATE 3: SOCIAL-MEDIA-ONLY BUSINESS

Subject: Turning your Instagram into a full website

Hi [Name],

I've been following [Business Name] on [Instagram/Facebook] — your [products/work/food] looks amazing. Right now, it seems like you're running everything through social media and DMs.

Have you thought about having a proper website? It would give you:
• A professional home base that you own (social platforms change their algorithms constantly)
• The ability to show up in Google searches for [industry] in [city]
• A way for customers to [book / order / get quotes] without going through DMs

We build modern websites specifically for businesses like yours. Fast, mobile-first, and easy for you to update without any technical knowledge.

Would a 15-minute call make sense to explore this?

Best,
[Your Name]
Bruma Studio · brumastudio.dev

---

FOLLOW-UP (Day 3)

Subject: Re: [original subject]

Hi [Name],

Just wanted to make sure this didn't get buried in your inbox. Would love to chat about how a website could help [Business Name] grow.

Happy to work around your schedule — even a quick 15-minute call would be enough to see if it's a fit.

Best,
[Your Name]

---

FOLLOW-UP (Day 7 — Final)

Subject: Re: [original subject]

Hi [Name],

Last note from me on this — I don't want to be a bother. If the timing isn't right, no worries at all.

If you ever want to explore a website for [Business Name], my inbox is always open. You can also check out what we do at brumastudio.dev.

Wishing you continued success.

Best,
[Your Name]
Bruma Studio`,
      },
      {
        heading: "Rules for Effective Outreach",
        body: `1. Never send generic emails. Every email must reference something specific about their business. "I noticed your menu isn't on your website" beats "I build websites for restaurants."

2. Keep it short. Under 150 words for the first email. Business owners are busy.

3. One clear ask. Don't offer five things. Ask for a 15-minute call. That's it.

4. Don't sell in the email. The goal of the email is to start a conversation, not close a deal.

5. Follow up exactly twice. Day 3 and Day 7. After that, move on. Three emails is persistent; four is annoying.

6. Send between 8–10 AM in their timezone. Highest open rates for business owners.

7. Use their language. If the business is primarily Spanish-speaking, email in Spanish. If bilingual, email in English but mention you speak Spanish.

8. Don't use a mass email tool yet. At 10/day, send manually from your brumastudio.dev email. Personal sends have better deliverability and don't get flagged as spam.

9. Track everything in the sheet. If you can't measure it, you can't improve it.

10. Review weekly. What industries responded? What subject lines got opens? Adapt.`,
      },
      {
        heading: "Target Industries (Ranked by ROI)",
        body: `These industries benefit most from a professional website and are most likely to pay:

1. Restaurants & Cafes — menus, reservations, delivery, Google visibility
2. Law Firms & Attorneys — trust is everything, a cheap site kills credibility
3. Medical / Dental Clinics — appointment booking, patient information
4. Real Estate Agents — listings, personal brand, lead capture
5. Professional Services (accountants, consultants, coaches) — credibility and lead generation
6. Trades (contractors, plumbers, electricians) — local SEO is massive
7. Fitness / Wellness (gyms, yoga studios, spas) — class schedules, booking
8. Wedding / Event Vendors (photographers, florists, venues) — portfolio showcase
9. E-commerce / Retail — online sales capability
10. Creative Agencies / Freelancers — portfolio and brand positioning`,
      },
      {
        heading: "Target Cities",
        body: `US (Hispanic market focus):
• San Diego, CA (close to Tijuana — local relationship advantage)
• Los Angeles, CA
• Miami, FL
• Houston, TX
• San Antonio, TX
• Chicago, IL
• New York, NY (especially Queens, Bronx)
• Phoenix, AZ

Latin America:
• Mexico City (CDMX)
• Monterrey
• Guadalajara
• Cancún / Riviera Maya (tourism businesses)
• Bogotá, Colombia
• Medellín, Colombia
• Lima, Peru
• Santiago, Chile
• Buenos Aires, Argentina`,
      },
      {
        heading: "Free Tools for Prospecting",
        body: `Google Maps — Find businesses, check if they have a website (Unlimited)
Google PageSpeed Insights — Test a website's speed — use as evidence in outreach (Unlimited)
Hunter.io — Find email addresses from domain names (25 searches/month)
Apollo.io — Lead database with verified business emails (50 credits/month)
LinkedIn — Find business owners and decision-makers (Basic search free)
Whois Lookup (who.is) — Find domain owner email (Unlimited)
Wappalyzer — Browser extension — shows what tech a website uses (Free)
BuiltWith — Check what platform a site is built on (Wix, WordPress, etc.) (Free basic)
GTmetrix — Website speed/performance test (Unlimited)
Google Sheets — Contact management tracker (Free)`,
      },
      {
        heading: "Weekly Targets",
        body: `Daily:
• Prospects found & qualified: 10–15
• Personalized emails sent: 8–10
• Follow-ups sent: 5–8

Weekly:
• Prospects found & qualified: 50–75
• Personalized emails sent: 40–50
• Follow-ups sent: 25–40
• Expected replies: 2–5
• Expected meetings: 1–2

Monthly:
• Prospects found & qualified: 200–300
• Personalized emails sent: 160–200
• Follow-ups sent: 100–160
• Expected replies: 8–20
• Expected meetings: 4–8
• Expected new clients: 1–3`,
      },
      {
        heading: "What Happens After a Reply",
        body: `When a prospect replies with interest:

1. Respond within 2 hours during business hours. Speed matters.
2. Schedule a discovery call (15–30 minutes). Use Calendly.
3. On the call: listen first. Ask about their business, their goals, what they've tried before. Don't pitch — understand.
4. After the call: send a follow-up email summarizing what you discussed and let them know you'll prepare a proposal.
5. Send a proposal within 48 hours. Include scope, timeline, and pricing (adjusted for their market and budget).
6. Hand off to Conrado for the proposal and closing — the prospector's job is to fill the pipeline, not close deals.`,
      },
    ],
  },
  {
    slug: "prospecting-es",
    title: "Manual de Prospeccion",
    description: "Un sistema diario para encontrar, calificar y contactar clientes potenciales.",
    lang: "es",
    sections: [
      {
        heading: "La Mision",
        body: "Encontrar negocios que no tengan sitio web o que tengan uno desactualizado/de mala calidad, y ofrecerles una presencia web moderna y profesional construida por Bruma Studio. Nos enfocamos en dos mercados: negocios en Estados Unidos (especialmente hispanos) y negocios en Latinoamerica que estan creciendo digitalmente.",
      },
      {
        heading: "Resultados Esperados",
        body: `La prospeccion en frio es un juego de numeros, pero una buena segmentacion mejora los resultados dramaticamente.

Tasa de apertura: Promedio de la industria 15–25%, con buena segmentacion 30–40%
Tasa de respuesta: Promedio de la industria 2–5%, con buena segmentacion 5–10%
Reunion agendada: Promedio de la industria 1–2% de emails enviados, con buena segmentacion 3–5%
Tasa de cierre (desde reunion): Promedio de la industria 20–30%, con buena segmentacion 30–50%

Expectativas realistas: 100 emails bien segmentados → 3–5 respuestas → 1–2 reuniones → 1 cliente cada 100–200 emails. Con 10 emails/dia, espera 1–3 prospectos solidos por mes.

Lo que marca la diferencia: personalizacion. Un email generico de "hacemos sitios web" se borra. Un email que dice "note que el menu de tu restaurante no se ve bien en celular y tu perfil de Google enlaza a Facebook — podemos arreglar eso" obtiene respuesta.`,
      },
      {
        heading: "Rutina Diaria (1–2 Horas)",
        body: `Bloque 1: Prospeccion (45 min)
Encontrar 10–15 prospectos calificados y agregarlos al tracker.

Bloque 2: Contacto (30 min)
Escribir y enviar 8–10 emails personalizados.

Bloque 3: Seguimiento (15 min)
Dar seguimiento a emails enviados hace 3 y 7 dias que no han recibido respuesta.`,
      },
      {
        heading: "Donde Encontrar Prospectos",
        body: `NIVEL 1: MAYOR CALIDAD (priorizar estos)

Google Maps / Perfiles de Google Business
• Buscar tipos de negocio en ciudades objetivo: "restaurante Tijuana", "despacho de abogados CDMX", "clinica dental Monterrey", "agente inmobiliario Miami"
• Revisar el sitio web que tienen listado — muchos enlazan a una pagina de Facebook o no tienen sitio web
• Revisar sus resenas de Google: negocios con 50+ resenas y sin sitio web son el prospecto perfecto — tienen clientes pero no tienen presencia digital
• Filtrar por calificacion 3–5 estrellas (les importa su negocio, simplemente no han invertido en web)

Yelp / TripAdvisor
• Mismo enfoque — buscar por categoria y ciudad
• Negocios con perfil en estas plataformas pero sin sitio web propio, o con uno roto/desactualizado
• Bonus: estos negocios ya tienen mentalidad de marketing

Directorios por Industria
• Abogados: Avvo, FindLaw, directorios de colegios de abogados
• Restaurantes: Google Maps, TripAdvisor, Yelp
• Doctores/Dentistas: Healthgrades, Zocdoc, Doctoralia (LATAM)
• Bienes raices: Zillow, Realtor.com, Inmuebles24, Lamudi
• Oficios (plomeros, electricistas, contratistas): HomeAdvisor, Thumbtack, Seccion Amarilla

NIVEL 2: BUENA CALIDAD

Negocios en Redes Sociales
• Negocios en Instagram/Facebook que operan unicamente por DMs
• Buscar "enlace en bio" que lleva a Linktree o una landing basica
• Estos negocios ya estan haciendo marketing pero necesitan una presencia web profesional
• Buscar hashtags: #negociolocal, #emprendedor, #pyme, #smallbusiness[ciudad]

Camaras de Comercio / Asociaciones Empresariales
• US Hispanic Chamber of Commerce (USHCC) — directorios de miembros
• Camaras de comercio locales en ciudades objetivo
• CANACO, CANACINTRA (Mexico) — listas de miembros
• Asociaciones de la industria que listan miembros con sitios web (facil de verificar calidad)

LinkedIn
• Buscar duenos de negocios, fundadores y directores en industrias objetivo
• Revisar el sitio web de su empresa desde su perfil de LinkedIn
• Mejor para servicios B2B: consultores, agencias, servicios profesionales

NIVEL 3: VOLUMEN

Craigslist / Marketplace / Mercado Libre
• Negocios que anuncian servicios frecuentemente no tienen sitio web
• Proveedores de servicios locales: limpieza, jardineria, catering, fotografia

Listas de Eventos / Vendors
• Mercados locales, ferias, pop-ups — los vendedores suelen tener Instagram pero no sitio
• Directorios de proveedores de bodas (fotografos, floristas, banquetes, venues)`,
      },
      {
        heading: "Como Calificar un Prospecto",
        body: `Puntua cada prospecto antes de contactarlo. Solo enviar email a prospectos con 3+ de 5 puntos.

+2 puntos — No tiene sitio web: Google Maps no muestra URL, o enlaza a Facebook/Instagram
+2 puntos — Tiene sitio web pero se ve mal: Es un template gratis de Wix/GoDaddy? Lento? No es responsive? Links rotos?
+1 punto — Negocio activo con resenas/clientes: 20+ resenas en Google, redes sociales activas, clientes reales
+1 punto — Industria con alto ROI en web: Restaurantes, legal, medico, bienes raices, servicios profesionales
+1 punto — Informacion de contacto disponible: Email del dueno, formulario de contacto o perfil de LinkedIn
+1 punto (bonus) — Oportunidad en mercado bilingue: Negocio hispano en EE.UU., o negocio LATAM que quiere llegar al mercado de EE.UU.

SENALES DE ALERTA (Saltar Estos):
• El negocio parece estar cerrado o en problemas (malas resenas, "cerrado permanentemente")
• Ya tiene un sitio web profesional y moderno (no te necesita)
• No hay forma de encontrar informacion de contacto
• Es una franquicia o cadena (las decisiones se toman a nivel corporativo)
• Negocio demasiado pequeno para invertir (proyectos personales sin senales de ingresos)`,
      },
      {
        heading: "Que Buscar en un Sitio Web Malo",
        body: `Cuando encuentres un negocio con sitio web, evalualo rapidamente. Busca:

DESCALIFICADORES INMEDIATOS (el sitio esta mal):
• "Creado con Wix" / "Powered by GoDaddy" / "Squarespace" en el footer
• No es responsive (texto se encima, scroll horizontal en celular)
• Tarda mas de 5 segundos en cargar
• Usa fotos de stock que no coinciden con el negocio
• Links rotos, imagenes faltantes, contenido desactualizado (copyright 2019, info vieja de COVID)
• Sin certificado SSL (el navegador muestra "No es seguro")
• Parece un template sin ninguna personalizacion

PROBLEMAS MODERADOS (oportunidad de mejora):
• Theme basico de WordPress, funcional pero generico
• Sin llamada a la accion clara (telefono, formulario, reservar cita)
• SEO pobre (sin meta descripciones, titulos de pagina genericos)
• Sin Google Analytics o tracking
• Contenido escaso o claramente auto-generado

Toma un screenshot de cada sitio web malo que encuentres. Lo vas a referenciar en tu email de contacto.`,
      },
      {
        heading: "Informacion de Contacto: Como Encontrarla",
        body: `En orden de confiabilidad:

1. Pagina de contacto del sitio — si tienen sitio, busca el email del dueno/gerente
2. Perfil de Google Business — a veces muestra email del dueno o telefono
3. LinkedIn — buscar el nombre del negocio, encontrar al dueno/fundador
4. Facebook/Instagram — las paginas de negocio frecuentemente tienen email en "Informacion"
5. Whois lookup — email de registro del dominio (frecuentemente protegido por privacidad)
6. Hunter.io — herramienta para encontrar emails, ingresa su dominio (gratis: 25 busquedas/mes)
7. Apollo.io — base de datos de leads con emails verificados (gratis: 50 creditos/mes)

Siempre contacta al dueno o tomador de decisiones. No envies email a info@ o soporte@ — encuentra a la persona que decide el gasto en marketing.`,
      },
      {
        heading: "Gestion de Contactos: El Tracker",
        body: `Usa una hoja de Google Sheets o una base de datos en Notion. No lo compliques.

COLUMNAS DEL GOOGLE SHEET:
• Nombre del Negocio — Nombre de la empresa
• Industria — Restaurante, Legal, Medico, etc.
• Ubicacion — Ciudad/Region
• Sitio Web — URL (o "Ninguno")
• Problemas del Sitio — Notas breves: "no es mobile", "template de Wix", "no tiene sitio"
• Nombre del Contacto — Nombre del dueno/tomador de decisiones
• Email del Contacto — Su email
• Fuente del Contacto — Donde encontraste el email (LinkedIn, sitio web, Hunter.io)
• Puntuacion — Puntuacion de calificacion (3–5)
• Estado — Sin Contactar / Email Enviado / Seguimiento 1 / Seguimiento 2 / Respondio / Reunion / No Interesado
• Fecha Primer Email — Cuando enviaste el primer contacto
• Fecha Seguimiento 1 — 3 dias despues del primer email
• Fecha Seguimiento 2 — 7 dias despues del primer email
• Notas — Contexto relevante para personalizacion
• Idioma — EN o ES (en que idioma escribir el email)

FLUJO DE ESTADOS:
Sin Contactar → Email Enviado → Seguimiento 1 (dia 3) → Seguimiento 2 (dia 7) → Cerrado/No Interesado
Si responden: Respondio → Reunion Agendada → Propuesta Enviada → Cliente / Perdido

REVISION SEMANAL (cada viernes):
• Cuantos emails se enviaron esta semana?
• Cuantas respuestas se recibieron?
• Se agendo alguna reunion?
• Que industrias/mensajes estan dando mejor resultado?
• Ajustar la estrategia basandose en lo que funciona`,
      },
      {
        heading: "Plantillas de Email",
        body: `PLANTILLA 1: SIN SITIO WEB

Asunto: Pregunta rapida sobre la presencia online de [Nombre del Negocio]

Hola [Nombre],

Encontre [Nombre del Negocio] en [Google Maps / Yelp / directorio] y note que actualmente no cuentan con un sitio web. Con [X] resenas positivas, claramente tienen una excelente reputacion — un sitio web les ayudaria a convertir esa reputacion en aun mas negocio.

Somos Bruma Studio, un estudio de desarrollo web que construye sitios modernos y rapidos para negocios como el suyo. Algunas cosas que un sitio podria hacer por ustedes:
• Aparecer en Google cuando la gente busca [industria] en [ciudad]
• Permitir que los clientes reserven citas / vean su menu / soliciten cotizaciones en linea
• Verse profesional ante nuevos clientes que los encuentran por primera vez

Estarian abiertos a una llamada rapida de 15 minutos para ver si tiene sentido? Sin presion.

Saludos,
[Tu Nombre]
Bruma Studio · brumastudio.dev

---

PLANTILLA 2: SITIO WEB MALO/DESACTUALIZADO

Asunto: Algo que note en el sitio web de [Nombre del Negocio]

Hola [Nombre],

Estuve revisando [URL del sitio web] y note algunas cosas que podrian estar costandoles clientes:
• [Problema especifico 1: ej., "El sitio no se ve bien en celular — el texto se encima y el menu es dificil de usar"]
• [Problema especifico 2: ej., "Tarda como 8 segundos en cargar, y la mayoria de los visitantes se van despues de 3"]
• [Problema especifico 3: ej., "No hay una forma clara de contactarlos o agendar una cita"]

Estos son problemas comunes y se solucionan con un rediseno moderno. Somos Bruma Studio — construimos sitios web rapidos, optimizados para celular, con un sistema de gestion de contenido para que ustedes puedan actualizar todo sin necesidad de un desarrollador.

Les interesaria ver como se veria un sitio renovado de [Nombre del Negocio]? Con gusto podemos preparar un mockup rapido sin costo.

Saludos,
[Tu Nombre]
Bruma Studio · brumastudio.dev

---

PLANTILLA 3: NEGOCIO SOLO EN REDES SOCIALES

Asunto: Convertir su Instagram en un sitio web profesional

Hola [Nombre],

He estado viendo [Nombre del Negocio] en [Instagram/Facebook] — su [productos/trabajo/comida] se ve increible. Por ahora, parece que manejan todo a traves de redes sociales y mensajes directos.

Han pensado en tener un sitio web propio? Les daria:
• Una base profesional que ustedes controlan (las redes sociales cambian sus algoritmos constantemente)
• La posibilidad de aparecer en busquedas de Google para [industria] en [ciudad]
• Una forma de que los clientes puedan [reservar / ordenar / cotizar] sin pasar por DMs

Construimos sitios web modernos especificamente para negocios como el suyo. Rapidos, optimizados para celular, y faciles de actualizar sin conocimiento tecnico.

Tendria sentido una llamada de 15 minutos para explorar esto?

Saludos,
[Tu Nombre]
Bruma Studio · brumastudio.dev

---

SEGUIMIENTO (Dia 3)

Asunto: Re: [asunto original]

Hola [Nombre],

Solo queria asegurarme de que mi mensaje anterior no se perdio en la bandeja de entrada. Me encantaria platicar sobre como un sitio web podria ayudar a crecer a [Nombre del Negocio].

Con gusto me adapto a su horario — incluso una llamada rapida de 15 minutos seria suficiente para ver si es un buen fit.

Saludos,
[Tu Nombre]

---

SEGUIMIENTO (Dia 7 — Final)

Asunto: Re: [asunto original]

Hola [Nombre],

Ultima nota de mi parte — no quiero ser una molestia. Si el timing no es el correcto, no hay problema.

Si en algun momento quieren explorar un sitio web para [Nombre del Negocio], mi bandeja siempre esta abierta. Tambien pueden ver lo que hacemos en brumastudio.dev.

Les deseo mucho exito continuo.

Saludos,
[Tu Nombre]
Bruma Studio`,
      },
      {
        heading: "Reglas para un Contacto Efectivo",
        body: `1. Nunca envies emails genericos. Cada email debe referenciar algo especifico sobre su negocio. "Note que su menu no esta en su sitio web" es mejor que "construimos sitios web para restaurantes."

2. Se breve. Menos de 150 palabras en el primer email. Los duenos de negocios estan ocupados.

3. Una sola peticion clara. No ofrezcas cinco cosas. Pide una llamada de 15 minutos. Eso es todo.

4. No vendas en el email. El objetivo del email es iniciar una conversacion, no cerrar un trato.

5. Haz seguimiento exactamente dos veces. Dia 3 y dia 7. Despues de eso, pasa al siguiente. Tres emails es persistente; cuatro es molesto.

6. Envia entre 8–10 AM en su zona horaria. Mejores tasas de apertura para duenos de negocios.

7. Usa su idioma. Si el negocio es principalmente hispanohablante, escribe en espanol. Si es bilingue, escribe en ingles pero menciona que hablas espanol.

8. No uses herramientas de envio masivo todavia. Con 10/dia, envia manualmente desde tu email de brumastudio.dev. Los envios personales tienen mejor entregabilidad y no se marcan como spam.

9. Registra todo en la hoja. Si no lo mides, no lo puedes mejorar.

10. Revisa semanalmente. Que industrias respondieron? Que asuntos de email tuvieron mas aperturas? Adapta.`,
      },
      {
        heading: "Industrias Objetivo (Ordenadas por ROI)",
        body: `Estas industrias se benefician mas de un sitio web profesional y son mas propensas a pagar:

1. Restaurantes y Cafeterias — menus, reservaciones, delivery, visibilidad en Google
2. Despachos de Abogados — la confianza es todo, un sitio barato destruye la credibilidad
3. Clinicas Medicas / Dentales — reserva de citas, informacion para pacientes
4. Agentes Inmobiliarios — listados, marca personal, captacion de leads
5. Servicios Profesionales (contadores, consultores, coaches) — credibilidad y generacion de leads
6. Oficios (contratistas, plomeros, electricistas) — el SEO local es enorme
7. Fitness / Bienestar (gimnasios, estudios de yoga, spas) — horarios de clases, reservas
8. Proveedores de Bodas / Eventos (fotografos, floristas, venues) — portafolio
9. E-commerce / Retail — capacidad de venta en linea
10. Agencias Creativas / Freelancers — portafolio y posicionamiento de marca`,
      },
      {
        heading: "Ciudades Objetivo",
        body: `Estados Unidos (enfoque en mercado hispano):
• San Diego, CA (cerca de Tijuana — ventaja de relacion local)
• Los Angeles, CA
• Miami, FL
• Houston, TX
• San Antonio, TX
• Chicago, IL
• New York, NY (especialmente Queens, Bronx)
• Phoenix, AZ

Latinoamerica:
• Ciudad de Mexico (CDMX)
• Monterrey
• Guadalajara
• Cancun / Riviera Maya (negocios de turismo)
• Bogota, Colombia
• Medellin, Colombia
• Lima, Peru
• Santiago, Chile
• Buenos Aires, Argentina`,
      },
      {
        heading: "Herramientas Gratuitas para Prospeccion",
        body: `Google Maps — Encontrar negocios, verificar si tienen sitio web (Ilimitado)
Google PageSpeed Insights — Probar la velocidad de un sitio — usar como evidencia (Ilimitado)
Hunter.io — Encontrar emails a partir de nombres de dominio (25 busquedas/mes)
Apollo.io — Base de datos de leads con emails verificados (50 creditos/mes)
LinkedIn — Encontrar duenos de negocios y tomadores de decisiones (Busqueda basica gratis)
Whois Lookup (who.is) — Encontrar email del dueno del dominio (Ilimitado)
Wappalyzer — Extension de navegador — muestra que tecnologia usa un sitio (Gratis)
BuiltWith — Verificar en que plataforma esta construido un sitio (Wix, WordPress, etc.) (Basico gratis)
GTmetrix — Prueba de velocidad/rendimiento de sitio web (Ilimitado)
Google Sheets — Gestion de contactos y tracker (Gratis)`,
      },
      {
        heading: "Metas Semanales",
        body: `Diario:
• Prospectos encontrados y calificados: 10–15
• Emails personalizados enviados: 8–10
• Seguimientos enviados: 5–8

Semanal:
• Prospectos encontrados y calificados: 50–75
• Emails personalizados enviados: 40–50
• Seguimientos enviados: 25–40
• Respuestas esperadas: 2–5
• Reuniones esperadas: 1–2

Mensual:
• Prospectos encontrados y calificados: 200–300
• Emails personalizados enviados: 160–200
• Seguimientos enviados: 100–160
• Respuestas esperadas: 8–20
• Reuniones esperadas: 4–8
• Nuevos clientes esperados: 1–3`,
      },
      {
        heading: "Que Pasa Despues de una Respuesta",
        body: `Cuando un prospecto responde con interes:

1. Responde dentro de 2 horas durante horario laboral. La velocidad importa.
2. Agenda una llamada de descubrimiento (15–30 minutos). Usar Calendly.
3. En la llamada: escucha primero. Pregunta sobre su negocio, sus metas, que han intentado antes. No vendas — entiende.
4. Despues de la llamada: envia un email de seguimiento resumiendo lo que platicaron y hazles saber que prepararas una propuesta.
5. Envia una propuesta dentro de 48 horas. Incluye alcance, timeline y precio (ajustado a su mercado y presupuesto).
6. Pasa el lead a Conrado para la propuesta y el cierre — el trabajo del prospector es llenar el pipeline, no cerrar tratos.`,
      },
    ],
  },
  {
    slug: "commissions-en",
    title: "Commission Plans Guide",
    description: "Earn more based on your level of involvement. Commission levels, earnings, and growth path.",
    lang: "en",
    sections: [
      {
        heading: "How It Works",
        body: `At Bruma Studio, we believe compensation should reflect effort and responsibility. That's why we have different commission levels depending on how involved you are in the sales process.

The more responsibility you take on, the higher your commission. You choose how involved you want to be.

Important: Commission is paid when the client pays Bruma Studio, not when the contract is signed. If the client pays in installments, you receive your percentage of each payment as it comes in.`,
      },
      {
        heading: "Our Service Plans",
        body: `For reference, these are the three service tiers we offer clients:

The Parchment (El Pergamino) — Landing page or single-page site. Responsive design, basic CMS, Vercel deployment. ~$1,000 USD

The Tome (El Tomo) — Multi-page site (up to 8 pages). UI/UX design, full Sanity CMS, team training. ~$1,500 USD

The Codex (El Codice) — Complex projects. Everything in The Tome plus: bilingual site, advanced integrations, design system, extended support. ~$2,000+ USD`,
      },
      {
        heading: "Quick Commission Summary",
        body: `Level 1 — Referrer: 10% commission. Occasional time commitment. You find referrals only — no prospecting, outreach, calls, or closing.

Level 2 — Prospector: 15–20% commission. 1–2 hrs/day. You find prospects, send outreach emails, and follow up. No sales calls or closing.

Level 3 — Closer: 20–25% commission. 2–3 hrs/day. You do everything from Level 2 plus sales calls and closing deals. Optional client management for +5%.`,
      },
      {
        heading: "Level 1 — The Referrer",
        body: `Commission: 10% of project value

What you do:
• Recommend Bruma Studio to someone you know who needs a website.
• Pass us their name, business, and contact info.
• We handle everything else — outreach, sales, delivery.

What you DON'T do:
• You don't actively search for prospects.
• You don't send emails or follow up.
• You don't participate in sales calls or close deals.

Earnings by project type:
• The Parchment ($1,000) → $100
• The Tome ($1,500) → $150
• The Codex ($2,000) → $200

Ideal for: people who know a lot of people and want to earn extra money passively, with no time commitment.`,
      },
      {
        heading: "Level 2 — The Prospector",
        body: `Commission: 15–20% of project value

What you do:
• Dedicate 1–2 hours daily to finding businesses that need a website.
• Research their current websites and identify specific problems.
• Send personalized first-contact emails (not generic templates).
• Follow up with non-responders (day 3 and day 7).
• Keep the prospect tracker updated in Google Sheets.
• When a prospect shows interest, hand them off to Conrado for the sales call.

What you DON'T do:
• You don't do the sales call or present proposals.
• You don't negotiate prices or promise delivery timelines.
• You don't participate in project delivery.

Earnings by project type:
• The Parchment ($1,000) → $150 at 15% / $200 at 20%
• The Tome ($1,500) → $225 at 15% / $300 at 20%
• The Codex ($2,000) → $300 at 15% / $400 at 20%

Starting commission: 15%. Moves to 20% after demonstrating consistency in the first month.

Ideal for: disciplined people who can dedicate daily time and are good at researching online and writing compelling emails.`,
      },
      {
        heading: "Level 3 — The Closer",
        body: `Commission: 20–25% of project value

What you do:
• Everything from Level 2, plus:
• Take the sales call with the prospect (15–30 minutes).
• Understand their needs, budget, and timeline.
• Present Bruma Studio's service options.
• Negotiate and close the deal (within parameters approved by Conrado).
• Coordinate contract signing and first payment.

What you DON'T do:
• You don't do technical work (design, development, deployment).
• You don't modify prices outside of approved ranges without checking first.

Earnings by project type:
• The Parchment ($1,000) → $200 at 20% / $250 at 25%
• The Tome ($1,500) → $300 at 20% / $375 at 25%
• The Codex ($2,000) → $400 at 20% / $500 at 25%

Starting commission: 20%. Moves to 25% after closing 3 clients.

Optional bonus (+5%): If you also manage client communication during the project (updates, revisions, feedback), commission can go up to 30% total.

Ideal for: people with sales skills, good communication, and the ability to manage client relationships.`,
      },
      {
        heading: "Retainer Commission (Monthly Contracts)",
        body: `If a client you brought in signs up for a monthly maintenance plan with Bruma Studio:

• You receive 10% of the monthly retainer value for the first 6 months.
• Example: $200 USD/month retainer → $20 USD/month for you over 6 months = $120 USD additional.
• This is on top of the original project commission.`,
      },
      {
        heading: "How to Grow",
        body: `You don't have to start at Level 3. In fact, we recommend starting at Level 2 and growing:

Months 1–2: Start as a Prospector (Level 2) at 15%. Learn the process, understand what clients are looking for, refine your emails.

Months 2–3: If you're generating consistent leads, move to 20%. Start sitting in on sales calls with Conrado to learn.

Months 3+: If you're comfortable closing deals, move to Closer (Level 3) at 20–25%. You handle the full sales cycle.

The idea is simple: the more value you generate, the more you earn. There's no ceiling.`,
      },
      {
        heading: "How Much Can I Earn?",
        body: `These are estimates based on an average project value of $1,500 USD (The Tome):

Conservative (Level 2, 15%): 1 project/month → $225/month → $2,700/year
Moderate (Level 3, 20%): 2 projects/month → $600/month → $7,200/year
Aggressive (Level 3, 25%): 3 projects/month → $1,125/month → $13,500/year
Aggressive + Codex (Level 3, 25%, large projects): 3 projects/month → $1,500/month → $18,000/year

Note: These numbers don't include retainer commissions, which are additional income.`,
      },
      {
        heading: "Rules of the Game",
        body: `• Honesty always. Never promise something we can't deliver. If you don't know the answer, say "let me confirm with the team."
• The tracker is your best friend. If it's not in the Google Sheet, it doesn't count. Log every prospect BEFORE contacting them.
• Quality over quantity. 10 personalized emails are worth more than 50 copy-paste ones.
• Follow-up is key. 80% of sales close in the follow-up, not the first email.
• Respect the "no." If someone says they're not interested, thank them and move on. Never insist.
• Communicate. If you have questions about pricing, services, or how to respond to a prospect, ask. It's better to ask than to make something up.`,
      },
    ],
  },
  {
    slug: "commissions-es",
    title: "Guia de Planes de Comision",
    description: "Gana mas segun tu nivel de participacion. Niveles de comision, ganancias y ruta de crecimiento.",
    lang: "es",
    sections: [
      {
        heading: "Como Funciona",
        body: `En Bruma Studio, creemos que la compensacion debe reflejar el esfuerzo y la responsabilidad. Por eso tenemos diferentes niveles de comision dependiendo de que tanto te involucres en el proceso de ventas.

Entre mas responsabilidad asumas, mayor es tu comision. Tu decides cuanto quieres involucrarte.

Importante: La comision se paga cuando el cliente le paga a Bruma Studio, no cuando se firma el contrato. Si el cliente paga en partes, tu recibes tu porcentaje de cada pago conforme vaya llegando.`,
      },
      {
        heading: "Nuestros Planes de Servicio",
        body: `Para referencia, estos son los tres niveles de servicio que ofrecemos a los clientes:

The Parchment (El Pergamino) — Landing page o sitio de una pagina. Diseno responsive, CMS basico, deploy en Vercel. ~$1,000 USD

The Tome (El Tomo) — Sitio multi-pagina (hasta 8 paginas). Diseno UI/UX, Sanity CMS completo, capacitacion al equipo. ~$1,500 USD

The Codex (El Codice) — Proyectos complejos. Todo lo del Tomo mas: sitio bilingue, integraciones avanzadas, design system, soporte extendido. ~$2,000+ USD`,
      },
      {
        heading: "Resumen Rapido de Comisiones",
        body: `Nivel 1 — Referidor: 10% de comision. Tiempo ocasional. Solo pasas referidos — sin prospeccion, contacto, llamadas ni cierre.

Nivel 2 — Prospector: 15–20% de comision. 1–2 hrs/dia. Buscas prospectos, envias emails de contacto y das seguimiento. Sin llamadas de ventas ni cierre.

Nivel 3 — Cerrador: 20–25% de comision. 2–3 hrs/dia. Haces todo del Nivel 2 mas llamadas de ventas y cierre de tratos. Gestion de cliente opcional por +5%.`,
      },
      {
        heading: "Nivel 1 — El Referidor",
        body: `Comision: 10% del valor del proyecto

Lo que haces:
• Recomiendas a Bruma Studio con alguien que conoces y que necesita un sitio web.
• Nos pasas el nombre, negocio y datos de contacto de la persona.
• Nosotros nos encargamos de todo lo demas — contacto, venta, entrega.

Lo que NO haces:
• No buscas prospectos activamente.
• No envias emails ni haces seguimiento.
• No participas en llamadas de venta ni cierras tratos.

Ejemplos de ganancia por tipo de proyecto:
• The Parchment ($1,000) → $100
• The Tome ($1,500) → $150
• The Codex ($2,000) → $200

Ideal para: personas que conocen mucha gente y quieren ganar dinero extra de forma pasiva, sin compromiso de tiempo.`,
      },
      {
        heading: "Nivel 2 — El Prospector",
        body: `Comision: 15–20% del valor del proyecto

Lo que haces:
• Dedicas 1–2 horas diarias a buscar negocios que necesiten un sitio web.
• Investigas sus sitios web actuales e identificas problemas especificos.
• Envias emails personalizados de primer contacto (no plantillas genericas).
• Das seguimiento a los que no responden (dia 3 y dia 7).
• Mantienes actualizado el tracker de prospectos en Google Sheets.
• Cuando un prospecto muestra interes, lo pasas a Conrado para la llamada de ventas.

Lo que NO haces:
• No haces la llamada de ventas ni presentas propuestas.
• No negocias precios ni prometes plazos de entrega.
• No participas en la entrega del proyecto.

Ejemplos de ganancia por tipo de proyecto:
• The Parchment ($1,000) → $150 al 15% / $200 al 20%
• The Tome ($1,500) → $225 al 15% / $300 al 20%
• The Codex ($2,000) → $300 al 15% / $400 al 20%

Comision inicial: 15%. Sube a 20% despues de demostrar consistencia en el primer mes.

Ideal para: personas disciplinadas que pueden dedicar tiempo diario y son buenas investigando en internet y escribiendo emails convincentes.`,
      },
      {
        heading: "Nivel 3 — El Cerrador",
        body: `Comision: 20–25% del valor del proyecto

Lo que haces:
• Todo lo del Nivel 2, mas:
• Tomas la llamada de ventas con el prospecto (15–30 minutos).
• Entiendes sus necesidades, presupuesto y timeline.
• Presentas las opciones de servicio de Bruma Studio.
• Negocias y cierras el trato (con parametros aprobados por Conrado).
• Coordinas la firma del contrato y el primer pago.

Lo que NO haces:
• No haces el trabajo tecnico (diseno, desarrollo, despliegue).
• No modificas precios fuera de los rangos aprobados sin consultar primero.

Ejemplos de ganancia por tipo de proyecto:
• The Parchment ($1,000) → $200 al 20% / $250 al 25%
• The Tome ($1,500) → $300 al 20% / $375 al 25%
• The Codex ($2,000) → $400 al 20% / $500 al 25%

Comision inicial: 20%. Sube a 25% despues de cerrar 3 clientes.

Bonus opcional (+5%): Si ademas gestionas la comunicacion con el cliente durante el proyecto (actualizaciones, revisiones, feedback), la comision puede subir hasta 30% en total.

Ideal para: personas con habilidad de ventas, buena comunicacion y capacidad de manejar relaciones con clientes.`,
      },
      {
        heading: "Comision en Retainers (Contratos Mensuales)",
        body: `Si un cliente que tu trajiste contrata un plan de mantenimiento mensual con Bruma Studio:

• Recibes el 10% del valor mensual del retainer durante los primeros 6 meses.
• Ejemplo: retainer de $200 USD/mes → $20 USD/mes para ti durante 6 meses = $120 USD adicionales.
• Esto es adicional a la comision del proyecto original.`,
      },
      {
        heading: "Como Crecer",
        body: `No tienes que empezar en el Nivel 3. De hecho, recomendamos empezar en el Nivel 2 y crecer:

Mes 1–2: Empieza como Prospector (Nivel 2) al 15%. Aprende el proceso, entiende que buscan los clientes, perfecciona tus emails.

Mes 2–3: Si estas generando leads consistentes, sube a 20%. Empieza a participar en llamadas de ventas con Conrado para aprender.

Mes 3+: Si te sientes comodo cerrando tratos, pasa a Cerrador (Nivel 3) al 20–25%. Manejas el ciclo completo de ventas.

La idea es que entre mas valor generes, mas ganes. No hay techo.`,
      },
      {
        heading: "Cuanto Puedo Ganar?",
        body: `Estas son estimaciones basadas en un valor promedio de proyecto de $1,500 USD (El Tomo):

Conservador (Nivel 2, 15%): 1 proyecto/mes → $225/mes → $2,700/ano
Moderado (Nivel 3, 20%): 2 proyectos/mes → $600/mes → $7,200/ano
Agresivo (Nivel 3, 25%): 3 proyectos/mes → $1,125/mes → $13,500/ano
Agresivo + Codex (Nivel 3, 25%, proyectos grandes): 3 proyectos/mes → $1,500/mes → $18,000/ano

Nota: Estos numeros no incluyen comisiones por retainers mensuales, que son ingreso adicional.`,
      },
      {
        heading: "Reglas del Juego",
        body: `• Honestidad siempre. Nunca prometas algo que no podamos cumplir. Si no sabes la respuesta, di "dejame confirmarlo con el equipo".
• El tracker es tu mejor amigo. Si no esta en el Google Sheet, no cuenta. Registra cada prospecto ANTES de contactarlo.
• Calidad sobre cantidad. 10 emails personalizados valen mas que 50 copiar y pegar.
• Seguimiento es clave. El 80% de las ventas se cierran en el seguimiento, no en el primer email.
• Respeta los "no". Si alguien dice que no le interesa, agradece y pasa al siguiente. Nunca insistas.
• Comunica. Si tienes dudas sobre precios, servicios o como responder a un prospecto, pregunta. Es mejor preguntar que inventar.`,
      },
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return salesGuides.find((g) => g.slug === slug);
}
