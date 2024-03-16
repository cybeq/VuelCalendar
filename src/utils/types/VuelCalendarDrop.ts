import {VuelCalendarEvent} from "./VuelCalendarEvent.ts";

export type VuelCalendarDrop = {
    clickEvent:MouseEvent;
    date:Date;
    time:string;
    events:Array<VuelCalendarEvent>
    event:VuelCalendarEvent;
    endDateCorrection:Date;
}