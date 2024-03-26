import {VuelCalendarEvent} from "../VuelCalendarEvent.ts";

type PushToSplit =  (event:VuelCalendarEvent) => void;
type PreventResize =(method:Function, returnable?:any)=>any;
export type {
    PushToSplit,
    PreventResize
}