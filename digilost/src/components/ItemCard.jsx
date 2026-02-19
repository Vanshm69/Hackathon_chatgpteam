import { Link } from "react-router-dom";

export default function ItemCard({ item }) {

  const statusStyles = {
    open: "border border-red-600 text-red-600",
    claimed: "border border-black text-black",
    resolved: "border border-green-600 text-green-600"
  };

  return (
    <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition p-5">
      
      <h3 className="font-semibold text-gray-900">
        {item.title}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        {item.location}
      </p>

      <div className="flex justify-between items-center mt-4">
        <span className={`text-xs px-3 py-1 rounded-full ${statusStyles[item.status]}`}>
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
  );
}
