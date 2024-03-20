import {VuelCalendarEvent} from "./VuelCalendarEvent.ts";

export type VuelCalendarResize = {
    event:VuelCalendarEvent,
    newDateTime:Date,
    timeString:string
}