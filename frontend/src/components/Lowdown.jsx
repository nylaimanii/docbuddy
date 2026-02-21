export default function Lowdown({ summary, pros = [], cons = [] }) {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Summary</h2>

      <p className="text-slate-700 mb-4">
        {summary || "No summary available."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-green-600 mb-2">Pros</h3>
          <ul className="list-disc list-inside text-slate-700">
            {pros.length > 0 ? pros.map((p, i) => <li key={i}>{p}</li>) : <li>No pros detected.</li>}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-red-600 mb-2">Cons</h3>
          <ul className="list-disc list-inside text-slate-700">
            {cons.length > 0 ? cons.map((c, i) => <li key={i}>{c}</li>) : <li>No cons detected.</li>}
          </ul>
        </div>
      </div>
    </div>
  );
}
