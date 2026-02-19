export default function ClaimModal({ close }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow w-96">
        <h3 className="font-semibold mb-3">Claim Item</h3>
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Describe unique detail..."
        />
        <div className="flex justify-end mt-4 gap-2">
          <button onClick={close} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
