import StatCard from "../components/StatCard";
import { useData } from "../context/DataContext";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const { items, claims } = useData();

  const [counts, setCounts] = useState({
    lost: 0,
    found: 0,
    claimed: 0,
    resolved: 0,
    pendingClaims: 0
  });

  useEffect(() => {
    setCounts({
      lost: items.filter(i => i.type === "lost" && i.status === "open").length,
      found: items.filter(i => i.type === "found" && i.status === "open").length,
      claimed: items.filter(i => i.status === "claimed").length,
      resolved: items.filter(i => i.status === "resolved").length,
      pendingClaims: claims.filter(c => c.status === "pending").length
    });
  }, [items, claims]);

  const recentItems = [...items].slice(-5).reverse();
  const recentClaims = [...claims].slice(-5).reverse();

  return (
    <div className="space-y-10">

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">

        <StatCard title="Active Lost" value={counts.lost} color="red" />
        <StatCard title="Active Found" value={counts.found} color="black" />
        <StatCard title="Claimed Items" value={counts.claimed} color="yellow" />
        <StatCard title="Resolved Items" value={counts.resolved} color="green" />
        <StatCard title="Pending Claims" value={counts.pendingClaims} color="purple" />

      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Recent Items */}
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Items</h3>

          {recentItems.length === 0 ? (
            <p className="text-gray-500 text-sm">No items yet.</p>
          ) : (
            <div className="space-y-3">
              {recentItems.map(item => (
                <div
                  key={item.id}
                  className="flex justify-between border-b pb-2 text-sm"
                >
                  <span>
                    {item.title} ({item.type})
                  </span>
                  <span className="text-gray-500">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Claims */}
        <div className="bg-white border rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Claims</h3>

          {recentClaims.length === 0 ? (
            <p className="text-gray-500 text-sm">No claims yet.</p>
          ) : (
            <div className="space-y-3">
              {recentClaims.map(claim => (
                <div
                  key={claim.id}
                  className="flex justify-between border-b pb-2 text-sm"
                >
                  <span>Item ID: {claim.itemId}</span>
                  <span className="text-gray-500">
                    {claim.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
