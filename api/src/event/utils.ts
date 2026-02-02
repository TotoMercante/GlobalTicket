import { FilterQuery, QuerySelector } from 'mongoose';
import { EventDateDto } from './dto/event-date.dto';
import { GetEventsQuery } from './dto/request/get-events-query.dto';
import { Event } from './entities/event.entity';

export function parseGetEventsQuery(query: GetEventsQuery) {
  const parsedQuery: FilterQuery<Event> = {};
  const parsedDateRange: QuerySelector<Date> = {};
  parsedDateRange.$gt = new Date(query.from ?? Date.now());
  if (query.to) parsedDateRange.$lt = new Date(query.to);
  parsedQuery['dates.datetime'] = parsedDateRange;
  if (query.search) {
    parsedQuery.name =
      parsedQuery.description =
      parsedQuery.location =
        { $regex: query.search, $options: 'i' };
  }
  return parsedQuery;
}

export const compareEventDates = (ed1: EventDateDto, ed2: EventDateDto) =>
  Date.parse(ed1.datetime) - Date.parse(ed2.datetime);
