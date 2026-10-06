# Portfolio Project Business Study
 
---
 
## Introduction
 
This document is a companion to **Project Charter Development (Stage 2)**. While the charter focuses on the project's objectives, scope, and plan at a high level, this study expands in more depth on the business side of the platform: the pain points we address, the market gap, market research, and the business and technical risks we expect within 6 months after the MVP.
 
It serves as a reference for the team, mentors, and potential partners, supported by a study of the Saudi market with real figures and cited sources.
 
> **Note:** This study is a preliminary research document. It is not a final business plan or feasibility study, but a guide that helps the team understand the market and identify what we need to think about, validate, and plan for as we move beyond the MVP. It is a work in progress and open to additions and updates as we gather more market insights, validate our assumptions with potential clients, and refine our business model. Market figures and regulations may change over time and should be re-verified before any business or investment decision.
 
---
 
## Table of Contents
 
1. [Executive Summary](#1-executive-summary)
2. [The Problem: Field Operations Without Data](#2-the-problem-field-operations-without-data)
3. [Pain Points](#3-pain-points)
4. [Market Research](#4-market-research)
5. [Target Customers](#5-target-customers)
6. [Competitive Landscape & Market Gap](#6-competitive-landscape--market-gap)
7. [Value Proposition](#7-value-proposition)
8. [Business Model](#8-business-model)
9. [Go-to-Market Strategy](#9-go-to-market-strategy)
10. [Regulatory Landscape](#10-regulatory-landscape)
11. [Post-MVP Risks "Within 6 Months"](#11-post-mvp-risks-within-6-months)
12. [Validation Plan](#12-validation-plan)
13. [Sources](#13-sources)
---
 
## 1. Executive Summary
 
Saudi Arabia's contracting sector is large, fast-growing, and almost entirely undigitized at the operational level. Under Vision 2030, contract awards keep rising and the number of operating establishments grew 29.6% in a single year. Yet the way a contractor knows what happened on site yesterday has not changed: paper sheets, gate check-ins, and WhatsApp.
 
Our platform is an **operations tracking system for field workforces**. It works by tracking workers and recording their assigned tasks, producing a structured daily record of where each worker was, which project and zone they worked in, how many hours they logged, and what was completed. That record is exported as organized reports for management review, client reporting, and regulatory compliance.
 
#### The Sector at a Glance
 
| Indicator | Figure |
|---|---|
| Contracting establishments in Saudi Arabia (end 2025) | 365,120, up 29.6% year on year |
| Active memberships, Saudi Contractors Authority | 70,488, up over 900% in three years |
| Workers in the contracting sector | More than 4 million |
| Sector contribution to GDP | 7.75% |
| Facility management market (2026) | USD 54.56 billion, with soft services at 74.33% |
| Licensed private security companies | ~350 companies employing ~70,000 guards |
| Construction professionals familiar with location trackers | Only 27.3% |
 
#### Where the Real Market Is
 
The headline figure of 70,488 contractors is misleading for our purposes. The size distribution tells a different story:
 
| Establishment Size | Count | Share | Workers |
|---|---|---|---|
| Micro | 309,910 | 84.88% | 1–5 |
| Small | 45,700 | 12.52% | 6–49 |
| **Medium** | **8,555** | **2.34%** | **50–249** |
| Large | ~955 | ~0.26% | 250+ |
 
Micro establishments make up 85% of the sector but cannot pay for, staff, or benefit from an operations platform. Our realistic addressable base is the **8,555 medium plus ~955 large establishments**, roughly 9,500 companies, supplemented by facility management, cleaning, and security firms of comparable size.
 
**The opportunity:** medium-sized companies running several concurrent sites have outgrown paper but are too small to attract the enterprise platforms built for giga-projects. They have no affordable way to produce a reliable operational record. That is the gap we enter.
 
---
 
## 2. The Problem: Field Operations Without Data
 
### How Field Operations Are Managed Today
 
A medium contractor may run three or four sites at once with crews moving between them. Supervisors take attendance on paper, coordinate over WhatsApp, and report progress by phone at the end of the day. Facility management and cleaning companies face the same pattern across client locations, and security firms across dispersed posts.
 
This information is scattered, manual, and rarely stored in a structured way. At the end of the day, the company is left with little reliable data about what actually happened: where each crew spent its time, how many hours were worked on which project, what was completed, and whether a site was staffed as promised.
 
### Why This Is a Problem
 
- **Labour cost cannot be allocated:** Labour is the largest variable cost in field work. When hours are attributed to projects by estimate, the real cost and profitability of each project remain unknown.
- **Decisions are based on guesswork:** Managers decide staffing and scheduling without knowing how resources were actually used last week.
- **Client commitments cannot be evidenced:** When a client asks whether a site was staffed as contracted, the answer is a signed paper sheet that carries little weight.
- **Compliance is hard to prove:** Saudi labour law requires employers to keep an attendance and departure record among six mandatory registers. Paper versions are easy to complete retroactively and weak during inspection.
- **Reporting consumes supervisor time:** Supervisors spend hours compiling manual reports instead of managing their crews.
### Why It Has Not Been Solved Yet
 
- **Enterprise platforms target giga-projects:** Solutions like WakeCap are deployed on projects worth billions and are priced and scoped accordingly.
- **Attendance apps assume a smartphone:** The affordable end of the market is built around workers checking in from their own phones, which does not fit much of the field workforce, and records only two moments of the day.
- **Fragmentation:** Attendance, GPS tracking, and task management each solve one piece, leaving the company to connect the data itself.
- **Adoption barriers:** Cost, device durability, connectivity, and worker privacy concerns have slowed adoption across the sector.
---
 
## 3. Pain Points
 
| Pain Point | Evidence | Impact on the Organization |
|---|---|---|
| **No record of what happened on site** | Operations are coordinated through paper sheets, gate check-ins, and WhatsApp. Hours worked, zones covered, and tasks completed are rarely captured in a usable form. | Operations cannot be analyzed or improved, and decisions rest on estimates. |
| **Labour hours cannot be split across projects** | A company running several concurrent sites has no mechanism to attribute each worker-hour to a specific project and zone. | Per-project cost and profitability are unknown, and pricing future work is guesswork. |
| **Thin margins magnify every error** | Some Saudi contractors operate at an estimated 4–6% EBITDA margin. | A small operational loss or a single fine consumes a disproportionate share of annual profit. |
| **Low adoption of field-data tools** | In a survey of 567 Saudi construction professionals, only 27.3% reported familiarity with or use of location trackers. Barriers include cost, durability, connectivity, and privacy. | Most companies have no tooling at all, which is both the problem and the opportunity. |
| **Statutory records are kept on paper** | Labour law requires six registers, including an attendance and departure record. The executive regulation permits electronic records including biometric and other electronic means. | Paper records are weak evidence during inspection or client audit. |
| **Working-hour limits are easy to breach unknowingly** | Daily limits, the 60-hour weekly ceiling, the annual 720-hour overtime cap, and sector-specific limits of 12 hours for security and cleaning staff, reduced to 10 in Ramadan. | Breaches carry fines of up to SAR 10,000, and some multiply per worker. |
| **Compliance with the midday ban cannot be evidenced** | The ban prohibits outdoor work under direct sunlight from 12:00 to 15:00 between 15 June and 15 September. MHRSD conducted 29,945 inspection visits and recorded 1,771 violations in summer 2026. | Companies comply in practice but cannot prove it, and fines multiply by the number of workers found in breach. |
| **Manual reporting consumes time** | Attendance and daily reports are compiled by hand each day. | Supervisor time goes to paperwork instead of crew management. |
 
### Who Feels the Pain
 
| Stakeholder | Main Pain Points |
|---|---|
| **Owners & Operations Directors** | No reliable data for planning, labour cost unallocated across projects, exposure to fines |
| **Site Managers & Supervisors** | Manual attendance and reporting, no single view of crews across sites |
| **Finance & Commercial** | Cannot price or evaluate projects without true labour cost |
| **Field Workers** | No reliable record of their own working hours |
 
---
 
## 4. Market Research
 
### 4.1 Market Overview
 
Our market sits at the intersection of contracting, facility services, and operations technology.
 
| Market | Current Size | Growth Outlook |
|---|---|---|
| **Saudi construction market** | USD 104.8 billion (2024) | Expected to reach USD 174.4 billion by 2030, a CAGR of 8.7% |
| **Saudi facility management market** | USD 54.56 billion (2026) | Expected to reach USD 78.46 billion by 2031, a CAGR of 7.54% |
| **Saudi IoT market** | USD 3.06 billion (2026) | Expected to reach USD 4.33 billion by 2031, a CAGR of 7.2% |
| **Global connected worker market** | USD 8.62 billion (2025) | Expected to reach USD 20.18 billion by 2030, a CAGR of 18.5% |
 
### 4.2 Target Market Segments
 
| Segment | Market Indicators | Why It Needs Our Platform |
|---|---|---|
| **Medium contractors & subcontractors** | 8,555 medium establishments and ~955 large ones, out of 365,120 total. More than 4 million workers in the sector. | Several concurrent sites, crews moving between them, labour cost unallocated, outdoor exposure in summer |
| **Facility management & cleaning** | Market at USD 54.56 billion in 2026, with soft services at 74.33%. Single operators employ large workforces; one firm reports more than 22,000 staff. | Dispersed client locations, contractual service levels to evidence, high headcount per contract |
| **Private security** | ~350 licensed companies employing ~70,000 guards, with operating contracts estimated at SAR 800 million to 1 billion annually. 98% of guards are Saudi nationals. | Lone workers at dispersed posts, patrol coverage to prove, and a specific 12-hour statutory limit for the sector |
| **Events & seasonal operations** | Riyadh Season 2025 attracted more than 11 million visitors, with thousands of temporary operations staff. | Large temporary workforces, though short engagements make recurring revenue difficult |
 
**Segments we have excluded and why:**
 
- **Hajj and Umrah pilgrim tracking:** The Ministry of Hajj and Umrah operates the Nusuk card and the Nusuk smart bracelet, which already provide GPS tracking and real-time crowd movement data, with more than 1.6 million cards distributed in a single season. This is a government-operated capability, not an open market. Field staff of Hajj service providers remain a possible seasonal pilot, not a revenue base.
- **Vehicle and fleet tracking:** A mature, crowded, price-driven market. One Saudi provider alone reports 320,000 active devices and 3,500 clients. We treat vehicle tracking as a future upsell to existing customers, not an entry product.
### 4.3 Growth Drivers
 
- **Sector expansion:** Contracting establishments grew 29.6% in 2025, and workforce numbers grew 8.96% to pass 4 million.
- **Vision 2030 investment:** Large-scale infrastructure and development continues, with Expo 2030 and the FIFA World Cup 2034 ahead.
- **Margin pressure:** With thin margins, operational efficiency and accurate cost allocation become survival issues rather than nice-to-haves.
- **Active enforcement:** MHRSD conducted 29,945 inspection visits for the midday ban in summer 2026 alone, which raises the value of evidence.
- **Digital infrastructure:** Expanding 5G and NB-IoT coverage and enterprise cloud adoption make connected field solutions practical.
### 4.4 Market Readiness
 
Adoption is early. Only 27.3% of surveyed Saudi construction professionals reported familiarity with or use of location trackers, and the same study found adoption concentrated in projects above SAR 10 million. Barriers cited are cost, device durability, connectivity, and worker privacy.
 
Demand exists but most organizations have not adopted a solution. A platform that is affordable, deployable without on-site infrastructure, and privacy-conscious can enter this market early.
 
### 4.5 Market Size Estimate
 
The following is an **illustrative estimate** based on assumptions to be validated. It uses a subscription price of **SAR 15 per worker per month** for the mobile tier, with an assumed average of 120 workers per customer.
 
| Level | Definition | Assumption | Estimated Annual Value |
|---|---|---|---|
| **TAM** | Medium and large establishments across contracting, FM, cleaning, and security | ~9,500 companies × 120 workers | ~SAR 205 million |
| **SAM** | Those in Riyadh, Makkah, and the Eastern Province | ~40% of TAM, ~3,800 companies | ~SAR 82 million |
| **SOM** | Realistically reachable in 3 years | ~2% of SAM, ~76 companies | ~SAR 1.6 million |
 
This estimate deliberately excludes the 309,910 micro establishments, which cannot sustain a per-worker subscription. A larger figure could be produced by including them, but it would not be defensible.
 
### 4.6 Key Takeaways
 
- The sector is large and growing fast, but the addressable segment is far smaller than headline figures suggest.
- Medium companies running concurrent sites are underserved from both directions: too small for enterprise platforms, too complex for attendance apps.
- Thin margins and active enforcement both increase the value of an operational record.
- Adoption is early enough that there is a window, and low enough that education will be part of the sale.
---
 
## 5. Target Customers
 
### 5.1 Customer Segments & Priority
 
| Segment | Pain Severity | Willingness to Pay | Ease of Entry | Priority |
|---|---|---|---|---|
| **Medium contractors & subcontractors** | High | Medium to High | Medium | **1 — Primary focus** |
| **Facility management & cleaning contractors** | High | Medium to High | Medium | **2 — Strong second** |
| **Private security companies** | High | Medium | Easier, smaller buying units | **3 — Fast entry** |
| **Event operators** | Medium | Medium, seasonal | Medium | **4 — Opportunistic** |
 
**Why medium contractors first:** recurring year-round demand, concurrent sites where the problem is sharpest, outdoor exposure in summer, and direct pressure on labour cost. Facility management offers larger headcount per contract and fewer, larger buying units. Security offers the simplest technical case and a specific statutory hour limit that maps directly to our rule engine.
 
### 5.2 Ideal Customer Profile
 
Our ideal first customer:
 
- Employs **50 to 250 field workers**
- Runs **two or more concurrent project sites**, the condition under which manual coordination breaks down
- Operates in contracting, facility management, maintenance, cleaning, or private security
- Works **outdoors or across dispersed locations**, where fixed attendance terminals do not apply
- Is classified as **Category A** by MHRSD, meaning 50 employees or more, the highest penalty tier
- Currently records attendance on **paper sheets, gate check-ins, or WhatsApp**
- Has a workforce that largely does **not use smartphones for work**
- Is open to a **pilot** on one site before a full rollout
- Based in **Riyadh** for the pilot phase
**Disqualifying signals:** fewer than 50 workers; all work inside enclosed buildings; an existing modern HR system the client is satisfied with; or a management that cannot state how many workers it has on each site.
 
### 5.3 Who Buys, Who Uses, Who Benefits
 
| Role | Who They Are | What They Care About |
|---|---|---|
| **Decision Maker / Buyer** | Owner, general manager, or operations director | Cost allocation across projects, avoided fines, evidence for clients |
| **Influencer** | Safety officers and project managers | Records that hold up during inspection and client audit |
| **Daily User** | Site supervisors | One screen showing crews and tasks, with no daily paperwork |
| **End User** | Field workers | A fair and accurate record of their working hours |
 
**Note on the daily user:** the supervisor does not sign the contract but determines whether the product survives. If supervisors stop using the dashboard, no data is collected, no reports can be produced, and the contract will not renew. Supervisor interaction is therefore kept to a single action: assign a task, mark it complete.
 
### 5.4 Customer Personas
 
**Khalid — Owner of a medium contracting company**
Runs 140 workers across three active sites. He knows his total payroll but cannot say how much of it went into each project, so he prices new work from experience rather than numbers. He receives verbal updates at the end of each day and discovers problems late.
 
**Mona — Operations Director at a facility management company**
Manages cleaning and maintenance crews across eleven client locations. Her clients deduct from invoices when service levels cannot be evidenced, and her only proof today is a paper log her own staff completed.
 
**Omar — Site Supervisor**
Manages 60 workers across several zones. He spends a large part of his day collecting attendance and sending updates on WhatsApp, and will abandon any system that asks him to type more than he does now.
 
---
 
## 6. Competitive Landscape & Market Gap
 
### 6.1 Key Competitors
 
| Competitor | Origin | What They Offer | Strengths | Limitations for Our Target Market |
|---|---|---|---|---|
| **WakeCap** | Saudi Arabia | Helmet-mounted sensors, site infrastructure, workforce tracking and site intelligence | Deployed on Aramco, NEOM, Qiddiya, and King Salman Park; raised USD 28 million in 2025; reports 150 million work hours tracked across projects worth USD 120 billion | Built for giga-projects and main developers; enterprise procurement cycles; relies on on-site infrastructure |
| **viAct** | Hong Kong, active in the Gulf | Computer vision for site safety plus AIoT wearables | Deployed with Aramco, NEOM, SABIC, ACWA Power; one Saudi deployment covering 15,000 workers | Foreign vendor, camera-heavy deployment suited to large sites |
| **iot squared** | Saudi Arabia, PIF and stc joint venture | LoRaWAN, NB-IoT and UWB solutions including connected workforce | Capitalized at SAR 492 million; acquired Machinestalk in 2026 | Targets government and large enterprise; potentially a partner rather than a pure competitor |
| **AFAQY** | Saudi Arabia | Vehicle, asset, and workforce tracking across many product lines | Established since 2005; reports 3,500 clients and 320,000 active devices | Vehicle-centric; workforce is one module among many |
| **IOTee** | Saudi Arabia | Fleet, equipment, and workforce tracking with an Arabic-first app | Local provider, open device support, transparent pricing | Workforce tracking is one module within a fleet and asset focus |
| **Attendance platforms** "Nawart, Dawemly, ZenHR, Bizat" | Saudi Arabia / regional | Mobile attendance with GPS and face verification, multi-location support, payroll integration | Very low price point; one provider lists SAR 11 per user per month with a free tier | Assume every worker has a smartphone; record only check-in and check-out; HR-oriented reports, no site operations or task record |
| **Fingerprint terminals "ZKTeco and similar"** | Various | Fixed biometric attendance devices | One-off cost of roughly SAR 660–1,150 per unit | Fixed installation unsuited to dispersed or temporary sites |
| **Generic GPS trackers** | Various | Low-cost devices with basic tracking apps | Cheap and widely available | No task record, no multi-site management, no compliance reporting |
 
### 6.2 How the Market Compares
 
| Capability | Enterprise Site Platforms | Attendance Apps | Fingerprint Terminals | Generic GPS | **Our Platform** |
|---|---|---|---|---|---|
| Worker location on outdoor sites | Yes | Check-in point only | No | Yes | **Yes** |
| Continuous presence during the shift | Yes | No | No | Yes | **Yes** |
| Multiple concurrent sites per company | Yes | Yes | Limited | Limited | **Yes** |
| Hours attributed to project and zone | Varies | No | No | No | **Yes** |
| Task assignment and completion record | Varies | No | No | No | **Yes** |
| Works for workers without smartphones | Yes | No | Yes, at a fixed point | Yes | **Yes** |
| Tamper-evident record for inspection | Varies | Varies | Varies | No | **Yes** |
| Works without on-site infrastructure | Often required | Yes | No | Yes | **Yes** |
| Affordable for a 120-worker company | No | Yes | Yes | Yes | **Yes** |
 
*Comparison based on publicly available information and general category characteristics; individual products may differ.*
 
### 6.3 The Market Gap
 
The market is split in two, with nothing in between:
 
1. **Enterprise site intelligence:** powerful, infrastructure-dependent, priced and sold for giga-projects.
2. **Mobile attendance apps:** inexpensive and widely available, but they record a worker's *claim* at two moments of the day, assume a smartphone, and produce HR reports rather than an operational record.
**The gap:** there is no affordable platform that records what actually happened across a medium company's concurrent sites — presence through the shift, hours attributed to each project and zone, and the tasks completed — and turns it into a reliable record for management, clients, and inspectors.
 
### 6.4 Our Positioning
 
We position the platform as **the operational record layer for medium field operations companies**.
 
Our differentiators:
 
- **Record, not claim:** Attendance apps log what a worker submits from a phone. We log where the worker actually was, throughout the shift.
- **Built for concurrent sites:** Hours and tasks are attributed to a specific project and zone, which is the question a multi-site company cannot answer today.
- **Reaches workers without smartphones:** A device tier for workforces where phone-based check-in does not apply.
- **Evidence-grade records:** Logs stored in tamper-evident form, exported with a verifiable reference, so reports hold up in an audit.
- **Deploys in days:** Off-the-shelf devices or mobile, with no on-site infrastructure.
**A positioning warning we take seriously:** we must not market this as an attendance system. Positioned that way, we are compared against an SAR 11 product and lose. We sell an operational record that produces attendance as one of its outputs.
 
---
 
## 7. Value Proposition
 
### 7.1 Our Value Proposition
 
> For medium field operations companies running several concurrent sites, our platform converts daily field activity into a structured operational record — who worked, where, for how long, on which project, and on what task — and exports it as organized reports for management, clients, and inspectors.
 
### 7.2 How It Works
 
1. **Enrol:** The company registers, defines its project sites and zones on a map, adds workers, and records worker consent.
2. **Assign:** A manager assigns tasks to workers or crews at the start of the day.
3. **Track:** Workers carry a device or check in from a phone. The platform logs location and working hours within site boundaries during working hours only.
4. **Alert:** A rule engine flags geofence breaches, working-hour limits, and presence in outdoor zones during the midday ban window.
5. **Record:** Each working day becomes a structured entry: worker, project, zone, hours, task, status.
6. **Report:** Daily, weekly, and monthly PDF reports are exported on demand for any date range.
### 7.3 The Value We Deliver
 
| Value | What Changes |
|---|---|
| **Labour cost per project** | Hours attributed to a specific project and zone instead of estimated |
| **Operational visibility** | One view of several concurrent sites instead of end-of-day phone calls |
| **Evidence for clients** | A report that shows a site was staffed as contracted |
| **Regulatory evidence** | Working hours against statutory limits, and compliance during ban periods |
| **Supervisor time** | Attendance and daily reporting produced automatically |
 
### 7.4 Value by Stakeholder
 
| Stakeholder | What They Get |
|---|---|
| **Owner / Operations Director** | True labour cost per project, and documented protection against fines and client deductions |
| **Site Supervisor** | One screen showing crews and tasks, with no paperwork at the end of the day |
| **Finance** | A defensible basis for pricing and evaluating projects |
| **Field Worker** | An accurate record of hours worked, and tracking limited to working hours only |
 
### 7.5 A Day on Site: Before and After
 
| Moment | Today | With the Platform |
|---|---|---|
| Shift start | Paper sheet at the gate | Automatic check-in; supervisor sees who is present across all sites |
| Mid-shift | Supervisor walks or calls to locate crews | Live view by site and zone |
| Midday in summer | Supervisor remembers the ban | Alert 15 minutes before the ban window, listing who is still in an exposed zone |
| Shift end | Supervisor compiles attendance by hand | Record closes automatically |
| Month end | Hours estimated per project | Hours attributed per project and zone, exported as a report |
| Inspection or audit | Paper file of uncertain weight | Report with a verifiable reference number |
 
### 7.6 MVP and Future Roadmap
 
| Phase | Capability |
|---|---|
| **MVP** | Multi-site setup, worker profiles and consent, device and mobile tracking, geofencing, task assignment, working-hour and ban-window alerts, daily records, PDF reports |
| **Next 6 months** | Payroll and HR export, offline resilience, crew-level views, refined reporting |
| **12 months** | Vehicle and equipment tracking as an upsell to existing clients, operational analytics once sufficient history exists |
| **Deliberately excluded** | Health and vital-sign monitoring, indoor positioning, predictive AI |
 
**Why health monitoring is excluded:** vital-sign data is classified as sensitive personal data under the PDPL, which raises consent, storage, and liability requirements significantly. A wrist sensor measures skin temperature rather than core body temperature, making the reading a weak indicator. Clients we expect to serve do not pay extra for it, and false alerts erode trust in the alerting system overall. Compliance with the midday ban does not require it: location and time are sufficient evidence.
 
---
 
## 8. Business Model
 
### 8.1 Model Overview
 
Our model is a **per-worker monthly subscription**, offered in two tiers: a mobile tier for workforces with smartphones, and a device tier that includes a tracking wearable on a rental basis. Device rental rather than sale removes the upfront cost barrier, which the Saudi adoption research identifies as a leading obstacle.
 
### 8.2 Revenue Streams
 
| Revenue Stream | Description | Initial Pricing Assumption |
|---|---|---|
| **Mobile tier** | Platform access with phone-based check-in and location | SAR 15 per worker per month |
| **Device tier** | Platform access plus rented wearable, SIM connectivity, and continuous tracking | SAR 35 per worker per month |
| **Enterprise** | Companies above 500 workers, with integrations and dedicated support | Custom quote |
| **Site setup fee** | One-time configuration, geofence setup, account creation, and training | Per site, based on size |
| **Vehicle and equipment tracking** | Upsell to existing clients from month six onward | SAR 35 per asset per month |
 
*All prices are assumptions to be tested with potential clients and adjusted after calculating device and connectivity costs.*
 
### 8.3 Illustrative Revenue Examples
 
- **Mobile tier client:** 120 workers × SAR 15 × 12 = **SAR 21,600 per year**
- **Mixed client:** 90 on mobile and 30 on devices = **SAR 28,800 per year**
- **With vehicles added in month six:** plus 15 assets × SAR 35 × 12 = **SAR 35,100 per year**
**First-year target:** 10 to 15 customers, producing **SAR 216,000 to 324,000** in annual recurring revenue.
 
*These are calculation examples, not sales forecasts.*
 
### 8.4 Cost Structure
 
| Cost | Description |
|---|---|
| **Devices** | Purchasing wearables for the rental pool, plus replacement of damaged or lost units |
| **Connectivity** | M2M SIM data plans from CST-licensed local operators |
| **Cloud & Services** | Hosting inside Saudi Arabia and map APIs |
| **Operations & Support** | Device distribution, on-site setup, training, and customer support |
| **Compliance** | Legal consultation, PDPL obligations, and device certification |
| **Team** | Development, sales, and operations staff |
 
**Note on tier economics:** the mobile tier carries almost no variable cost beyond hosting, making its margin high. The device tier carries hardware, SIM, and logistics costs, so its SAR 35 price must be validated against real procurement before it is committed to.
 
### 8.5 Key Partners
 
- **Device suppliers:** Providers of CST-certified GPS wearables
- **Telecom operators:** M2M SIM connectivity and IoT management portals
- **Cloud and map providers:** Hosting and mapping services
- **Industry associations:** Saudi Contractors Authority and chamber of commerce committees as routes to members
### 8.6 Why This Model Works
 
- **Low entry barrier:** The mobile tier allows a client to start without hardware.
- **Recurring and year-round:** The statutory attendance record and working-hour tracking apply 365 days a year, so the subscription is not seasonal even though the midday ban is.
- **Grows with the customer:** Per-worker pricing scales automatically as the client grows, with no renegotiation.
- **Expansion revenue:** Adding device tiers, sites, and vehicle tracking grows account value without new customer acquisition cost.
### 8.7 Future Revenue Opportunity
 
As the platform accumulates history across clients, aggregated and anonymized data could support **industry benchmarks**, such as average hours per project type or coverage patterns by sector.
 
Three conditions must be met first, and we state them plainly rather than treating data as a near-term revenue line:
 
1. **Scale:** Benchmarks from a handful of clients have no commercial value. Meaningful aggregates require thousands of worker-months across many companies.
2. **Legal basis:** Worker location and hours are personal data under the PDPL. Only fully anonymized aggregates could ever be shared, and never individual records.
3. **Contractual right:** In B2B agreements, clients generally consider operational data their own. Our right to retain and use an anonymized copy for analytics must be written into the customer agreement from the first contract, as it cannot be added retroactively.
The more immediate value of accumulated data is not resale but retention: after a year of operation, a client's compliance and cost history lives in the platform, and leaving means losing it.
 
---
 
## 9. Go-to-Market Strategy
 
### 9.1 Approach
 
Start narrow, prove value on one site with real data, then expand through referral. The sector in Riyadh is small enough that a credible reference carries further than advertising.
 
### 9.2 Market Entry Phases
 
| Phase | Timeline | Focus | Goal |
|---|---|---|---|
| **Phase 0: MVP** | Oct – Nov 2026 | Build and test with real and simulated devices | A working, demo-ready platform |
| **Phase 1: Validation** | Dec 2026 – Feb 2027 | Interview target companies and refine the report format with a real safety officer | Confirmed problem, validated report design |
| **Phase 2: First pilot** | Feb – Mar 2027 | One site, 10–50 workers, free for 30 days | A real operational record and a written client reference |
| **Phase 3: Paid rollout** | Mar – May 2027 | Convert the pilot and sell into referrals before the summer season | First paying contracts |
| **Phase 4: Summer season** | Jun – Sep 2027 | Operate through the midday ban period | Compliance evidence as a proven, documented use case |
| **Phase 5: Expansion** | Late 2027 onward | Facility management and security segments, vehicle tracking upsell | Recurring revenue and higher account value |
 
### 9.3 Seasonal Calendar
 
| Period | Market Activity | What We Do |
|---|---|---|
| **October – February** | No heat pressure; planning season | Build, pilot, and build relationships without selling hard |
| **March – April** | Companies plan for summer | **Peak selling window — concentrate effort here** |
| **May** | Final preparation before the ban | Close contracts and complete deployments |
| **15 June – 15 September** | Ban in force, inspections active | Operate, support, and collect evidence of value |
| **September – October** | Season ends | Results reporting and annual renewals |
 
**Note:** we sell annual contracts rather than seasonal ones. The statutory attendance record, working-hour limits, and multi-site cost allocation apply year-round; the midday ban is one module within a platform that operates 365 days a year.
 
### 9.4 Pilot Offer
 
- **Size:** 10–50 workers on a single site
- **Duration:** 30 days
- **Included:** Platform access, devices where applicable, site setup, and on-site training
- **Measured:** Record completeness, device battery life in real conditions, supervisor usage, worker acceptance, alert accuracy, and hours attributed per project
- **Outcome:** A results report the client can use to decide on a rollout, and a written reference we can use with the next client
### 9.5 Sales Channels
 
| Channel | Effort | Value | Notes |
|---|---|---|---|
| **Direct calls** | High | Highest | There is no substitute in Saudi B2B; cold email is rarely read |
| **Client referral** | Low | Highest | After one satisfied client, ask for two names |
| **Targeted LinkedIn** | Medium | High | Search for HSE managers, operations managers, and project managers in Riyadh |
| **Government tender results** | Medium | High | Published awards for operations, cleaning, and security contracts reveal company names and contract values, from which workforce size can be estimated |
| **Arabic educational content** | Medium | Medium | One strong article on preparing for a midday-ban inspection attracts companies already worried |
| **Industry exhibitions** | High cost | Medium | Useful for relationships, rarely for direct sales |
 
### 9.6 Key Messages by Audience
 
| Audience | Our Message |
|---|---|
| **Owner / Operations Director** | "Know exactly how many hours went into each project, instead of estimating." |
| **Finance** | "Price your next project from real labour cost, not from memory." |
| **Safety Officer** | "An inspection-ready report instead of a paper sheet nobody trusts." |
| **Site Supervisor** | "Stop chasing attendance. One screen for every site." |
| **Workers** | "This records your working hours accurately, and only during your shift." |
 
---
 
## 10. Regulatory Landscape
 
Operating a platform that records workers' location and hours requires compliance with several Saudi regulations. The same regulations that govern us also create demand for reliable records.
 
### 10.1 Key Regulations
 
| Regulation | Authority | What It Requires | Relevance to Our Platform |
|---|---|---|---|
| **Personal Data Protection Law — PDPL** | SDAIA | Lawful processing, consent, data subject rights, breach notification within 72 hours, and restrictions on transferring data outside the Kingdom. Fines of up to SAR 5 million. | Worker location and working hours are personal data. Excluding health data removes the sensitive-data tier, but PDPL still applies in full. |
| **Labour Law — mandatory records** | MHRSD | Employers must keep six registers, including an **attendance and departure record**. The executive regulation permits electronic records, including biometric and other electronic means. | Our core output is one of the registers the law already requires. |
| **Labour Law — working hours** | MHRSD | 8 hours daily or 48 weekly as standard; actual hours may not exceed 10 daily or 60 weekly; annual overtime capped at 720 hours; a rest break after 5 continuous hours; **12 hours daily for security and cleaning staff, reduced to 10 during Ramadan**. | These limits define our rule engine directly, and the security and cleaning provision maps exactly to two of our target segments. |
| **Midday Outdoor Work Ban** | MHRSD, with NCOSH | Prohibits outdoor work under direct sunlight from 12:00 to 15:00 between 15 June and 15 September. | Creates demand for evidence. Fines multiply by the number of workers found in breach. |
| **IoT Regulations** | CST | IoT devices require a conformity certificate before import or use, and SIM cards must be issued by CST-licensed operators. | Determines which devices we can deploy and how connectivity is managed. |
| **Cybersecurity Controls** | NCA | Essential and Cloud Cybersecurity Controls, and IoT guidelines. | Often required by larger and government-linked clients. |
 
> **Note on penalty figures:** published figures for the midday-ban penalty vary across sources, from SAR 1,000 to SAR 25,000 per worker depending on the version of the violations schedule cited. The schedule has been amended more than once. We verify the current figure from the official MHRSD violations schedule before using any number in a client conversation, and we build any financial argument on the lowest credible figure so that it holds regardless.
 
### 10.2 Our Data Protection Obligations
 
- **Data Protection Officer:** Appointed internally or through a third-party service
- **Data Protection Impact Assessment:** Conducted before systematic monitoring begins
- **Registration:** With SDAIA's national data governance platform
- **Records of Processing:** What we collect, why, retention period, and who may access it
- **Privacy Notice:** Available in Arabic, and ideally in the workers' own languages
- **Breach Notification:** To SDAIA within 72 hours
- **Data Processing Agreements:** The client acts as data controller, we act as data processor
### 10.3 How We Build Compliance Into the Product
 
| Principle | How We Apply It |
|---|---|
| **Data minimization** | Tracking only during working hours and within defined site boundaries. No tracking after a shift ends. |
| **No sensitive data** | Health and vital-sign monitoring excluded entirely from the platform |
| **Consent by design** | Worker consent captured during enrolment, with the consent timestamp stored on the worker record and visible in the employee list |
| **Local hosting** | Data hosted inside Saudi Arabia |
| **Access control** | Role-based access, so each user sees only what their role requires |
| **Record integrity** | Activity logs stored in tamper-evident form; corrections appended as new entries showing who changed what and when, never overwriting the original |
| **Retention policy** | A defined retention period, with aggregation or deletion thereafter |
| **Certified devices** | CST-certified devices and M2M SIMs registered under the company |
| **Transparency with workers** | Clear communication that the platform records working hours, not private life |
 
### 10.4 Compliance as a Competitive Advantage
 
Privacy concern is one of the documented barriers to adoption in the Saudi construction sector. By excluding health data, limiting tracking to working hours and site boundaries, and capturing consent as a product feature rather than a policy document, we remove the objection that stalls most tracking deployments — and we can say so in the first sales meeting.
 
---
 
## 11. Post-MVP Risks "Within 6 Months"
 
| Risk Category | Potential Risk | Likelihood | Impact | Mitigation Strategy |
|---|---|---|---|---|
| **Positioning** | **Commoditization:** The platform is perceived as an attendance system and compared against products priced around SAR 11 per user per month. | High | High | **Mitigation:** Never market as attendance. Lead with multi-site cost allocation and the operational record. Demonstrate the report, not the check-in screen. |
| **Market Competition** | **Downmarket move by incumbents:** An established provider adds a lightweight tier aimed at medium companies. | Medium | High | **Mitigation:** Compete on speed and relationship rather than features. Accumulate record history, which raises switching cost and cannot be copied. |
| **Adoption** | **Supervisor drop-off:** Supervisors abandon the dashboard because task updates feel like added paperwork. | High | High | **Mitigation:** Keep supervisor interaction to a single action. No mandatory free text, percentages, or multi-step forms. |
| **Adoption** | **Worker acceptance:** Workers resist carrying devices over privacy concerns. | Medium | High | **Mitigation:** Track only during working hours and inside site boundaries. Communicate in workers' languages. No health data collected at all. |
| **Legal & Compliance** | **PDPL obligations:** Systematic monitoring of personal data carries defined obligations and penalties of up to SAR 5 million. | Medium | High | **Mitigation:** Legal consultation before the first pilot, local hosting, consent capture in-product, and privacy by design. |
| **Regulatory** | **Platform risk:** MHRSD introduces a mandatory government platform for compliance evidence, as SFDA did for cold-chain monitoring. | Low to Medium | High | **Mitigation:** Avoid building the business on the ban module alone. Position as an operational record that integrates with, rather than competes against, any government platform. |
| **Regulatory** | **Device & SIM regulations:** CST conformity certificates and licensed local SIMs are required. | Medium | Medium | **Mitigation:** Select pre-certified devices or suppliers who handle certification, and use registered M2M SIMs. |
| **Sales** | **Long sales cycles:** Even medium companies may take months to approve a new vendor. | Medium | Medium | **Mitigation:** Lead with a 30-day free pilot on one site rather than a contract discussion. |
| **Unit Economics** | **Device tier margin:** Hardware, SIM, and logistics costs may exceed the SAR 35 price point. | High | High | **Mitigation:** Obtain real supplier quotes before committing to pricing. Lead with the mobile tier, which carries almost no variable cost. |
| **Hardware Operations** | **Device loss and damage:** Devices lost, damaged, or failing in heat and dust. | High | Medium | **Mitigation:** Field-test in real summer conditions before committing, and include loss and damage terms in contracts. |
| **Business Model** | **Seasonality:** Interest peaks before summer and falls afterward. | Medium | Medium | **Mitigation:** Sell annual contracts built on the year-round statutory record, not the seasonal ban. |
| **Scalability** | **System load:** Moving from a few devices to thousands of workers may overload the backend. | Medium | High | **Mitigation:** Plan a scalable architecture after the MVP, and run load tests before large deployments. |
 
---
 
## 12. Validation Plan
 
### 12.1 Key Assumptions to Validate
 
| Assumption | What We Need to Learn | How We Will Validate It |
|---|---|---|
| **The multi-site problem is real** | Do companies with concurrent sites actually struggle to attribute hours per project? | Client interviews |
| **Which value matters most** | Cost allocation, client evidence, or regulatory compliance? | Interviews and pilot feedback |
| **Willingness to pay** | Will clients pay SAR 15 and SAR 35 per worker, and which tier do they choose? | Pricing discussions after the pilot |
| **The report is right** | Does our report format satisfy an inspector and a client auditor? | Review with a working safety officer before building |
| **Supervisor retention** | Do supervisors still use it in week four? | Pilot usage data |
| **Worker acceptance** | Do workers carry devices consistently? | Pilot data and worker feedback |
| **Technical feasibility** | Battery life, heat tolerance, and connectivity in real conditions | Field testing during the pilot |
 
### 12.2 Client Interviews
 
- **Target:** 15–20 interviews
- **Who:** Owners, operations directors, and safety officers at medium contracting, facility management, cleaning, and security companies in Riyadh
- **Approach:** ask how they operate today rather than whether they want a tracking system
**Interview Questions:**
 
1. How many active sites do you run at the same time?
2. How do you record attendance and working hours across them today?
3. If I asked how many labour hours went into a specific project last month, how would you answer?
4. How do you prove to a client that a site was staffed as contracted?
5. How much time do your supervisors spend on daily reporting?
6. In the last two summers, were you cited for a midday-ban violation? What did it cost?
7. Has a client ever deducted from an invoice over service evidence? How much?
8. How do you evidence working hours during an inspection?
9. Have you tried any tracking technology before? Why did you continue or stop?
10. Do your field workers use smartphones for work?
11. What would make workers accept or refuse carrying a device?
12. How would you prefer to pay: per worker monthly, per site, or per project?
**What we listen for:** a specific number. A client who names a fine, a deduction, or an hours dispute is a qualified prospect. A client who says nothing has ever gone wrong is not our market, regardless of how well they fit on paper.
 
### 12.3 Field Pilot
 
- **Size:** 10–50 workers on a single site
- **Duration:** 30 days
- **Measured:**
  - Record completeness: percentage of working days with a complete record
  - Hours attribution: percentage of logged hours assigned to a project and zone
  - Device battery life across a full shift
  - Supervisor usage in week one versus week four
  - Worker acceptance: percentage carrying devices throughout the shift
  - Alert accuracy: useful alerts versus false alerts
### 12.4 Success Criteria
 
- The majority of interviewed companies confirm multi-site hour allocation as a real problem
- A working safety officer confirms the report format would be accepted during an inspection
- At least one pilot client completes 30 days and requests to continue or expand
- Supervisor usage in week four is at least as high as in week one
- The pilot produces at least three concrete insights with stated value
- At least one client signs a paid contract or a letter of intent
### 12.5 Validation Timeline
 
| Timeline | Activity |
|---|---|
| **Oct – Nov 2026** | Build the MVP; verify the official penalty figure; begin early client conversations |
| **Dec 2026 – Jan 2027** | Conduct interviews; design the report with a working safety officer |
| **Feb – Mar 2027** | Run the first field pilot and publish a results report |
| **Mar – May 2027** | Convert the pilot and sell into referrals ahead of the summer season |
| **Jun – Sep 2027** | Operate through the ban period and document compliance value |
 
---
 
## 13. Sources
 
### Market & Industry
- [Saudi Contractors Authority Annual Report 2025 coverage — Amlak](https://amlak.net.sa/107594/)
- [Saudi Contractors Authority Annual Report 2025 coverage — Sabq](https://sabq.org/article/TJOWLlQ)
- [Monshaat: Regulatory rules for measuring establishment size](https://www.uqn.gov.sa/details?p=23822)
- [ResearchAndMarkets: Saudi Arabia Construction Industry Report 2025, via Business Wire](https://www.businesswire.com/news/home/20250905997072/en/Saudi-Arabia-Construction-Industry-Report-2025-Market-to-Grow-at-a-CAGR-of-8.7-During-2024-2030-Driven-by-Mega-Projects-Vision-2030-and-Economic-Diversification---ResearchAndMarkets.com)
- [Mordor Intelligence: Saudi Arabia Facility Management Market](https://www.mordorintelligence.com/industry-reports/saudi-arabia-facility-management-market)
- [Astute Analytica: Saudi Arabia Facility Management Market](https://www.astuteanalytica.com/industry-report/saudi-arabia-facility-management-market)
- [ResearchAndMarkets: Saudi Arabia IoT Market, via GlobeNewswire](https://www.globenewswire.com/news-release/2026/08/17/3346233/0/en/saudi-arabia-iot-market-to-reach-usd-4-33-billion-by-2031-as-vision-2030-and-5g-accelerate-adoption.html)
- [MarketsandMarkets: Connected Worker Market](https://www.marketsandmarkets.com/PressReleases/connected-worker.asp)
- [Mordor Intelligence: Construction sector in the Kingdom of Saudi Arabia](https://www.mordorintelligence.com/industry-reports/construction-sector-in-the-kingdom-of-saudi-arabia-industry)
- [Al-Riyadh: Private security guarding contracts in the Kingdom](https://www.alriyadh.com/175979)
### Workforce, Safety & Adoption
- [MDPI Buildings: Barriers, Enablers, and Adoption Patterns of IoT and Wearable Devices in the Saudi Construction Industry](https://www.mdpi.com/2075-5309/16/2/347)
- [DataSaudi: Construction sector](https://datasaudi.sa/en/sector/construction)
- [MHRSD: Progress in the Saudi labour market](https://www.hrsd.gov.sa/en/knowledge-centre/articles/progress-saudi-labor-market)
### Regulations
- [SPA: Midday outdoor work ban](https://www.spa.gov.sa/en/N2612867)
- [MHRSD: Schedule of violations and penalties](https://www.hrsd.gov.sa/sites/default/files/2017-05/%D9%85%D9%84%D9%81%20%D8%A7%D9%84%D9%85%D8%AE%D8%A7%D9%84%D9%81%D8%A7%D8%AA%20%D9%88%D8%A7%D9%84%D8%B9%D9%82%D9%88%D8%A8%D8%A7%D8%AA.pdf)
- [MHRSD: Executive Regulation of the Labour Law](https://www.hrsd.gov.sa/sites/default/files/2025-02/%D8%A7%D9%84%D9%84%D8%A7%D8%A6%D8%AD%D8%A9%20%D8%A7%D9%84%D8%AA%D9%86%D9%81%D9%8A%D8%B0%D9%8A%D8%A9%20%D9%84%D9%86%D8%B8%D8%A7%D9%85%20%D8%A7%D9%84%D8%B9%D9%85%D9%84%20%D9%88%D9%85%D9%84%D8%AD%D9%82%D8%A7%D8%AA%D9%87%D8%A7.pdf)
- [SDAIA: Personal Data Protection Law](https://dgp.sdaia.gov.sa/wps/portal/pdp/knowledgecenter/details/PDPL)
- [PDPL compliance guide](https://www.sgc.consulting/sdaia-saudi-personal-data-protection-law-pdpl-compliance-guide/)
- [CST: Updated IoT Regulatory Framework](https://icertifi.com/saudi-arabia-cst-updated-iot-regulatory-framework/)
- [NCA: Essential Cybersecurity Controls](https://nca.gov.sa/ar/regulatory-documents/controls-list/ecc/)
### Competitors
- [Wamda: WakeCap closes $28 million investment](https://www.wamda.com/2025/05/wakecap-closes-28-million-investment-expand-ai-driven-construction-solutions)
- [Intelligent Build: WakeCap acquires Trackfy](https://www.intelligentbuild.tech/2025/11/06/wakecap-technologies-expands-global-footprint-with-acquisition-of-trackfy/)
- [Robotics & Automation News: viAct in high-risk industries](https://roboticsandautomationnews.com/2026/03/29/emerging-trends-in-robotics-and-ai-for-high-risk-industries-construction-oil-and-gas-and-mining/100200/)
- [Preqin: iot squared](https://www.preqin.com/data/profile/asset/iot-squared/559710)
- [IOTee: Best fleet management companies in Saudi Arabia](https://iotee.co/en/blog/best-fleet-management-companies-saudi-arabia-2026)
- [AFAQY](https://afaqy.com/?lc=en)
- [Nawart Attendance](https://nawart.sa/ar-attendance/)
- [Dawemly](https://dawemly.com/)
- [Arabitec: Best attendance software in Saudi Arabia 2026](https://arabitec.com/best-attendance-software-saudi/)
### Excluded Segments
- [Saudipedia: Smart Hajj](https://saudipedia.com/en/smart-hajj)
- [SPA: Ministry of Hajj deploys smart sensors and Nusuk cards in Mina](https://www.spa.gov.sa/en/N2575900)
 