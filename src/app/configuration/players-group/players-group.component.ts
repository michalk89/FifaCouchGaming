import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GroupModel } from 'src/app/models/group.model';
import { PlayerModel } from 'src/app/models/player.model';

@Component({
  selector: 'app-players-group',
  templateUrl: './players-group.component.html',
  styleUrls: ['./players-group.component.scss']
})
export class PlayersGroupComponent implements OnInit {
  @Input() group: GroupModel | null
  @Input() editMode: boolean | null;
  @Output() toggleEditModeEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveGroupEvent: EventEmitter<GroupModel> = new EventEmitter<GroupModel>();

  constructor() { }

  ngOnInit(): void {
  };

  toggleEditMode = () => {
    this.toggleEditModeEvent.emit();
  };

  saveGroup = (group: GroupModel) => {
    this.saveGroupEvent.emit(group);
  };
}
