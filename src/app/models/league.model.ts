import { TeamModel } from "./team.model";

export interface LeagueModel {
    id: number;
    flagUrl: string;
    name: string;
    accordionId: string;
    teams: TeamModel[]
}