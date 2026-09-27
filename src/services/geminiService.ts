import { OperationalBrief } from '../types/aiAdvisor';
import { generateRuleBasedOperationalBrief } from '../utils/ruleBasedBriefGenerator';
import { buildRiskContextPayload } from '../utils/riskContextBuilder';

export async function fetchOperationalBrief(): Promise<OperationalBrief> {
  const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY;
  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY_HERE') {
    // Graceful fallback to verified rule-based reasoning engine
    return generateRuleBasedOperationalBrief();
  }

  try {
    const payload = buildRiskContextPayload();
    const prompt = `You are CycloneShield AI Operational Reasoning Engine. Analyze the following verified multi-hazard telemetry and generate an actionable civil defense operational brief in JSON format:\n\n${payload}`;
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      }
    );

    if (!response.ok) {
      console.warn('Gemini API call failed, falling back to rule-based engine.');
      return generateRuleBasedOperationalBrief();
    }

    const json = await response.json();
    const text = json.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return generateRuleBasedOperationalBrief();

    const parsed = JSON.parse(text);
    return {
      ...generateRuleBasedOperationalBrief(),
      ...parsed,
      modelProvenance: 'GEMINI_1.5_FLASH'
    };
  } catch (err) {
    console.warn('Gemini inference error, using rule-based generator:', err);
    return generateRuleBasedOperationalBrief();
  }
}