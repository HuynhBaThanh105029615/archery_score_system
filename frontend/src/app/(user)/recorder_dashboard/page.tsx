"use client";

import RecorderDashboardUI, {
    TournamentItem,
    ScoreItem,
} from "./RecorderDashboardUI";

export default function DashboardPage() {
    const tournaments: TournamentItem[] = [
        { id: 1, name: "Tournament A", submissions: 10, archers: 5 },
        { id: 2, name: "Tournament B", submissions: 6, archers: 3 },
    ];

    const history: ScoreItem[] = [
        { id: 1, archer: "John Doe", score: 290, status: "pending" },
        { id: 2, archer: "Jane Doe", score: 278, status: "pending" },
    ];

    const handleEnterTournament = (id: number) => {
        console.log("Navigate to tournament", id);
    };

    const handleDisapproveScore = (id: number) => {
        console.log("Disapprove score", id);
    };

    const handleEnterScore = (id: number) => {
        console.log("Enter/Edit score", id);
    };

    return (
        <RecorderDashboardUI
        tournaments={tournaments}
        history={history}
        onEnterTournament={handleEnterTournament}
        onDisapproveScore={handleDisapproveScore}
        onEnterScore={handleEnterScore}
        />
    );
}
