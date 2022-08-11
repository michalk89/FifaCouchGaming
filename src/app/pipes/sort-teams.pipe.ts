import { Pipe, PipeTransform } from '@angular/core';
import { TeamModel } from '../models/team.model';

@Pipe({
  name: 'sortTeams'
})
export class SortTeamsPipe implements PipeTransform {

  transform(value: TeamModel[], ...args: unknown[]): TeamModel[] {
    return [...value].sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
  }
}
