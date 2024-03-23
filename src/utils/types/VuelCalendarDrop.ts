import {VuelCalendarEvent} from "./VuelCalendarEvent.ts";

export type VuelCalendarDrop = {
    clickEvent:MouseEvent;
    newStartDateTime:Date;
    oldStartDateTime:Date;
    newEndDateTime:Date;
    oldEndDateTime:Date;
    event:VuelCalendarEvent;
    accept:()=>void;
    decline:()=>void;
}