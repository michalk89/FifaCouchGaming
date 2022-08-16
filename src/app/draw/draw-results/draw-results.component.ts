import { Component, Input, OnInit } from '@angular/core';
import { DrawResultItemModel } from 'src/app/models/draw-result-item.model';

@Component({
  selector: 'app-draw-results',
  templateUrl: './draw-results.component.html',
  styleUrls: ['./draw-results.component.scss']
})
export class DrawResultsComponent implements OnInit {
  @Input() results: DrawResultItemModel[];

  constructor() { }

  ngOnInit(): void {
  }

}
