import { Component, OnInit } from '@angular/core';
import { LeagueModel } from 'src/app/models/league.model';

@Component({
  selector: 'app-teams-selection',
  templateUrl: './teams-selection.component.html',
  styleUrls: ['./teams-selection.component.scss']
})
export class TeamsSelectionComponent implements OnInit {
  leagues: LeagueModel[] = [
    {
      id: 1,
      name: "Primera Division",
      flagUrl: "/assets/spain.png",
      accordionId: "primeraDivision"
    },
    {
      id: 2,
      name: "Premier League",
      flagUrl: "/assets/england.png",
      accordionId: "premierLeague"
    },
    {
      id: 3,
      name: "Serie A",
      flagUrl: "/assets/italy.png",
      accordionId: "serieA"
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
