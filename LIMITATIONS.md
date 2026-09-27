# CycloneShield AI — Technical Limitations & Operational Boundaries

Scientific honesty, ethical transparency, and engineering rigor are fundamental principles of **CycloneShield AI**. This document provides an explicit accounting of the architectural boundaries, prototype assumptions, and operational constraints of the current build.

---

## 1. Simulated Scenario Benchmark (Cyclone VARUNA)

- **Prototype Nature**: The demonstration dataset ("Cyclone VARUNA", 142 km/h wind, 2.1 m surge, 268 mm rain, CHI 88) is a **calibrated synthetic disaster scenario** designed for rigorous hackathon evaluation.
- **Not a Live Forecast**: The data displayed does not reflect real-time active tropical cyclones currently developing in the Bay of Bengal.
- **Purpose**: Calibrated synthetic benchmarking ensures repeatable, high-stress testing of multi-peril compound algorithms, cascading infrastructure graphs, and parametric insurance mechanisms without relying on volatile live event timing.

---

## 2. Google Earth Engine (GEE) Integration Scope

- **Architectural Readiness**: The codebase implements a GEE-ready data adapter (`src/adapters/earthEngineAdapter.ts`) and an interactive Sentinel-1 change detection inspection modal (`src/components/GEEInspectorModal.tsx`).
- **Offline Delivery Mode**: In the current frozen build, spatial inundation layers are rendered as **pre-computed vector surfaces** rather than live, real-time Google Earth Engine REST API calls.
- **Rationale**:
  1. Guaranteed Offline Performance: Eliminates external cloud latency, API key authentication failures, and network timeouts during live judging.
  2. Cost & Quota Isolation: Protects against GEE cloud project quota exhaustion and enterprise billing requirements.
- **Calibration Accuracy**: The pre-computed inundation extents faithfully incorporate empirical C-band SAR backscatter thresholds (-18.6 dB to -20.1 dB) and hydrodynamic slope pooling derived from documented Sentinel-1 flood research.

---

## 3. Native SVG Spatial Vector Canvas vs. Slippy WebGL Map

- **Zero-Dependency Vector Canvas**: The spatial visualization is rendered using native Scalable Vector Graphics (SVG) with custom linear projection mathematics rather than dynamic WebGL tile libraries (Mapbox GL JS, Google Maps Platform, or Leaflet raster tile providers).
- **Benefits**: Instantaneous rendering, zero external tile network requests, zero bundle bloat, zero API token requirements, and 100% reliable offline evaluation.
- **Constraints**:
  - The vector bounding box is constrained to the coastal study area: **$20.12^\circ\text{N} - 20.56^\circ\text{N}, 86.38^\circ\text{E} - 86.76^\circ\text{E}$** (Jagatsinghpur–Kendrapara estuary).
  - Panning outside this coastal bounding box or continuous infinite multi-scale zoom is not supported in this prototype.

---

## 4. Government Deployment & Regulatory Disclaimer

- **Hackathon Prototype**: CycloneShield AI is an engineering proof-of-concept developed for **Track 5 (Disaster Forecaster & Infrastructure Resilience)**.
- **No Official Endorsement**: The platform is **not** currently endorsed by, contracted by, or deployed in the live operations centers of the India Meteorological Department (IMD), National Disaster Management Authority (NDMA), or Odisha State Disaster Management Authority (OSDMA).
- **Boundary Representation**: District boundaries, road corridors, and shoreline vectors are derived from OpenStreetMap (ODbL 1.0) and Natural Earth (Public Domain). They do **not** represent official Survey of India cartographic boundaries.

---

## 5. Infrastructure Dependency Graph Resolution

- **Curated Asset Census**: The infrastructure cascade engine models **12 high-priority critical infrastructure assets** across Jagatsinghpur and Paradip Port (including substation `PS-07`, water treatment plant `WTP-03`, telecom tower `TC-12`, and district hospital `DH-02`).
- **Scope Limitation**: The prototype does not include a full statewide GIS database of millions of low-voltage distribution transformers or rural feeder lines. The 12 assets were selected as high-fidelity anchors to demonstrate directed cascading failure dynamics.

---

## 6. Large Language Model (Gemini 1.5 Flash) Guardrails

- **Operational Role**: Google's `gemini-1.5-flash` model synthesizes multi-hazard risk payloads into readable civil defense briefings.
- **Decision Support, Not Autonomous Command**: The AI advisor functions strictly as an **advisory decision-support tool**. It does not issue autonomous or unreviewed military or civil defense evacuation orders. Incident commanders and emergency managers must verify all tactical orders prior to field execution.
- **Deterministic Fallback**: If an external Gemini API key is not supplied or if network connectivity is interrupted, the platform automatically activates its verified deterministic rule-based generator (`ruleBasedBriefGenerator.ts`). The brief contains a visible provenance tag (`GEMINI_1.5_FLASH` or `RULE_BASED_FALLBACK`) to ensure total algorithmic transparency.

---

## 7. Parametric Insurance Simulation Boundaries

- **Mock Escrow Architecture**: The Parametric Disaster Finance module simulates a ₹10.00 Crore parametric facility, automated threshold verification (Tier 2: $W \ge 140\text{ km/h}, S \ge 2.0\text{ m}$), and simulated multi-sig smart-contract release of ₹7.00 Crore.
- **No Real Currency Movement**: The prototype does not connect to live banking networks (e.g., RBI NEFT/RTGS, SWIFT, or commercial reinsurance escrow accounts). No real fiat currency or insurance claims are legally executed.

---

## 8. Forecast Uncertainty & Single-Scenario Horizon

- **Deterministic Track**: The prototype visualizes a single calibrated deterministic cyclone forecast track (T-12h historical through T+12h inland decay) with a parameterized 35 km uncertainty cone.
- **Ensemble Limitations**: The current build does not compute live 50-member atmospheric ensemble swaths (e.g., ECMWF EPS or GEFS multi-model ensemble spread) due to client-side computing constraints.
