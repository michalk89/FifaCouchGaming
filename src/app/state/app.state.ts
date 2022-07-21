import { GroupsState } from "./groups/groups.reducer";
import { SelectionsState } from "./selections/selections.reducer";

export interface State {
    groups: GroupsState;
    selections: SelectionsState;
}