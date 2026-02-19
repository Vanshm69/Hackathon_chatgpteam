import { useData } from "../context/DataContext";
import { Link } from "react-router-dom";

export default function Items() {
  const { items } = useData();

  if (!items || items.length === 0) {
    return (
      <div className="bg-white p-10 rounded-xl shadow text-center">
        <p className="text-gray-500 text-lg">
          No items reported yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white border rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden"
        >

          {/* Image */}
          {item.image && (
            <img
              src={item.image}
              alt={item.title}
              className="h-48 w-full object-cover"
            />
          )}

          <div className="p-6">

            <h3 className="text-lg font-semibold">
              {item.title}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Category: {item.category}
            </p>

            <p className="text-sm text-gray-500">
              Location: {item.location}
            </p>

            {/* 🔥 Description (Optional) */}
            {item.description && (
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {item.description}
              </p>
            )}

            <p className="text-xs text-gray-400 mt-1">
              Posted by: {item.postedByRoll}
            </p>

            <div className="flex justify-between items-center mt-4">

              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${
                  item.status === "open"
                    ? "bg-red-100 text-red-600"
                    : item.status === "claimed"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-600"
                }`}
              >
                {item.status}
              </span>

              <Link
                to={`/item/${item.id}`}
                className="text-sm font-medium text-red-600 hover:underline"
              >
                View →
              </Link>

            </div>

          </div>

        </div>
      ))}

    </div>
  );
}
