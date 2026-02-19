import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";

export default function Admin() {
  const { items, claims, approveClaim, removeItem } = useData();
  const { user } = useAuth();

  if (user.role !== "admin") {
    return <div>Access Denied</div>;
  }

  return (
    <div className="space-y-10">

      <h2 className="text-2xl font-semibold">Admin Panel</h2>

      {/* ITEMS SECTION */}
      <div>
        <h3 className="text-lg font-semibold mb-4">All Items</h3>

        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white p-6 rounded-xl shadow mb-4"
          >

            {/* Show Image */}
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="h-40 w-full object-cover rounded mb-4"
              />
            )}

            <h4 className="font-semibold">{item.title}</h4>

            <p className="text-sm text-gray-500">
              Category: {item.category}
            </p>

            <p className="text-sm text-gray-500">
              Location: {item.location}
            </p>

            {/* Show Description */}
            {item.description && (
              <p className="text-sm text-gray-700 mt-2">
                {item.description}
              </p>
            )}

            <p className="text-xs text-gray-400 mt-1">
              Posted by: {item.postedByRoll}
            </p>

            <p className="text-xs mt-1">
              Status: {item.status}
            </p>

            <button
              onClick={() => removeItem(item.id)}
              className="bg-red-600 text-white px-4 py-2 mt-3 rounded"
            >
              Remove Item
            </button>

          </div>
        ))}
      </div>

      {/* CLAIMS SECTION */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Claims</h3>

        {claims.map((claim) => (
          <div
            key={claim.id}
            className="bg-white p-6 rounded-xl shadow mb-4"
          >

            <p className="text-sm">
              Claimant Roll: {claim.claimantRoll}
            </p>

            <p className="text-sm text-gray-600 mt-1">
              Answer: {claim.answer}
            </p>

            <p className="text-sm mt-1">
              Status: {claim.status}
            </p>

            {claim.status === "pending" && (
              <button
                onClick={() => approveClaim(claim.id)}
                className="bg-green-600 text-white px-4 py-2 mt-3 rounded"
              >
                Approve
              </button>
            )}

          </div>
        ))}
      </div>

    </div>
  );
}
