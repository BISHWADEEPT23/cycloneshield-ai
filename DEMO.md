# CycloneShield AI — Hackathon Judging & Live Demo Script

This guide provides a structured, time-optimized demonstration script for hackathon judges evaluating **CycloneShield AI (Track 5: Disaster Forecaster & Infrastructure Resilience)**.

---

## 1. Quick Demo Options

| Option | Target Duration | Best For | Focus Areas |
| :--- | :--- | :--- | :--- |
| **Option A** | **3 Minutes** | Rapid judging round | Command Center, Spatial GIS Hero, PS-07 Cascade, Parametric Payout |
| **Option B** | **5 Minutes** | Deep technical round | All 10 views, GEE Inspector, Gemini 1.5 Flash Reasoning, Judge Mode |

---

## 2. Fast-Start: Activating "Judge Mode"

CycloneShield AI includes an interactive **Judge Evaluation Mode** built directly into the UI:
1. Click the glowing amber **`⚡ Judge Mode`** button in the top header, or click the **`⚡`** icon at the bottom of the left navigation rail.
2. The **Judge Evaluation Modal** opens, displaying:
   - **Track 5 Rubric Alignment**: 5 criteria (Multi-Hazard Innovation, Technical Depth, Actionable UX, Provenance & Scientific Integrity, Real-World Practicality).
   - **Architecture Quick-Links**: Jump directly into any of the 10 application views.
   - **Master Scenario Truths**: Quick reference to verified numbers (**VARUNA**, **142 km/h**, **2.1 m surge**, **268 mm rain**, **CHI 88**, **PS-07 89% trip**, **42,700 exposed pop**, **2,400 bed deficit**, **4.5h transit window**).

---

## 3. Step-by-Step 5-Minute Presentation Walkthrough

### Minute 0:00 – 1:00 | Problem Hook & Executive Command Center
**Goal**: Hook the judges with the core problem: cyclone forecasts fail because perils are siloed.
1. Start on the **Command Center** view (`Tab 1` / `Layout` icon in rail).
2. Point out the **Executive Light + Glassmorphism** design: soft canvas (`#F8FAFC`), translucent cards with backdrop blur, high data-ink ratio filling **92.9%** of the desktop screen.
3. Highlight the **Top Banner**:
   - Simulated Scenario: **Cyclone VARUNA** (ESCS Category 4).
   - Landfall Corridor: Jagatsinghpur–Paradip in **5.5 Hours**.
4. Review the **60/40 Executive Layout**:
   - **Left (~60%)**: Interactive Spatial GIS Hero anchored over the Odisha coastal plain.
   - **Right (~40%)**: 2×2 Telemetry Grid (142 km/h sustained wind, 2.1 m surge, 268 mm rain, 84/100 SAR index) + stacked risk cards.
5. Emphasize the **Compound Hazard Index (CHI 88/100)**: Explain that CHI captures the catastrophic non-linear collision of storm surge backwater trapping 268 mm of inland rainfall while 142 km/h winds batter weakened infrastructure.
6. Verify the **Community Evacuation Clearance Card**:
   - Exposed Population: **42,700**.
   - Shelter Bed Deficit: **-2,400 beds**.
   - Safe Evacuation Window: **4.5 Hours** before SH-12 floods.

---

### Minute 1:00 – 2:00 | Spatial GIS Canvas & GEE SAR Inspector
**Goal**: Demonstrate spatial intelligence, native vector performance, and scientific satellite calibration.
1. Click **Hazard Map** in the rail (`Tab 3` / `Layers` icon) or stay on the Command Center hero.
2. Toggle the Peril Layers:
   - **Compound Hazard**: Displays the red/amber CHI 88 collision core in the estuary.
   - **SAR Inundation**: Shows the cyan synthetic radar waterlogging surfaces (-18.6 dB to -20.1 dB backscatter).
   - **Coastal Surge**: Visualizes the 2.1 m marine surge envelope shoaling over the continental shelf.
   - **Holland Vortex**: Visualizes the 142 km/h cyclonic eyewall and radial wind decay.
3. Click an asset on the map (e.g., `PS-07` or `WTP-03`) to open the **Feature Inspection Drawer**.
4. Click anywhere on the water or land to test the **Interactive Coordinate Reticle**, inspecting local elevation, distance to coastline, and modeled surge depth.
5. Click the green **`Inspect GEE SAR`** button:
   - The **Google Earth Engine Inspector** opens.
   - Show judges the VV/VH dual-polarization histogram, backscatter difference ($\Delta \sigma^\circ = -4.8\text{ dB}$), and the Earth Engine script snippet (`ee.ImageCollection('COPERNICUS/S1_GRD')`).
   - Point out the honest provenance: *Calibrated prototype parameter modeling, GEE-ready architecture.*

---

