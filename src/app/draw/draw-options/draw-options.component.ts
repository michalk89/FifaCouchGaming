import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DrawOptionsModel } from 'src/app/models/draw-options.model';
import { GroupModel } from 'src/app/models/group.model';
import { ResultItemModel } from 'src/app/models/result-item.model';
import { SelectionModel } from 'src/app/models/selection.model';
import { TeamModel } from 'src/app/models/team.model';


@Component({
  selector: 'app-draw-options',
  templateUrl: './draw-options.component.html',
  styleUrls: ['./draw-options.component.scss']
})
export class DrawOptionsComponent implements OnInit {
  @Input() selections: SelectionModel[] | null;
  @Input() groups: GroupModel[] | null;
  @Input() results: ResultItemModel[];
  @Output() resultsDrawnEvent: EventEmitter<ResultItemModel[]> = new EventEmitter<ResultItemModel[]>();
  
  constructor() { }

  ngOnInit(): void {

  }

  draw = (options?: DrawOptionsModel) => {
    const o: DrawOptionsModel = {
      selectionId: 1,
      groupId: 1,
      teamsPerPlayer: 2,
      canTeamsRepeat: false
    };

    const players = this.groups?.find(g => g.id === o.groupId)?.players ?? [];
    const teams = this.selections?.find(s => s.id === o.selectionId)?.selectedTeams ?? [];

    if(players?.length > 0 && teams?.length > 0) {
      const results: ResultItemModel[] = [];

      players.forEach(p => {
        let result: ResultItemModel = {
          playerName: p.name,
          drawnTeams: []
        };
  
        // drawing teams
        for(let i = 0; i < o.teamsPerPlayer; i++) {
          const teamName = this.drawTeam(teams);
          result.drawnTeams.push(teamName);
        }
  
        results.push(result);
      });

      this.resultsDrawnEvent.emit(results);
    }
  };

  drawTeam = (options: TeamModel[]): string => {
    return options[Math.floor(Math.random() * options.length)].name;
  };
}
