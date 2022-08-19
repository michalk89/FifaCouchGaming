import { Pipe, PipeTransform } from '@angular/core';
import { TourmanetTableEntryModel } from '../models/tournament-table-entry.model';

@Pipe({
  name: 'sortStandings'
})
export class SortStandingsPipe implements PipeTransform {

  transform(value: TourmanetTableEntryModel[], ...args: unknown[]): TourmanetTableEntryModel[] {
    return [...value].sort((a,b) => (a.points > b.points) ? 1 : ((b.points > a.points) ? -1 : 0));
  }
}

