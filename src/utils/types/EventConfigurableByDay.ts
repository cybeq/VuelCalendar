import {VuelCalendarEvent} from "./VuelCalendarEvent.ts";

export type EventConfigurableByDay = {
    [key: string]: Array<Array<VuelCalendarEvent>>;
};