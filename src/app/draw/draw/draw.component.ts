import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { GroupModel } from 'src/app/models/group.model';
import { DrawResultItemModel } from 'src/app/models/draw-result-item.model';
import { SelectionModel } from 'src/app/models/selection.model';
import { State } from 'src/app/state/app.state';
import { getGroups } from 'src/app/state/groups';
import { getSelections } from 'src/app/state/selections';
import { DrawState } from 'src/app/state/draw/draw.reducer';
import { getCurrentDraw } from 'src/app/state/draw';
import { DrawPageActions } from 'src/app/state/draw/actions';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss']
})
export class DrawComponent implements OnInit {
  selections$: Observable<SelectionModel[]>;
  groups$: Observable<GroupModel[]>;
  draw$: Observable<DrawState>;
  drawResults: DrawResultItemModel[] = [];
  
  constructor(private store: Store<State>) { }

  ngOnInit(): void {
    this.groups$ = this.store.select(getGroups);
    this.selections$ = this.store.select(getSelections);
    this.draw$ = this.store.select(getCurrentDraw)
  }

  setResults = (data: DrawResultItemModel[]) => {
    this.drawResults = data;
  };

  setCurrentDraw = (draw: DrawState) => {
    this.store.dispatch(DrawPageActions.setCurrentDraw({ draw }))
  };
}
