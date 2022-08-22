export interface TournamentScheduleEntryModel {
    id: number;
    away: string;
    awayScore: number | null;
    home: string;
    homeScore: number | null;
}