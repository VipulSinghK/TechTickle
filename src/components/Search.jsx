
import React, { useState } from "react";
import { roadmapDropdown, resourcesDropdown } from "./menuData";

const Search = () => {
  const [query, setQuery] = useState("");

  const allLinks = [
    ...roadmapDropdown.map((item) => ({ ...item, category: "Roadmaps" })),
    ...resourcesDropdown.map((item) => ({ ...item, category: "Resources" })),
  ];

  const results = allLinks.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <input
        type="text"
        placeholder="Search Roadmaps & Resources..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <ul className="mt-4 space-y-2">
        {results.length > 0 ? (
          results.map((item) => (
            <li key={item.path}>
              <a href={item.path} className="text-indigo-600 hover:underline">
                {item.name} <span className="text-gray-500">({item.category})</span>
              </a>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No matches found.</p>
        )}
      </ul>
    </div>
  );
};

export default Search;
