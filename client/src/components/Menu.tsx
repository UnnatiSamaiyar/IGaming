import React, { useState } from "react";
import { motion } from "framer-motion";
import emojiFlags from "emoji-flags";

// ✅ Full data for all countries with required fields
const countries = [
  {
    country: "Turkey",
    region: "Asia",
    regulationStatus: "Restricted",
    activity: "High Activity",
    regulatoryBody: "Ministry of Treasury and Finance",
    code: "TR",
  },
  {
    country: "United Kingdom",
    region: "Europe",
    regulationStatus: "Fully Regulated",
    activity: "High Activity",
    regulatoryBody: "UKGC (UK Gambling Commission)",
    code: "UK",
  },
  {
    country: "Malta",
    region: "Europe",
    regulationStatus: "Fully Regulated",
    activity: "High Activity",
    regulatoryBody: "MGA (Malta Gaming Authority)",
    code: "MT",
  },
   {
    country: "Netherlands",
    region: "Europe",
    regulationStatus: "Fully Regulated",
    activity: "High Activity",
    regulatoryBody: "KSA",
    code: "NL",
  },
  {
    country: "Sweden",
    region: "Europe",
    regulationStatus: "Fully Regulated",
    activity: "High Activity",
    regulatoryBody: "KSA",
    code: "SE",
  },
  {
    country: "Sweden",
    region: "Europe",
    regulationStatus: "Fully Regulated",
    activity: "High Activity",
    regulatoryBody: "Spelinspektionen",
    code: "SE",
  },
  {
    country: "Italy",
    region: "Europe",
    regulationStatus: "Fully Regulated",
    activity: "High Activity",
    regulatoryBody: "ADM (Agenzia delle Dogane e dei Monopoli)",
    code: "IT",
  },
   {
    country: "Finland",
    region: "Europe",
    regulationStatus: "Monopoly",
    activity: "Medium Activity",
    regulatoryBody: "Veikkaus",
    code: "FIN",
  },
  {
    country: "Norway",
    region: "Europe",
    regulationStatus: "Monopoly",
    activity: "High Activity",
    regulatoryBody: "Norsk Tipping",
    code: "NO",
  },
   {
    country: "Poland",
    region: "Europe",
    regulationStatus: "Partially Regulated",
    activity: "Medium Activity",
    regulatoryBody: "MF (Ministry of Finance)",
    code: "PL",
  },
   {
    country: "Denmark",
    region: "Europe",
    regulationStatus: "Fully Regulated",
    activity: "Medium Activity",
    regulatoryBody: "Spillemyndigheden",
    code: "DK",
  },
  {
    country: "Portugal",
    region: "Europe",
    regulationStatus: "Fully Regulated",
    activity: "Medium Activity",
    regulatoryBody: "SRIJ (Serviço de Regulação e Inspeção de Jogos)",
    code: "PT",
  },
  {
    country: "Greece",
    region: "Europe",
    regulationStatus: "Fully Regulated",
    activity: "Medium Activity",
    regulatoryBody: "Hellenic Gaming Commission",
    code: "GR",
  },
  {
    country: "Czech Republic",
    region: "Europe",
    regulationStatus: "Fully Regulated",
    activity: "Medium Activity",
    regulatoryBody: "MfCR (Ministry of Finance of the Czech Republic)",
    code: "CZ",
  },
  {
    country: "IRELAND",
    region: "Europe",
    regulationStatus: "Partially Regulated",
    activity: "Medium Activity",
    regulatoryBody: "Revenue",
    code: "IE",
  },
  {
    country: "India",
    region: "Asia",
    regulationStatus: "Unregulated / State-wise",
    activity: "Large user base for fantasy sports, Teen Patti, and Rummy platforms",
    regulatoryBody: "Various state governments",
    code: "IN",
  },
  {
    country: "Brazil",
    region: "LatAm",
    regulationStatus: "Pending regulation",
    activity: "Exploding online betting market (e.g. futebol, casino games)",
    regulatoryBody: "Ministry of Economy",
    code: "BR",
  },
   {
    country: "Peru",
    region: "LatAm",
    regulationStatus: "Regulating",
    activity: "Medium activity",
    regulatoryBody: "MINCETUR (Ministry of Foreign Trade and Tourism)",
    code: "PE",
  },
    {
    country: "Chile",
    region: "LatAm",
    regulationStatus: "Pending regulation",
    activity: "Medium activity",
    regulatoryBody: "SCJ (Superintendencia de Casinos de Juego)",
    code: "PE",
  },
  {
    country: "Philippines",
    region: "Asia",
    regulationStatus: "Regulated",
    activity: "Legal iGaming market; strong affiliate activity",
    regulatoryBody: "Philippine Amusement and Gaming Corporation (PAGCOR)",
    code: "PH",
  },
  {
    country: "South Africa",
    region: "Africa",
    regulationStatus: "Regulated",
    activity: "Regulated market, rising mobile-first gambling platforms",
    regulatoryBody: "National Gambling Board",
    code: "ZA",
  },
  {
    country: "Kenya",
    region: "Africa",
    regulationStatus: "Regulated",
    activity: "High activity",
    regulatoryBody: "BCLB (Betting Control and Licensing Board)",
    code: "KE",
  },
  {
    country: "Ghana",
    region: "Africa",
    regulationStatus: "Regulated",
    activity: "Medium activity",
    regulatoryBody: "Gaming Commission of Ghana",
    code: "GH",
  },
  {
    country: "Uganda",
    region: "Africa",
    regulationStatus: "Regulated",
    activity: "Medium activity",
    regulatoryBody: "NGBU (National Gaming Board Uganda)",
    code: "ZA",
  },
  {
    country: "South Africa",
    region: "Africa",
    regulationStatus: "Regulated",
    activity: "Regulated market, rising mobile-first gambling platforms",
    regulatoryBody: "National Gambling Board",
    code: "UG",
  },
  {
    country: "Spain",
    region: "Europe",
    regulationStatus: "Regulated",
    activity: "Legal gambling market, mobile-first customer base",
    regulatoryBody: "DGOJ (Dirección General de Ordenación del Juego)",
    code: "ES",
  },
  {
    country: "Mexico",
    region: "LatAm",
    regulationStatus: "Regulated",
    activity: "LatAm boom in betting; top-performing for SMS campaigns",
    regulatoryBody: "SEGOB (Secretaría de Gobernación)",
    code: "MX",
  },
  {
    country: "Thailand",
    region: "Asia",
    regulationStatus: "Illegal",
    activity: "Online casinos popular via Telegram/SMS combos",
    regulatoryBody: "Ministry of Finance",
    code: "TH",
  },
  {
    country: "Vietnam",
    region: "Asia",
    regulationStatus: "Regulated",
    activity: "Casino/Baccarat style games trending",
    regulatoryBody: "Ministry of Finance",
    code: "VN",
  },
  {
    country: "Indonesia",
    region: "Asia",
    regulationStatus: "Illegal",
    activity: "Growing demand for SMS reactivation campaigns",
    regulatoryBody: "Ministry of Communication and Information Technology",
    code: "ID",
  },
  {
    country: "Bangladesh",
    region: "Asia",
    regulationStatus: "Illegal",
    activity: "High ROI on casino traffic, Telegram + SMS used for volume",
    regulatoryBody: "Ministry of Home Affairs",
    code: "BD",
  },
  
  {
    country: "Australia",
    region: "Oceania",
    regulationStatus: "Regulated",
    activity: "High activity",
    regulatoryBody: "ICMA (Interactive Gambling and Media Authority)",
    code: "AU",
  },
  {
    country: "Nigeria",
    region: "Africa",
    regulationStatus: "Regulated",
    activity: "Popular for mobile casino apps & sports betting",
    regulatoryBody: "National Lottery Regulatory Commission",
    code: "NG",
  },
  {
    country: "UAE",
    region: "Asia",
    regulationStatus: "Regulated",
    activity: "High-value players, affiliate networks targeting crypto casinos",
    regulatoryBody: "Department of Economic Development",
    code: "AE",
  },
  {
    country: "Argentina",
    region: "LatAm",
    regulationStatus: "Regulated",
    activity: "Rapidly growing online gambling market, especially in sports betting",
    regulatoryBody: "Lotería Nacional",
    code: "AR",
  },
  {
    country: "Colombia",
    region: "LatAm",
    regulationStatus: "Regulated",
    activity: "Strong online gaming presence; regulated market",
    regulatoryBody: "Coljuegos",
    code: "CO",
  },
  {
    country: "Germany",
    region: "Europe",
    regulationStatus: "Regulated",
    activity: "Established market with a focus on sports betting and casinos",
    regulatoryBody: "Gambling State Treaty",
    code: "DE",
  },
  {
    country: "France",
    region: "Europe",
    regulationStatus: "Regulated",
    activity: "Legalized online gambling market; strong player base",
    regulatoryBody: "ARJEL (Autorité de régulation des jeux en ligne)",
    code: "FR",
  },
  {
    country: "Canada",
    region: "North America",
    regulationStatus: "Regulated",
    activity: "Growing market for online casinos and sports betting",
    regulatoryBody: "Varies by province",
    code: "CA",
  },
  {
    country: "New Zealand",
    region: "Oceania",
    regulationStatus: "Monopoly",
    activity: "Medium",
    regulatoryBody: "Department of Internal Affairs",
    code: "NZ",
  },
  {
    country: "Singapore",
    region: "Asia",
    regulationStatus: "Casino Only",
    activity: "Medium Activity",
    regulatoryBody: "GRA (Gaming Regulatory Authority)",
    code: "SG",
  },
  {
    country: "Georgia",
    region: "Asia",
    regulationStatus: "Revenue service",
    activity: "Medium Activity",
    regulatoryBody: "National Lottery Regulatory Commission",
    code: "NG",
  },
  {
    country: "Kazakhstan",
    region: "Asia",
    regulationStatus: "Regulated",
    activity: "Medium Activity",
    regulatoryBody: "Mof (Ministry of Finance)",
    code: "KZ",
  },
  {
    country: "Pakistan",
    region: "Asia",
    regulationStatus: "UnRegulated",
    activity: "High Activity",
    regulatoryBody: "NA",
    code: "PK",
  },
  {
    country: "United States",
    region: "North America",
    regulationStatus: "State Regulated",
    activity: "Very High Activity",
    regulatoryBody: "State Regulatory Bodies",
    code: "US",
  },
    {
    country: "Panama",
    region: "North America",
    regulationStatus: "Fully Regulated",
    activity: "Medium Activity",
    regulatoryBody: "Junta de Control de Juegos",
    code: "PA",
  },
];

