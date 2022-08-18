import { DrawState } from "./draw/draw.reducer";
import { GroupsState } from "./groups/groups.reducer";
import { ScheduleState } from "./schedule/schedule.reducer";
import { SelectionsState } from "./selections/selections.reducer";

export interface State {
    groups: GroupsState;
    selections: SelectionsState;
    draw: DrawState;
    schedule: ScheduleState;
}