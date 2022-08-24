import { GameplayTypeEnum } from "../enums/gameplay-type.enum";
import { ScheduleResultItemModel } from "./schedule-result-item.model";

export interface ScheduleResultModel {
    results: ScheduleResultItemModel[];
    type: GameplayTypeEnum;
}