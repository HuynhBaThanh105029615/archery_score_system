import type { CompetitionItem } from "@/src/app/(user)/competitions/page";

interface Props {
  competitions: CompetitionItem[];
}

export default function CompetitionList({ competitions }: Props) {
  if (competitions.length === 0) {
    return (
      <div className="text-center text-gray-500 bg-gray-100 px-6 py-10 rounded-lg">
        No competitions found.
      </div>
    );
  }

  return (
    <>
      {competitions.map((c) => (
        <div
          key={c.id}    // 🔥 FIXED
          className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition mb-4"
        >
          <div className="space-y-1">
            <div className="font-semibold text-gray-800">{c.name}</div>

            <div className="text-sm text-gray-500">
              📍 {c.location} • 📅 {new Date(c.date).toLocaleDateString()}
            </div>

            {c.is_championship_part && (
              <span className="mt-1 inline-block px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                🏆 Championship Event
              </span>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
