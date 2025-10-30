import React, { useState } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns, CustomButton } from "../components";

const getUnique = (array, key) => {
  return [...new Set(array?.map(item => item[key]))];
};

const normalize = (s) => (s || "").toLowerCase().replace(/\s+/g, " ").trim();
const isMeaningfulTitle = (titleRaw) => {
  if (typeof titleRaw !== "string") return false;
  const title = titleRaw.trim();
  if (title.length < 3) return false;
  if (/https?:\/\//i.test(title)) return false;
  if (!/[a-zA-Z].*[a-zA-Z]/.test(title)) return false;
  if (!/[aeiou]/i.test(title)) return false;
  const digits = (title.match(/\d/g) || []).length;
  if (digits / title.length > 0.3) return false;
  const badWords = /^(test|testing|asdf|qwer|xxxx|aaaa|lorem|ipsum|na|untitled|sample|demo)$/i;
  if (badWords.test(title)) return false;
  const words3plus = (title.match(/\b[a-zA-Z]{3,}\b/g) || []).length;
  if (words3plus < 2) return false;
  if (!/[a-zA-Z0-9]/.test(title)) return false;
  return true;
};
const isValidCampaign = (c) => {
  const hasTitle = isMeaningfulTitle(c?.title);
  const hasDesc = typeof c?.description === "string" && c.description.trim().length > 10;
  const hasImage = typeof c?.image === "string" && /^https?:\/\//.test(c.image) && /(\.(png|jpg|jpeg|gif|webp)$)/i.test(c.image);
  return hasTitle && hasDesc && hasImage;
};

const Campaigns = () => {
  const { campaigns, isLoading } = useStateContext();
  const [filters, setFilters] = useState({
    owner: "",
    category: "",
    sort: "Latest",
  });

  const owners = getUnique(campaigns, "owner");
  const categories = getUnique(campaigns, "category");

  // Selection logic: same 9 as Home
  const requestedTitles = [
    "Tree Plantation Programme",
    "The Dream of a Better Tomorrow",
    "Funds for girl education",
    "Palestine : Help Us",
    "Animals Shaving",
    "Hospital bill",
    "Education aid",
  ].map(normalize);

  const validCampaigns = (campaigns || []).filter(isValidCampaign);
  const selectedMap = new Map();
  const selectedExact = [];
  for (const req of requestedTitles) {
    const found = validCampaigns.find(
      (c) => normalize(c.title) === req || normalize(c.title).includes(req)
    );
    if (found && !selectedMap.has(found.id)) {
      selectedMap.set(found.id, true);
      selectedExact.push(found);
    }
  }
  const remaining = validCampaigns.filter((c) => !selectedMap.has(c.id));
  for (let i = remaining.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [remaining[i], remaining[j]] = [remaining[j], remaining[i]];
  }
  const needed = Math.max(0, 9 - selectedExact.length);
  const filler = remaining.slice(0, needed);
  const finalCampaigns = [...selectedExact, ...filler].slice(0, 9);

  return (
    <div className="max-w-5xl mx-auto p-4 min-h-[70vh]">
      <div className="bg-gradient-to-br from-[#181824]/80 via-[#22223f]/90 to-[#13131a]/95 shadow-lg rounded-xl p-6 mb-6 flex flex-wrap gap-6 items-center justify-center md:justify-between">
        <div className="flex gap-4 items-end w-full md:w-auto flex-wrap">
          <div>
            <label className="block text-gray-400 mb-1">Owner</label>
            <select className="bg-[#232336]/80 text-gray-200 rounded px-3 py-2 w-36" value={filters.owner} onChange={e => setFilters(f => ({...f, owner: e.target.value}))} >
              <option value="">All</option>
              {owners.map(o => o && <option value={o} key={o}>{o.slice(0, 12)}...</option>)}
            </select>
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Category</label>
            <select className="bg-[#232336]/80 text-gray-200 rounded px-3 py-2 w-36" value={filters.category} onChange={e => setFilters(f => ({...f, category: e.target.value}))} >
              <option value="">All</option>
              {categories.map(c => c && <option value={c} key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Sort by</label>
            <select className="bg-[#232336]/80 text-gray-200 rounded px-3 py-2 w-40" value={filters.sort} onChange={e => setFilters(f => ({...f, sort: e.target.value}))} >
              <option value="Latest">Latest</option>
              <option value="Goal: High to Low">Goal: High to Low</option>
              <option value="Goal: Low to High">Goal: Low to High</option>
            </select>
          </div>
        </div>
        <div className="w-full md:w-auto mt-6 md:mt-0">
          <CustomButton btnType="link" title="Create Campaign" styles="bg-[#6F01Ec] text-white px-6 py-2 text-base rounded shadow" handleClick={() => window.location = '/create-campaign'} />
        </div>
      </div>
      <DisplayCampaigns title="Campaigns" isLoading={isLoading} campaigns={finalCampaigns} />
    </div>
  );
};

export default Campaigns;
