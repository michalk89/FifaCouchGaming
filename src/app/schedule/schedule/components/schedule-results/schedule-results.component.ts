import { Component, Input, OnInit } from '@angular/core';
import { ScheduleResultItemModel } from 'src/app/models/schedule-result-item.model';

@Component({
  selector: 'app-schedule-results',
  templateUrl: './schedule-results.component.html',
  styleUrls: ['./schedule-results.component.scss']
})
export class ScheduleResultsComponent implements OnInit {
  @Input() results: ScheduleResultItemModel[];

  constructor() { }

  ngOnInit(): void {
  }

}
