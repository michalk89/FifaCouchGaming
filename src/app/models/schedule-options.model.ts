import { ScheduleGameplayTypeEnum } from "../enums/schedule-gameplay-type.enum";

export interface ScheduleOptionsModel {
    groupId: number;
    gameplayType: ScheduleGameplayTypeEnum;
    withRematches: boolean;
}