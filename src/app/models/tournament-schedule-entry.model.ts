export interface TournamentScheduleEntryModel {
    id: number;
    away: string;
    awayScore: number | null;
    awayTeam: string | null;
    home: string;
    homeScore: number | null;
    homeTeam: string | null;
}