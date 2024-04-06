import {VuelCalendarEvent} from "../VuelCalendarEvent.ts";
import {VuelCalendarEventConfigure} from "../VuelCalendarEventConfigure.ts";
import {EventTemplate} from "./innerFunctionsTypes.ts";

type SetStartDate = (date: Date) => Date;
type SetEvents = (events: VuelCalendarEvent[]) => VuelCalendarEvent[];
type AddEvents = (events: VuelCalendarEvent[]) => VuelCalendarEvent[];
type RemoveEventsByParam = (param: string, value: any) => VuelCalendarEvent[];
type ConfigureEventsByParam = (param: string, value: any, params: VuelCalendarEventConfigure) => VuelCalendarEvent[];
type SetStartHour = (hour: number) => void;
type SetEndHour = (hour: number) => void;
type SetTimeRange = (startHour:number, endHour:number) => void;
type SwitchViewMode = ()=>void;
type SetDaysForward = (days:number) => void;
type SetDateRange = (startDate:Date|string, endDate:Date|string) => void;
type SetRenderer = (renderer:string) => void;
type SetTresHold = (tresHold:number) => void;
type SetEventTemplate = (eventTemplate:EventTemplate) => string;
export type {
    SetStartDate,
    SetEvents,
    AddEvents,
    RemoveEventsByParam,
    ConfigureEventsByParam,
    SetStartHour,
    SetEndHour,
    SwitchViewMode,
    SetDaysForward,
    SetDateRange,
    SetTimeRange,
    SetRenderer,
    SetTresHold,
    SetEventTemplate
}