import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GroupModel } from 'src/app/models/group.model';

@Component({
  selector: 'app-players-groups',
  templateUrl: './players-groups.component.html',
  styleUrls: ['./players-groups.component.scss']
})
export class PlayersGroupsComponent implements OnInit {
  @Input() groups: GroupModel[] | null;
  @Output() deleteGroupEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() groupSelectedEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  deleteGroup = (id: number) => {
    this.deleteGroupEvent.emit(id);
  };

  rowSelected = (id: number) => {
    this.groupSelectedEvent.emit(id);
  };
}
