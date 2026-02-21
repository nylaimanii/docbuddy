export default function Results({ result, onBack }) {
  if (!result) return null;

  return (
    <div className="min-h-screen bg-[#fff7e8] p-6 flex justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-2xl w-full">
        <h1 className="text-3xl font-bold mb-2">DocBuddy Results</h1>
        <p className="text-slate-600 mb-4">Here’s the real deal</p>

        <h2 className="font-semibold text-lg mb-1">Summary</h2>
        <p className="mb-4">{result.summary}</p>

        <h2 className="font-semibold text-lg mb-1">Pros</h2>
        <ul className="list-disc ml-6 mb-4">
          {result.pros?.map((p, i) => <li key={i}>{p}</li>)}
        </ul>

        <h2 className="font-semibold text-lg mb-1">Cons</h2>
        <ul className="list-disc ml-6 mb-4">
          {result.cons?.map((c, i) => <li key={i}>{c}</li>)}
        </ul>

        <h2 className="font-semibold text-lg mb-1">Deadlines</h2>
        <ul className="list-disc ml-6 mb-4">
          {result.deadlines?.map((d, i) => <li key={i}>{d}</li>)}
        </ul>

        <h2 className="font-semibold text-lg mb-1">Cost</h2>
        <p>Monthly: ${result.futureMath?.monthly || 0}</p>
        <p className="mb-6">Yearly: ${result.futureMath?.yearly || 0}</p>

        <button onClick={onBack} className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl">
          Analyze Another Document
        </button>
      </div>
    </div>
  );
}