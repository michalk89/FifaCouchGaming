import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-teams-create-selection',
  templateUrl: './teams-create-selection.component.html',
  styleUrls: ['./teams-create-selection.component.scss']
})
export class TeamsCreateSelectionComponent implements OnInit {
  @Output() createSelectionEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() cancelCreateSelectionEvent: EventEmitter<void> = new EventEmitter<void>();

  createSelectionForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createSelectionForm = this.fb.group({
      name: [""]
    })
  };

  createSelection = () => {
    const name = this.createSelectionForm.controls["name"].value ?? "";
    this.createSelectionEvent.emit(name);
  };

  cancelCreateSelection = () => {
    this.cancelCreateSelectionEvent.emit();
  };

}
