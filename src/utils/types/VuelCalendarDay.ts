import {VuelCalendarEvent} from "./VuelCalendarEvent";

export type VuelCalendarDay = {
    clickEvent?:MouseEvent;
    date?:Date;
    time?:string;
    events?:Array<VuelCalendarEvent>
}