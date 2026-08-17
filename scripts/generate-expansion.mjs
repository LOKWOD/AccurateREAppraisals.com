import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

const root = process.cwd();
const siteUrl = "https://accuratereappraisals.com";

const pages = [
  {
    slug: "understanding-appraisal-adjustments.html",
    title: "Understanding Appraisal Adjustments",
    description: "How residential appraisal adjustments are developed, supported and reconciled in Central New York rather than guessed from a universal price-per-item list.",
    lead: "An adjustment is the appraiser's way of accounting for a meaningful difference between the subject property and a comparable sale. It is not a fixed menu price for a bedroom, garage, acre or finished basement.",
    sections: [
      ["Adjustments reflect market reaction", ["The relevant question is how buyers reacted to a difference in the market at the effective date. Two homes may differ by a garage bay, site size or condition, but the adjustment depends on local alternatives, buyer expectations and the interaction of the feature with the rest of the property.", "A cost estimate can provide context, but cost does not automatically equal contributory value."]],
      ["Evidence can come from several methods", ["Appraisers may study paired sales, grouped sales, regression or other statistical patterns, resale data, depreciated cost, sensitivity testing, listings and qualitative market evidence. Thin markets rarely produce one perfect pair.", "The report should explain the evidence at a level appropriate to the assignment rather than presenting unsupported precision."]],
      ["Not every difference needs a dollar adjustment", ["Some differences are already captured by overall quality, condition, location or functional utility. Others are too small to influence typical buyer decisions. An appraiser may use qualitative analysis when the market signal is real but not credibly measurable as a single dollar amount.", "The absence of an adjustment does not mean the feature was ignored."]],
      ["Reconciliation matters more than arithmetic", ["A sales comparison grid can create the appearance of mathematical certainty. The final opinion still requires judgment about which sales are most comparable, which adjustments are best supported and how much weight each indication deserves.", "A credible reconciliation discusses strengths, weaknesses and remaining uncertainty."]]
    ],
    checklist: ["Identify the property difference being analyzed", "Ask whether buyers recognize the difference", "Use evidence from the correct market and time period", "Avoid treating cost as automatic value", "Consider interaction with quality, condition and location", "Explain qualitative treatment when precision is not supportable", "Reconcile the strongest comparable evidence"],
    faq: [
      ["Is there a standard adjustment for an extra bedroom?", "No. Bedroom utility depends on total living area, layout, market expectations and whether the difference actually changes buyer behavior."],
      ["Why are gross and net adjustments reviewed?", "They can help identify how much modification was required to make a sale comparable, but they are diagnostic tools rather than automatic acceptability tests."],
      ["Can an adjustment be zero?", "Yes. A feature may have no measurable market impact, may be offset by another characteristic or may be addressed qualitatively."],
      ["Why can two appraisers use different adjustments?", "They may select different comparables, data sets or methods. The important question is whether each analysis is credible, supported and clearly explained."]
    ]
  },
  {
    slug: "what-appraisers-look-for.html",
    title: "What Residential Appraisers Look For",
    description: "A clear explanation of the property, site, condition, quality, utility and market information considered during a Central New York residential appraisal.",
    lead: "An appraisal inspection is not a home inspection and not a pass-fail test. The appraiser observes the characteristics needed to identify the property, analyze its market position and complete the assignment scope.",
    sections: [
      ["Site and location", ["The appraiser considers location, access, land area, topography, utilities, zoning context, views, frontage, external influences and the way the site functions for typical buyers. Total acreage alone does not explain usable land or market appeal.", "Waterfront, rural and mixed-use surroundings often require additional verification."]],
      ["Building characteristics", ["Relevant items can include design, age, gross living area, room count, layout, foundation, basement, garages, porches, accessory structures, quality and condition. The appraiser distinguishes above-grade living area from finished below-grade space and identifies additions or conversions.", "Public records are checked, but the inspection may reveal differences that require clarification."]],
      ["Condition and needed work", ["The appraiser observes visible condition and deferred maintenance relevant to value or assignment requirements. Ordinary clutter is not the same as physical deterioration. Incomplete renovations, water damage, structural concerns or inaccessible areas may require additional information.", "A lender assignment may include requirements that are different from a private appraisal."]],
      ["Market evidence", ["The inspection is only one part of the assignment. The appraiser also researches sales, listings, market trends, concessions, financing, property history and neighborhood competition.", "The final analysis connects the subject's observed characteristics with how buyers behaved in the relevant market."]]
    ],
    checklist: ["Provide access to all relevant rooms and areas", "Identify additions, conversions and accessory units", "List major improvements with approximate dates", "Provide surveys for unusual sites", "Explain private roads, shared drives or water rights", "Disclose active repairs or incomplete work", "Keep factual property records available"],
    faq: [
      ["Does the appraiser inspect every system like a home inspector?", "No. The appraiser observes information relevant to valuation and the assignment scope. A home inspection is a different service focused on condition and defects."],
      ["Does cleanliness affect value?", "Normal housekeeping usually is not the issue. Condition, maintenance, damage, quality and functional utility matter more."],
      ["Will the appraiser measure the house?", "Many assignments include measuring or verifying living area, but the exact scope depends on the client and report type."],
      ["Can the owner point out improvements?", "Yes. A concise factual list can help, although the appraiser independently determines relevance and market contribution."]
    ]
  },
  {
    slug: "finished-basement-value-guide.html",
    title: "Finished Basements and Appraised Value",
    description: "How Central New York appraisers analyze finished basements, walkouts, recreation rooms, bedrooms, bathrooms and below-grade utility.",
    lead: "Finished basement space can add meaningful utility and value, but it is generally analyzed separately from above-grade gross living area. The market response depends on access, light, finish, layout, condition and competition.",
    sections: [
      ["Above grade and below grade are different categories", ["Appraisal reporting conventions typically separate finished below-grade area from above-grade living area. A beautifully finished basement is not simply added to the home's first- and second-floor square footage.", "This separation improves consistency and allows the appraiser to compare basement utility with market evidence from similar homes."]],
      ["Quality of utility matters", ["Walkout access, full-size windows, ceiling height, moisture control, heating, bathrooms and functional layout can influence buyer reaction. A dark open recreation room and a well-integrated walkout suite may not receive the same treatment.", "Legal use and code compliance can also affect marketability, although appraisers are not code enforcement officials."]],
      ["Bedrooms require careful description", ["A room used for sleeping may not meet local requirements for a legal bedroom. The appraiser should describe what is observed and avoid overstating room count.", "Egress, access, ceiling height, heating and the broader market context may be relevant to utility and lender requirements."]],
      ["Condition can reverse the benefit", ["Water intrusion, mold-like staining, foundation movement, unfinished work or damaged finishes can reduce the contribution of basement improvements and may create repair concerns.", "Document drainage repairs, waterproofing and completed work when those facts are important."]]
    ],
    checklist: ["Separate above-grade and below-grade area", "Measure or document finished basement sections", "Identify walkout or interior-only access", "Note bathrooms and functional rooms", "Document moisture or repair history", "Provide permits when available", "Compare with sales that offer similar basement utility"],
    faq: [
      ["Is finished basement area worth the same per square foot as above-grade area?", "Usually not. Market evidence commonly supports a different contribution, and the relationship varies by property and location."],
      ["Can a basement bedroom be counted?", "It depends on the observed characteristics, legal requirements, assignment standards and market treatment. The appraiser should describe the space accurately."],
      ["Does a walkout basement add more value?", "It can, because access, light and integration may improve utility, but the contribution must be supported by the market."],
      ["Will waterproofing costs be fully recovered?", "Not necessarily. Waterproofing may cure a defect and protect marketability rather than create a dollar-for-dollar premium."]
    ]
  },
  {
    slug: "adu-in-law-apartment-appraisal.html",
    title: "ADUs, In-Law Apartments and Appraisal Analysis",
    description: "How appraisers analyze accessory dwelling units, in-law apartments, second kitchens and multi-generational living arrangements in Central New York homes.",
    lead: "An accessory living area can add flexibility and buyer appeal, but the appraisal must first identify what the space is, whether it is permitted, how it functions and how the market treats similar properties.",
    sections: [
      ["Describe the physical setup", ["The appraiser considers access, kitchen facilities, bathrooms, sleeping areas, utilities, privacy, connection to the main dwelling and whether the space is above grade, below grade or detached.", "Labels such as in-law suite, apartment and ADU are not interchangeable without supporting facts."]],
      ["Research legal and zoning context", ["Permits, certificates, zoning rules and occupancy limitations can affect marketability and use. The appraiser may need municipal information or client direction when the legal status is unclear.", "The appraisal should not assume that physical use establishes legal use."]],
      ["Identify the likely buyer benefit", ["Some buyers value multi-generational living, guest space, caregiver housing or rental potential. Others may see duplicated kitchens or altered layouts as unnecessary.", "Market contribution depends on demand, quality, privacy, operating costs and the availability of comparable alternatives."]],
      ["Avoid automatic two-family classification", ["A home with a second kitchen is not automatically a legal two-family property. Classification requires analysis of design, use, legal status and the intended assignment.", "Clear property records and photographs help prevent the wrong comparison set."]]
    ],
    checklist: ["Document entrances and interior connections", "Identify all kitchens and bathrooms", "Provide permits or municipal records", "Explain utility metering and heating", "Clarify current and intended use", "Identify lease terms if occupied", "Compare with properties offering similar flexibility"],
    faq: [
      ["Does an ADU always increase value?", "No. It may add value when legal, functional and desired by buyers, but poor layout, uncertain status or over-improvement can limit contribution."],
      ["Is rental income always used?", "Not in every assignment. The property type, intended use, legal status and available market evidence determine whether income analysis is relevant."],
      ["Can a basement apartment be included?", "It can be analyzed, but below-grade location, access, light, egress, legal status and market demand all matter."],
      ["What documents are useful?", "Permits, certificates, floor plans, leases, utility information and a clear description of current use can help define the assignment."]
    ]
  },
  {
    slug: "solar-panels-home-value.html",
    title: "Solar Panels and Home Value",
    description: "How residential appraisers consider owned, financed, leased and power-purchase solar systems in Central New York valuation assignments.",
    lead: "Solar equipment cannot be analyzed from the panels alone. Ownership, financing, transfer terms, age, production, utility savings, condition and buyer reaction determine whether and how the system contributes to value.",
    sections: [
      ["Start with ownership and obligations", ["An owned system, a financed system, a lease and a power-purchase agreement create different rights and obligations. The appraiser needs the current contract and payoff or transfer information when relevant.", "A visible array does not prove that the homeowner owns the equipment as real property."]],
      ["Measure utility, not marketing claims", ["Production history, remaining useful life, inverter age, roof condition, utility rates and expected savings may be relevant. Promotional estimates should be verified against actual records when possible.", "A system installed on a roof nearing replacement may create both benefit and future cost."]],
      ["Look for market evidence", ["Comparable sales with similar solar arrangements may be limited. Appraisers can analyze matched groups, resale behavior, documented savings, cost information and local buyer reaction.", "Any premium should be supported rather than assumed from installation cost."]],
      ["Consider transfer and financing effects", ["Buyer qualification, lien or UCC filings, lease transfer requirements and payoff terms can affect marketability. Those matters should be identified early in a sale or refinance.", "The appraiser reports relevant facts but does not interpret contracts as legal counsel."]]
    ],
    checklist: ["Confirm whether the system is owned, financed or leased", "Provide the complete agreement and payoff information", "Gather recent production records", "Document installation and equipment dates", "Identify roof age and condition", "Provide utility savings information", "Verify transfer requirements before listing or refinancing"],
    faq: [
      ["Do solar panels add their full installation cost to value?", "No. Market contribution depends on rights, savings, age, condition and buyer demand rather than cost alone."],
      ["Can leased panels be included as real property?", "The treatment depends on ownership and contract terms. Leased equipment may not be owned by the homeowner."],
      ["Does the appraiser need the solar contract?", "Yes, when the agreement affects ownership, payments, transfer or property rights."],
      ["What if there are no comparable solar sales?", "The appraiser may use multiple sources of evidence and explain the limitations rather than forcing an unsupported adjustment."]
    ]
  },
  {
    slug: "new-construction-appraisal-guide.html",
    title: "New Construction Appraisal Guide",
    description: "How plans, specifications, contracts, site work, inspections and completion status are handled in Central New York new-construction residential appraisals.",
    lead: "A new-construction appraisal often develops a value opinion subject to completion according to plans and specifications. The quality of the documents and the match between plans, contract and observed work are critical.",
    sections: [
      ["Provide complete plans and specifications", ["The appraiser needs enough information to understand design, size, room count, quality, finishes, mechanical systems, site improvements, garages, porches and other relevant features.", "A short allowance sheet may not fully define the home when significant selections remain open."]],
      ["Separate cost from market value", ["Construction cost is important background, but the appraisal analyzes what the completed property is expected to be worth in its market. Land acquisition, builder profit, site difficulty and owner upgrades can cause cost and value to diverge.", "Comparable new and recent resale homes help establish buyer reaction."]],
      ["Track changes during construction", ["Change orders can alter living area, room count, quality, basement finish, garages or site work. Material changes should be supplied before final inspection or report revision.", "The final inspection verifies completion for the stated assignment; it is not a comprehensive construction-quality inspection."]],
      ["Understand subject-to-completion conditions", ["When the home is incomplete, the appraisal may use a hypothetical condition or other assignment condition that assumes completion as described. The report should identify what is assumed.", "Missing plans, uncertain finishes or incomplete site work can delay the assignment or require additional assumptions."]]
    ],
    checklist: ["Provide signed plans and current specifications", "Include the construction contract and change orders", "Identify allowances and unresolved selections", "Provide survey and site information", "Document well, septic, driveway and landscaping", "Report material plan changes promptly", "Schedule final inspection only when required work is complete"],
    faq: [
      ["Is the contract price the appraised value?", "No. The contract is analyzed, but the value opinion must be supported by the market."],
      ["Can the appraisal be completed before construction starts?", "Often yes, when plans, specifications, site information and assignment conditions are sufficient."],
      ["What happens if the finished home differs from the plans?", "Material differences may require analysis, revision or a new assignment depending on the client and scope."],
      ["Does a final inspection certify construction quality?", "No. It generally addresses completion for the appraisal assignment and is not a substitute for code, engineering or home inspection services."]
    ]
  }
];

