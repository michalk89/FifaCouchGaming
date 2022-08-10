import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { SelectionModel } from 'src/app/models/selection.model';

@Component({
  selector: 'app-draw-teams-preview',
  templateUrl: './draw-teams-preview.component.html',
  styleUrls: ['./draw-teams-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DrawTeamsPreviewComponent implements OnInit {
  @Input() selections: SelectionModel[] | null;
  @Input() selectionId: string;

  selectedSelection: SelectionModel | null = null;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["selectionId"]) {
      this.selectionChanged();
    }
  }

  selectionChanged = () => {
    this.selectedSelection = this.selections?.find(s => s.id === +this.selectionId) ?? null;
  };

}
