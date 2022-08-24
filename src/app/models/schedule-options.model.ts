import { GameplayTypeEnum } from "../enums/gameplay-type.enum";

export interface ScheduleOptionsModel {
    groupId: number;
    gameplayType: GameplayTypeEnum;
    withRematches: boolean;
}