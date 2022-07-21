import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectionModel } from 'src/app/models/selection.model';

@Component({
  selector: 'app-teams-selections',
  templateUrl: './teams-selections.component.html',
  styleUrls: ['./teams-selections.component.scss']
})
export class TeamsSelectionsComponent implements OnInit {
  @Input() selections: SelectionModel[] | null;
  @Output() deleteSelectionEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() selectionSelectedEvent: EventEmitter<number> = new EventEmitter<number>();
  @Output() createSelectionEvent: EventEmitter<SelectionModel> = new EventEmitter<SelectionModel>();

  showCreateSelectionComponent: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  deleteSelection = (id: number) => {
    this.deleteSelectionEvent.emit(id);
  };

  rowSelected = (id: number) => {
    this.selectionSelectedEvent.emit(id);
  };

  addSelection = (name: string) => {
    const newSelection: SelectionModel = {
      id: this.selections!.length + 1,
      name: name,
      selectedTeams: []
    };

    this.createSelectionEvent.emit(newSelection);
    this.showCreateSelectionComponent = false;
  };

  showCreateSelection = () => {
    this.showCreateSelectionComponent = true;
  };

  hideCreateSelection = () => {
    this.showCreateSelectionComponent = false;
  };

  cancelAddCreation = () => {
    this.hideCreateSelection();
  };
}
