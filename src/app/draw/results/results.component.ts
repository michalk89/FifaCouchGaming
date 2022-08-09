import { Component, Input, OnInit } from '@angular/core';
import { ResultItemModel } from 'src/app/models/result-item.model';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input() results: ResultItemModel[];
  
  constructor() { }

  ngOnInit(): void {
  }

}
