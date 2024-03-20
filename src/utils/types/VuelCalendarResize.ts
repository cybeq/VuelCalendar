import {VuelCalendarEvent} from "./VuelCalendarEvent.ts";

export type VuelCalendarResize = {
    event:VuelCalendarEvent,
    newDateTime:Date,
    oldDateTime:Date,
    accept:()=>void;
    decline:()=> void;
}