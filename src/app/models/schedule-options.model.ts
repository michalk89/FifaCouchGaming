import { GameplayTypeEnum } from "../enums/gameplay-type.enum";
import { ScheduleAssignTeamsOptionEnum } from "../enums/schedule-assign-teams-option.enum";

export interface ScheduleOptionsModel {
    groupId: number;
    gameplayType: GameplayTypeEnum;
    assignTeamsOption: ScheduleAssignTeamsOptionEnum,
    withRematches: boolean;
}