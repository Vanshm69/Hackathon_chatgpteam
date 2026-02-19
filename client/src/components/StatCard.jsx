export default function StatCard({ title, value }) {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-5 hover:shadow-md transition relative">
      
      <div className="absolute top-0 left-0 h-full w-1 bg-red-600 rounded-l-xl"></div>

      <p className="text-sm text-gray-500 ml-3">{title}</p>
      <h2 className="text-2xl font-bold mt-2 ml-3 text-gray-900">
        {value}
      </h2>
    </div>
  );
}
