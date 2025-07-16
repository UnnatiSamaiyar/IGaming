import React, { useState } from "react";
import { motion } from "framer-motion";
import emojiFlags from "emoji-flags";

const countries = [
  {
    country: "Turkey",
    region: "Asia",
    code: "TR",
    trending: true,
    popular: "High opt-in player base, active sportsbook & casino traffic",
    compliance: "Grey route needed; regulated; Casino content accepted via stable partners",
  },
  {
    country: "India",
    region: "Asia",
    code: "IN",
    trending: true,
    popular: "Large user base for fantasy sports, Teen Patti, and Rummy platforms",
    compliance: "DLT registration mandatory; promotional SMS via approved headers",
  },
  {
    country: "Brazil",
    region: "LatAm",
    code: "BR",
    trending: true,
    popular: "Exploding online betting market (e.g. futebol, casino games)",
    compliance: 'Opt-in required; content should avoid “gambling” keywords directly',
  },
  {
    country: "Philippines",
    region: "Asia",
    code: "PH",
    popular: "Legal iGaming market; strong affiliate activity",
    compliance: "Needs content moderation; iGaming-friendly",
  },
  {
    country: "South Africa",
    region: "Africa",
    code: "ZA",
    popular: "Regulated market, rising mobile-first gambling platforms",
    compliance: "Route stability critical; avoid gambling words",
  },
  {
    country: "Spain",
    region: "Europe",
    code: "ES",
    popular: "Legal gambling market, mobile-first customer base",
    compliance: "Route needs to support dynamic sender ID",
  },
  {
    country: "Mexico",
    region: "LatAm",
    code: "MX",
    popular: "LatAm boom in betting; top-performing for SMS campaigns",
    compliance: "Localized language and sender compliance required",
  },
];

const regions = ["All", "Asia", "LatAm", "Africa", "Europe"];

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
        {/* Sticky Filters */}
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

          {/* Search + View Toggle */}
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
                transition={{ delay: i * 0.05 }}
                className="relative bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg hover:shadow-cyan-500/20 transition-transform hover:-translate-y-1"
              >
                {c.trending && (
                  <span className="absolute top-2 right-2 text-xs bg-gradient-to-r from-pink-500 to-yellow-500 px-2 py-1 rounded-full text-black font-bold">
                    🔥 Trending
                  </span>
                )}

                <h3 className="text-2xl font-semibold mb-3 relative group cursor-pointer">
                  <span className="border-b border-white/30 group-hover:border-cyan-400 transition">
                    {c.country}
                  </span>
                  <span className="absolute top-full mt-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition bg-white text-black text-base px-2 py-1 rounded shadow z-10">
                    {getFlag(c.code)}
                  </span>
                </h3>

                <p className="text-sm text-white/80 mb-2">
                  <span className="font-medium text-white">Why Popular:</span> {c.popular}
                </p>
                <p className="text-sm text-white/80">
                  <span className="font-medium text-white">Compliance:</span> {c.compliance}
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
                  <th className="px-6 py-4">Why It’s Popular</th>
                  <th className="px-6 py-4">Compliance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filtered.map((row, i) => (
                  <tr key={i} className="hover:bg-white/5 transition">
                    <td className="px-6 py-4 font-medium flex items-center gap-2">
                      <span className="text-xl">{getFlag(row.code)}</span>
                      {row.country}
                    </td>
                    <td className="px-6 py-4">{row.popular}</td>
                    <td className="px-6 py-4">{row.compliance}</td>
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
