import { Pipe, PipeTransform } from '@angular/core';
import { TournametTableEntryModel } from '../models/tournament-table-entry.model';

@Pipe({
  name: 'sortStandings'
})
export class SortStandingsPipe implements PipeTransform {

  transform(value: TournametTableEntryModel[], ...args: unknown[]): TournametTableEntryModel[] {
    return [...value].sort((a,b) => (a.points > b.points) ? -1 : ((a.points < b.points) ? 1 : 0));
  }
}