const regions = ["All", "Asia", "LatAm", "Africa", "Europe", "North America"];

const Menu = () => {
  const [activeRegion, setActiveRegion] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("cards");

  const filtered = countries.filter((c) => {
    const regionMatch = activeRegion === "All" || c.region === activeRegion;
    const searchMatch = c.country.toLowerCase().includes(search.toLowerCase());
    return regionMatch && searchMatch;
  });

  const getFlag = (code) => emojiFlags.countryCode(code)?.emoji || "🏳️";

  return (
    <section className="py-16 px-4 bg-black text-white font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Sticky Header */}
        <div className="sticky top-0 z-50 bg-black pb-6 pt-2">
          <h2 className="text-4xl font-extrabold text-center mb-6 text-white">
            🌍 Explore Global A2P SMS Performance
          </h2>

          {/* Region Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRegion(r)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                  activeRegion === r
                    ? "bg-white text-black border-white"
                    : "border-white/30 text-white/70 hover:bg-white/10"
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          {/* Search & View Toggle */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 max-w-5xl mx-auto">
            <input
              type="text"
              placeholder="Search countries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-2/3 px-4 py-3 rounded-xl bg-white/10 text-white border border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <div className="flex gap-2">
              <button
                onClick={() => setView("cards")}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  view === "cards"
                    ? "bg-white text-black border-white"
                    : "border-white/30 text-white/70 hover:bg-white/10"
                }`}
              >
                Card View
              </button>
              <button
                onClick={() => setView("table")}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                  view === "table"
                    ? "bg-white text-black border-white"
                    : "border-white/30 text-white/70 hover:bg-white/10"
                }`}
              >
                Table View
              </button>
            </div>
          </div>
        </div>

        {/* Card View */}
        {view === "cards" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {filtered.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="relative bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg hover:shadow-cyan-500/20 transition-transform hover:-translate-y-1"
              >
                <h3 className="text-2xl font-semibold mb-3 relative group cursor-pointer">
                  <span className="border-b border-white/30 group-hover:border-cyan-400 transition">
                    {c.country} {getFlag(c.code)}
                  </span>
                </h3>

                <p className="text-sm text-white/80 mb-2">
                  <span className="font-medium text-white">Region:</span> {c.region}
                </p>
                <p className="text-sm text-white/80 mb-2">
                  <span className="font-medium text-white">Regulation Status:</span> {c.regulationStatus}
                </p>
                <p className="text-sm text-white/80 mb-2">
                  <span className="font-medium text-white">Activity:</span> {c.activity}
                </p>
                <p className="text-sm text-white/80">
                  <span className="font-medium text-white">Regulatory Body:</span> {c.regulatoryBody}
                </p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Table View */}
        {view === "table" && (
          <div className="overflow-x-auto mt-10 rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md shadow-md">
            <table className="w-full text-sm text-left text-white rounded-2xl overflow-hidden">
              <thead className="bg-white/10 text-white uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">Country</th>
                  <th className="px-6 py-4">Region</th>
                  <th className="px-6 py-4">Regulation Status</th>
                  <th className="px-6 py-4">Activity</th>
                  <th className="px-6 py-4">Regulatory Body</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filtered.map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition">
                    <td className="px-6 py-4 font-medium flex items-center gap-2">
                      <span className="text-xl">{getFlag(row.code)}</span>
                      {row.country}
                    </td>
                    <td className="px-6 py-4">{row.region}</td>
                    <td className="px-6 py-4">{row.regulationStatus}</td>
                    <td className="px-6 py-4">{row.activity}</td>
                    <td className="px-6 py-4">{row.regulatoryBody}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {filtered.length === 0 && (
          <p className="text-center text-white/60 mt-20">No countries match your search.</p>
        )}
      </div>
    </section>
  );
};

export default Menu;
