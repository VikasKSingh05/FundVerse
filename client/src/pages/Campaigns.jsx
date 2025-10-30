import React, { useState } from "react";
import { useStateContext } from "../context";
import { DisplayCampaigns, CustomButton } from "../components";

const getUnique = (array, key) => {
  return [...new Set(array?.map(item => item[key]))];
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

  let filtered = [...(campaigns || [])];
  if (filters.owner) filtered = filtered.filter(c => c.owner === filters.owner);
  if (filters.category) filtered = filtered.filter(c => c.category === filters.category);
  if (filters.sort === "Goal: High to Low") filtered.sort((a, b) => Number(b.target)-Number(a.target));
  else if (filters.sort === "Goal: Low to High") filtered.sort((a, b) => Number(a.target)-Number(b.target));
  else if (filters.sort === "Latest") filtered.sort((a, b) => new Date(b.deadline) - new Date(a.deadline));

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
      <DisplayCampaigns title="Campaigns" isLoading={isLoading} campaigns={filtered} />
    </div>
  );
};

export default Campaigns;