function esc(value) {
  return String(value).replace(/[&<>\"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[char]));
}

function render(page) {
  const canonical = `${siteUrl}/guides/${page.slug}`;
  const body = page.sections.map(([heading, paragraphs]) => `<h2>${esc(heading)}</h2>${paragraphs.map((p) => `<p>${esc(p)}</p>`).join("")}`).join("");
  const checklist = page.checklist.map((item) => `<li>${esc(item)}</li>`).join("");
  const faq = page.faq.map(([q, a]) => `<details class="faq-item"><summary>${esc(q)}</summary><div><p>${esc(a)}</p></div></details>`).join("");
  const articleSchema = { "@context": "https://schema.org", "@type": "Article", headline: page.title, description: page.description, url: canonical, dateModified: "2026-08-17", author: { "@type": "Organization", name: "Accurate Real Estate Appraisals" }, publisher: { "@type": "Organization", name: "Accurate Real Estate Appraisals" } };
  const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: page.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(page.title)} | Accurate Real Estate Appraisals</title><meta name="description" content="${esc(page.description)}"><link rel="canonical" href="${canonical}"><meta name="theme-color" content="#0a2342"><meta property="og:type" content="article"><meta property="og:site_name" content="Accurate Real Estate Appraisals"><meta property="og:title" content="${esc(page.title)}"><meta property="og:description" content="${esc(page.description)}"><meta property="og:url" content="${canonical}"><meta name="twitter:card" content="summary"><link rel="icon" href="../assets/logo-mark.svg" type="image/svg+xml"><link rel="stylesheet" href="../assets/style.css"><script type="application/ld+json">${JSON.stringify(articleSchema)}</script><script type="application/ld+json">${JSON.stringify(faqSchema)}</script></head><body><a class="skip-link" href="#main">Skip to main content</a><div class="topbar"><div class="wrap topbar-inner"><div class="topbar-contact"><a href="tel:+13154135024">315-413-5024</a><span aria-hidden="true">•</span><a href="mailto:info@accuratereappraisals.org">info@accuratereappraisals.org</a></div><div class="topbar-area">Serving Central New York</div></div></div><header class="site-header"><div class="wrap nav"><a class="brand" href="../index.html"><span class="brand-fallback"><strong>ACCURATE</strong><span> Real Estate Appraisals</span><small>a division of ARE Appraisals, Inc.</small></span></a><nav class="primary-nav" aria-label="Primary navigation"><a href="../index.html">Home</a><a href="../services/">Services</a><a href="../areas/">Counties</a><a aria-current="page" href="../guides/">Guides</a><a href="../resources.html">Resources</a><a href="../about.html">About</a></nav><a class="request-button" href="../request-appraisal.html">Request an Appraisal</a></div></header><main id="main"><section class="page-hero"><div class="wrap"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="../index.html">Home</a><span>/</span><a href="index.html">Guides</a><span>/</span><span>${esc(page.title)}</span></nav><p class="eyebrow">Residential Appraisal Guide</p><h1>${esc(page.title)}</h1><p class="lead">${esc(page.lead)}</p></div></section><section class="section"><div class="wrap content-grid"><article class="article"><p><strong>Updated August 17, 2026.</strong> This material is general appraisal information and is not legal, tax, engineering or accounting advice.</p>${body}<h2>Property and assignment checklist</h2><ul class="check-list">${checklist}</ul><section class="faq-block"><h2>Frequently asked questions</h2><div class="faq-list">${faq}</div></section><div class="callout"><strong>Need a property-specific scope?</strong><p>Send the property address, intended use, effective date and any unusual features so the assignment can be reviewed before scheduling.</p><a class="btn" href="../request-appraisal.html">Request an Appraisal</a></div></article><aside class="sidebar"><div class="card"><p class="mini">GUIDE LIBRARY</p><h3>Continue reading</h3><a class="text-link" href="index.html">All appraisal guides</a><a class="text-link" href="prepare-for-appraisal.html">Prepare for an appraisal</a><a class="text-link" href="rural-waterfront-guide.html">Rural and waterfront property</a></div><div class="card"><h3>Need a report?</h3><a class="text-link" href="../services/">Appraisal services</a><a class="text-link" href="../request-appraisal.html">Start a request</a></div></aside></div></section></main><footer><div class="wrap footer-grid"><div class="footer-brand"><strong>Accurate Real Estate Appraisals</strong><p>a division of ARE Appraisals, Inc.</p><p>Independent residential valuation throughout Central New York.</p></div><div><strong>Contact</strong><p><a href="tel:+13154135024">315-413-5024</a><br><a href="mailto:info@accuratereappraisals.org">info@accuratereappraisals.org</a></p></div><div><strong>Explore</strong><div class="footer-links"><a href="../services/">Services</a><a href="../areas/">Counties</a><a href="../guides/">Guides</a><a href="../resources.html">Resources</a></div></div><div><strong>Syracuse</strong><p><a href="https://syracuseappraiser.com">SyracuseAppraiser.com</a></p></div></div><div class="wrap footer-bottom"><span>© 2026 Accurate Real Estate Appraisals / ARE Appraisals, Inc.</span><span>Residential real estate appraisal services • Central New York</span></div></footer></body></html>`;
}

function upsert(path, marker, block) {
  const full = join(root, path);
  let html = readFileSync(full, "utf8");
  const start = `<!-- ${marker} START -->`;
  const end = `<!-- ${marker} END -->`;
  const wrapped = `${start}${block}${end}`;
  const pattern = new RegExp(`${start.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}[\\s\\S]*?${end.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
  if (pattern.test(html)) html = html.replace(pattern, wrapped);
  else if (html.includes("</main>")) html = html.replace("</main>", `${wrapped}</main>`);
  else html = html.replace("</body>", `${wrapped}</body>`);
  writeFileSync(full, html);
}

for (const page of pages) {
  const full = join(root, "guides", page.slug);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, render(page));
}

const cards = `<section class="section alt"><div class="wrap"><p class="eyebrow">NEW APPRAISAL EXPLAINERS</p><h2>Understand the property before the decision</h2><div class="grid three">${pages.map((page) => `<a class="related-card" href="${page.slug}"><span class="mini">New guide</span><strong>${esc(page.title)}</strong><span>${esc(page.description)}</span></a>`).join("")}</div></div></section>`;
upsert("guides/index.html", "ACCURATE EXPANSION", cards);

const sitemapPath = join(root, "sitemap.xml");
let sitemap = readFileSync(sitemapPath, "utf8");
for (const page of pages) {
  const loc = `${siteUrl}/guides/${page.slug}`;
  const escaped = loc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  sitemap = sitemap.replace(new RegExp(`<url>\\s*<loc>${escaped}<\\/loc>[\\s\\S]*?<\\/url>\\s*`, "g"), "");
}
const entries = pages.map((page) => `<url><loc>${siteUrl}/guides/${page.slug}</loc><lastmod>2026-08-17</lastmod><changefreq>monthly</changefreq><priority>0.72</priority></url>`).join("");
sitemap = sitemap.replace("</urlset>", `${entries}</urlset>`);
writeFileSync(sitemapPath, sitemap);

console.log(`Generated ${pages.length} Accurate Real Estate Appraisals guides and refreshed the guide hub and sitemap.`);
