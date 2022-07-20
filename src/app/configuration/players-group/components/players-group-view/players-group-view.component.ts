import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { GroupModel } from "src/app/models/group.model";
import { PlayerModel } from "src/app/models/player.model";

@Component({
  selector: "app-players-group-view",
  templateUrl: "./players-group-view.component.html",
  styleUrls: ["./players-group-view.component.scss"],
})
export class PlayersGroupViewComponent implements OnInit {
  @Input() group: GroupModel | null;
  @Output() toggleEditModeEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  identifyPlayer = (index: number, player: PlayerModel) => {
    return player.id;
  };

  toggleEditMode = () => {
    this.toggleEditModeEvent.emit();
  };
}
