
import { TournamentItem } from "@/src/component/RecorderDashboardUI";

interface TournamentListProps {
  tournaments: TournamentItem[];
}

export default function TournamentList({ tournaments }: TournamentListProps) {
  if (tournaments.length === 0) {
    return (
      <div className="text-center text-gray-500 bg-gray-100 px-6 py-10 rounded-lg">
        No tournaments found.
      </div>
    );
  }

  return (
    <>
      {tournaments.map((t) => (
        <div
          key={t.competition_id}
          className="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition mb-4"
        >
          <div className="space-y-1">
            <div className="font-semibold text-gray-800">{t.name}</div>
            <div className="text-sm text-gray-500">
              📍 {t.location} • 📅 {new Date(t.date).toLocaleDateString()}
            </div>
            {t.is_championship_part && (
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