### Minute 2:00 – 3:00 | Infrastructure Cascading Fragility
**Goal**: Show that CycloneShield AI predicts not just weather, but system-level civil defense impacts.
1. Switch to **Infrastructure** (`Tab 4` / `Shield` icon in rail).
2. Point out **Asset PS-07 (Jagatsinghpur 220kV Grid Substation)**:
   - Elevation: 1.8 m above MSL.
   - Expected Flood Depth: **1.4 m** (well above the 0.6 m busbar trip threshold).
   - Trip Probability: **89%**.
3. Trace the **Cascading Knock-On Chain**:
   - When PS-07 trips, power is immediately lost to **Mahanadi Drinking Water Treatment Plant (`WTP-03`)**, cutting water to 62,000 people.
   - **Paradip Core Telecom Tower (`TC-12`)** loses grid power, dropping to 4h battery backup and risking warning blackouts.
   - **District Hospital (`DH-02`)** is forced onto diesel backup generators with 8 hours of fuel reserves.
4. Show the **Systemic Cascade Priority Table**: Assets are ranked by systemic impact, guiding civil defense crews to deploy mobile barrier flood walls to `PS-07` first.

---

### Minute 3:00 – 4:00 | Community Evacuation & AI Operational Advisor
**Goal**: Demonstrate actionable tactical logistics and transparent Gemini AI integration.
1. Switch to **Evacuation** (`Tab 5` / `Users` icon in rail).
2. Explain the **Evacuation Bottleneck**:
   - **State Highway 12 (SH-12)** has only **4.5 hours** of safe transit before the low-lying culvert at KM-14 is inundated by 0.65 m backwater.
   - Show the demographic breakdown: 42,700 exposed, with an urgent deficit of 2,400 beds in primary cyclone shelters.
3. Switch to **AI Advisor** (`Tab 6` / `Brain` icon in rail).
4. Click **`Generate Operational Brief`**:
   - If an API key is present: queries `gemini-1.5-flash` using structured JSON schema.
   - If offline or no key: seamlessly activates the deterministic rule-based engine (`ruleBasedBriefGenerator.ts`).
   - Show the **Provenance Tag** (`GEMINI_1.5_FLASH` or `RULE_BASED_FALLBACK`), proving zero hallucinations and transparent execution.
   - Walk through the output: 3 immediate tactical orders, contingency power plan, and shelter bed redistribution orders.

---

### Minute 4:00 – 5:00 | Parametric Disaster Finance & Provenance Verification
**Goal**: Show the economic innovation of rapid disaster liquidity and cement your ethical provenance.
1. Switch to **Parametric Finance** (`Tab 8` / `CreditCard` icon in rail).
2. Explain the **Parametric Model**:
   - Pre-funded ₹10.00 Crore facility with Odisha State Disaster Management Authority.
   - Based on objective physical triggers (Wind speed and Surge height), bypassing slow bureaucratic loss adjustment.
3. Show the **Live Trigger Evaluation**:
   - Wind: $142\text{ km/h} \ge 140\text{ km/h}$ $\rightarrow$ **Triggered**.
   - Surge: $2.1\text{ m} \ge 2.0\text{ m}$ $\rightarrow$ **Triggered**.
   - Result: **Tier 2 (70%) Activated** $\rightarrow$ **₹7.00 Crore Released** in under 15 minutes.
4. Switch to **Data Sources & Provenance** (`Tab 9` / `Database` icon in rail):
   - Show the complete provenance registry: Sentinel-1 SAR (`GEE:COPERNICUS/S1_GRD`), IMD DWR radar, OpenStreetMap vectors via Vardhan Maps, and NASADEM elevation.
   - Show that every metric in the app displays an explicit visual tag (`[EXTERNAL-REAL]`, `[MODEL-DERIVED]`, `[SIMULATED-SCENARIO]`, `[AI-GENERATED]`).
5. Close by re-opening **`⚡ Judge Mode`** and thanking the judges.

---

## 4. Key Numbers to Remember for Q&A

If judges ask for specific figures, recite these exact scenario truths:
- **Cyclone Name**: VARUNA (Simulated Category 4)
- **Sustained Wind Speed**: 142 km/h (Eyewall gust: 154 km/h)
- **Peak Storm Surge**: 2.1 m (Coincides with high spring tide)
- **24-Hour Rainfall**: 268 mm
- **Compound Hazard Index**: 88 / 100
- **Anchor Infrastructure Asset**: PS-07 (Jagatsinghpur 220kV Grid Substation)
- **PS-07 Trip Probability**: 89% (Flood depth 1.4 m vs. 0.6 m threshold)
- **Total Exposed Population**: 42,700 people
- **Shelter Bed Deficit**: 2,400 beds (42,700 exposed vs. 40,300 designated beds)
- **Evacuation Safe Window**: 4.5 hours remaining on SH-12
- **Parametric Payout**: ₹7.00 Crore (70% of ₹10.00 Crore facility)
- **AI Model**: Google `gemini-1.5-flash` with deterministic rule-based fallback
