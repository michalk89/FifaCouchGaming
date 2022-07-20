import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GroupModel } from "src/app/models/group.model";

@Component({
  selector: "app-players-group-edit",
  templateUrl: "./players-group-edit.component.html",
  styleUrls: ["./players-group-edit.component.scss"],
})
export class PlayersGroupEditComponent implements OnInit {
  @Input() group: GroupModel | null;
  @Output() toggleEditModeEvent: EventEmitter<void> = new EventEmitter<void>();
  @Output() saveGroupEvent: EventEmitter<GroupModel> = new EventEmitter<GroupModel>();

  groupForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    //this.groupChanged();
  };

  ngOnChanges(changes: SimpleChanges) {
    if(changes['group']) {
      this.groupChanged();
    }
  }

  groupChanged = () => {
    debugger
    this.groupForm = this.fb.group({
      name: [this.group?.name ?? "", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      players: this.fb.array([])
    });

    const playersNames = this.group?.players.map(x => x.name) ?? [];
    this.initPlayers(playersNames);
  };

  toggleEditMode = () => {
    this.toggleEditModeEvent.emit();
  };

  saveGroup = () => {
    const group: GroupModel = {
      id: this.group?.id ?? 0,
      name: this.name.value,
      players: this.players.value.map((name: string, index: number) => {
        return {
          id: index + 1,
          name: name
        }
      })
    };

    this.saveGroupEvent.emit(group);
  };

  initPlayers = (playerNames: string[]) => {
    playerNames.forEach(name => {
      let fg = this.fb.group({
        name
      });
      this.players.push(fg);
    });
  };

  addPlayer = () => {
    const playerForm = this.fb.group({
      name: ""
    });
    this.players.push(playerForm);
  };

  deletePlayer = (index: number) => {
    this.players.removeAt(index);
  };

  get name() {
    return this.groupForm.controls["name"];
  };

  get players() {
    return this.groupForm.controls["players"] as FormArray;
  };
}
