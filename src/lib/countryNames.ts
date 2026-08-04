// ISO 3166-1 alpha-2 → country name, for labeling PayPal's payer country_code.
export const COUNTRY_NAMES: Record<string, string> = {
  MY: "Malaysia", SG: "Singapore", ID: "Indonesia", TH: "Thailand", PH: "Philippines",
  VN: "Vietnam", BN: "Brunei", KH: "Cambodia", LA: "Laos", MM: "Myanmar",
  US: "United States", GB: "United Kingdom", CA: "Canada", AU: "Australia", NZ: "New Zealand",
  CN: "China", HK: "Hong Kong", TW: "Taiwan", JP: "Japan", KR: "South Korea",
  IN: "India", PK: "Pakistan", BD: "Bangladesh", LK: "Sri Lanka", NP: "Nepal",
  AE: "United Arab Emirates", SA: "Saudi Arabia", QA: "Qatar", KW: "Kuwait", BH: "Bahrain",
  DE: "Germany", FR: "France", NL: "Netherlands", ES: "Spain", IT: "Italy",
  SE: "Sweden", NO: "Norway", DK: "Denmark", FI: "Finland", IE: "Ireland",
  CH: "Switzerland", AT: "Austria", BE: "Belgium", PL: "Poland", PT: "Portugal",
  BR: "Brazil", MX: "Mexico", AR: "Argentina", ZA: "South Africa", EG: "Egypt",
};

export function countryName(code: string | undefined | null): string {
  if (!code) return "";
  return COUNTRY_NAMES[code.toUpperCase()] ?? code;
}
