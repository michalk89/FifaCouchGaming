import { Component, Input, OnInit } from '@angular/core';
import { ScheduleResultModel } from 'src/app/models/schedule-result.model';

@Component({
  selector: 'app-schedule-results',
  templateUrl: './schedule-results.component.html',
  styleUrls: ['./schedule-results.component.scss']
})
export class ScheduleResultsComponent implements OnInit {
  @Input() data: ScheduleResultModel;

  constructor() { }

  ngOnInit(): void {
  }

}
