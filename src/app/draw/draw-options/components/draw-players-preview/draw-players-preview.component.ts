import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges } from "@angular/core";
import { GroupModel } from "src/app/models/group.model";

@Component({
  selector: "app-draw-players-preview",
  templateUrl: "./draw-players-preview.component.html",
  styleUrls: ["./draw-players-preview.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawPlayersPreviewComponent implements OnInit {
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
