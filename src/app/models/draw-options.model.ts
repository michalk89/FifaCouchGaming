import { GameplayTypeEnum } from "../enums/gameplay-type.enum";

export interface DrawOptionsModel {
    groupId: number;
    selectionId: number;
    teamsPerPlayer: number;
    canTeamsRepeat: boolean;
    gameplayType: GameplayTypeEnum;
}