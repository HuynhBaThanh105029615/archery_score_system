// src/_data/tournaments.ts
import { TournamentItem } from "@/src/component/RecorderDashboardUI";

export const tournaments: TournamentItem[] = [
  {
    competition_id: 1,
    name: "Regional Open 2025",
    date: "2025-03-14",
    location: "New York, USA",
    is_championship_part: false,
    created_by: "Admin James",
  },
  {
    competition_id: 2,
    name: "City Classic",
    date: "2025-04-02",
    location: "Los Angeles, USA",
    is_championship_part: false,
    created_by: "Admin Sarah",
  },
  {
    competition_id: 3,
    name: "Spring Invitational",
    date: "2025-05-08",
    location: "Chicago, USA",
    is_championship_part: true,
    created_by: "Admin Kevin",
  },
  {
    competition_id: 4,
    name: "Summer Cup",
    date: "2025-06-20",
    location: "Houston, USA",
    is_championship_part: false,
    created_by: "Admin David",
  },
  {
    competition_id: 5,
    name: "National Qualifier",
    date: "2025-07-12",
    location: "Miami, USA",
    is_championship_part: true,
    created_by: "Admin Olivia",
  },
];
