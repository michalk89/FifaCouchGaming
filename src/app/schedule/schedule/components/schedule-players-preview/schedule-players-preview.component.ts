import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { GroupModel } from 'src/app/models/group.model';

@Component({
  selector: 'app-schedule-players-preview',
  templateUrl: './schedule-players-preview.component.html',
  styleUrls: ['./schedule-players-preview.component.scss']
})
export class SchedulePlayersPreviewComponent implements OnInit {
  @Input() groups: GroupModel[] | null;
  @Input() groupId: string;

  selectedGroup: GroupModel | null = null;

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes["groupId"]) {
      this.groupChanged();
    }
  }

  groupChanged = () => {
    this.selectedGroup = this.groups?.find(g => g.id === +this.groupId) ?? null;
  };
}
