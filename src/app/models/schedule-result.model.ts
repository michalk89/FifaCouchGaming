import { ScheduleGameplayTypeEnum } from "../enums/schedule-gameplay-type.enum";
import { ScheduleResultItemModel } from "./schedule-result-item.model";

export interface ScheduleResultModel {
    results: ScheduleResultItemModel[];
    type: ScheduleGameplayTypeEnum;
}