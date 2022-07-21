import { TeamModel } from "./team.model";

export interface SelectionModel {
    id: number;
    name: string;
    selectedTeams: TeamModel[];
}